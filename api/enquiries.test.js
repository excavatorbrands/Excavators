import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import handler from './enquiries.js';

const originalEnvironment = {
  apiKey: process.env.RESEND_API_KEY,
  from: process.env.RESEND_FROM_EMAIL,
  to: process.env.ENQUIRY_TO_EMAIL,
};
const originalFetch = globalThis.fetch;

afterEach(() => {
  if (originalEnvironment.apiKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = originalEnvironment.apiKey;
  if (originalEnvironment.from === undefined) delete process.env.RESEND_FROM_EMAIL;
  else process.env.RESEND_FROM_EMAIL = originalEnvironment.from;
  if (originalEnvironment.to === undefined) delete process.env.ENQUIRY_TO_EMAIL;
  else process.env.ENQUIRY_TO_EMAIL = originalEnvironment.to;
  globalThis.fetch = originalFetch;
});

function createResponse() {
  return {
    statusCode: 0,
    headers: {},
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };
}

async function invoke({ method = 'POST', body, headers = {} } = {}) {
  const res = createResponse();
  await handler({ method, body, headers }, res);
  return res;
}

const validEnquiry = {
  name: 'Jordan Lee',
  company: 'Example Works',
  email: 'jordan@example.com',
  phone: '+1 555 0100',
  type: 'equipment',
  interest: 'CAT 320',
  message: 'Please share availability information.',
  website: '',
};

test('rejects methods other than POST', async () => {
  const response = await invoke({ method: 'GET' });
  assert.equal(response.statusCode, 405);
  assert.equal(response.headers.Allow, 'POST');
});

test('rejects invalid enquiry details before contacting the provider', async () => {
  const response = await invoke({ body: { ...validEnquiry, email: 'invalid' } });
  assert.equal(response.statusCode, 400);
});

test('reports when Resend has not been configured', async () => {
  delete process.env.RESEND_API_KEY;
  delete process.env.RESEND_FROM_EMAIL;
  const response = await invoke({ body: validEnquiry });
  assert.equal(response.statusCode, 503);
});

test('sends a validated enquiry to the configured recipient', async () => {
  process.env.RESEND_API_KEY = 'test-api-key';
  process.env.RESEND_FROM_EMAIL = 'Iron Crest <enquiries@example.com>';
  process.env.ENQUIRY_TO_EMAIL = 'sales@example.com';
  let sentRequest;
  globalThis.fetch = async (url, options) => {
    sentRequest = { url, options };
    return { ok: true, status: 200 };
  };

  const response = await invoke({ body: validEnquiry });
  const payload = JSON.parse(sentRequest.options.body);
  assert.equal(response.statusCode, 200);
  assert.equal(response.payload.message, 'Your enquiry was sent.');
  assert.equal(sentRequest.url, 'https://api.resend.com/emails');
  assert.equal(payload.to[0], 'sales@example.com');
  assert.equal(payload.reply_to, 'jordan@example.com');
  assert.match(payload.text, /CAT 320/);
});
