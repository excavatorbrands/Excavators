export const brandUrl = (brand) => `/brands/${brand.id}`;
export const modelUrl = (model) => `/excavators/${model.id}`;
export const brandHeroUrl = (brand) => `/images/brand-page-heroes/${brand.id}.webp`;

// Add confirmed seller prices by model ID, using the model IDs in data.js.
// Example shape: 'manufacturer-model': { amount: 0, currency: 'PKR' }
const confirmedPrices = {};

export function modelPrice(model) {
  const price = confirmedPrices[model.id];
  return price
    ? new Intl.NumberFormat('en', { style: 'currency', currency: price.currency }).format(price.amount)
    : 'Price on request';
}

export function modelEnquiryUrl(model, intent) {
  const query = new URLSearchParams({
    type: 'equipment',
    model: `${model.brandName} ${model.model}`,
    intent,
  });
  return `/contact-us?${query}#equipment-enquiry`;
}

export const enquiryLabels = {
  quote: 'Price quotation',
  booking: 'Booking request',
  order: 'Order enquiry',
};
