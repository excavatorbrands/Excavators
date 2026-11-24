export async function submitEnquiry(enquiry) {
  const response = await fetch('/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enquiry),
  });

  const contentType = response.headers.get('content-type') || '';
  const result = contentType.includes('application/json') ? await response.json() : null;
  if (!response.ok || !result?.message) {
    throw new Error(result?.message || 'We could not send your enquiry. Please try again or email us directly.');
  }

  return result;
}
