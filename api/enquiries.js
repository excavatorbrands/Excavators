const ALLOWED_TYPES = new Set([
  'equipment',
  'parts',
  'service',
  'project',
  'warranty',
  'resource',
  'other',
]);

function respond(res, status, message) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json({ message });
}

function singleLine(value) {
  return value
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function messageText(value) {
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .trim();
}

function getField(body, key, maxLength, required = false) {
  const value = body[key];
  if (typeof value !== 'string') return required ? null : '';
  const cleaned = singleLine(value);
  if (cleaned.length > maxLength || (required && !cleaned)) return null;
  return cleaned;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Allow', 'POST');

  if (req.method !== 'POST') {
    return respond(res, 405, 'Method not allowed.');
  }

  const contentLength = Number(req.headers?.['content-length'] || 0);
  if (contentLength > 16_000) {
    return respond(res, 413, 'The enquiry is too large.');
  }

  const origin = req.headers?.origin;
  const host = req.headers?.['x-forwarded-host'] || req.headers?.host;
  if (origin && host) {
    try {
      if (new URL(origin).host.toLowerCase() !== String(host).toLowerCase()) {
        return respond(res, 403, 'Request origin is not allowed.');
      }
    } catch {
      return respond(res, 403, 'Request origin is not allowed.');
    }
  }

  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return respond(res, 400, 'Please provide valid enquiry details.');
  }

  const website = getField(body, 'website', 200);
  if (website === null) {
    return respond(res, 400, 'Please provide valid enquiry details.');
  }
  if (website) {
    return respond(res, 400, 'Please provide valid enquiry details.');
  }

  const name = getField(body, 'name', 120, true);
  const email = getField(body, 'email', 254, true);
  const phone = getField(body, 'phone', 80, true);
  const company = getField(body, 'company', 160);
  const type = getField(body, 'type', 30, true);
  const interest = getField(body, 'interest', 160);
  const rawMessage = body.message;
  const message = typeof rawMessage === 'string' ? messageText(rawMessage) : '';

  if (
    name === null ||
    email === null ||
    phone === null ||
    company === null ||
    type === null ||
    interest === null ||
    typeof rawMessage !== 'string' ||
    message.length > 5000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !ALLOWED_TYPES.has(type)
  ) {
    return respond(res, 400, 'Please provide valid enquiry details.');
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.ENQUIRY_TO_EMAIL || 'sales@ironcrest.com';
  if (!apiKey || !from || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return respond(res, 503, 'The enquiry service is not configured yet.');
  }

  const text = [
    'Website enquiry',
    '',
    `Name: ${name}`,
    `Company: ${company || 'Not provided'}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Enquiry type: ${type}`,
    `Interest: ${interest || 'Not provided'}`,
    '',
    'Project details:',
    message || 'Not provided',
  ].join('\n');

  let providerResponse;
  try {
    providerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website enquiry: ${type} - ${name}`,
        text,
      }),
    });
  } catch (error) {
    console.error('Email provider request failed:', error);
    return respond(res, 502, 'We could not deliver your enquiry. Please try again or email us directly.');
  }

  if (!providerResponse.ok) {
    console.error('Email provider rejected an enquiry with status:', providerResponse.status);
    return respond(res, 502, 'We could not deliver your enquiry. Please try again or email us directly.');
  }

  return respond(res, 200, 'Your enquiry was sent.');
}
