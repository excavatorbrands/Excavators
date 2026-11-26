import { ArrowRight, ChevronRight } from 'lucide-react';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { brandUrl, modelEnquiryUrl, modelPrice, modelUrl } from './catalogLinks.js';

export default function ModelDetailPage({ model, brand, models }) {
  const specs = [
    ['Manufacturer', model.brandName],
    ['Model', model.model],
    ['Machine class', model.type],
    ['Engine power', model.power],
    ['Operating weight', model.weight],
    ['Bucket capacity', model.bucket],
    ['Availability', model.availability === 'available' ? 'Confirmed available' : model.availability === 'not-available' ? 'Confirmed unavailable' : 'Needs confirmation'],
  ];
  const related = models.filter((item) => item.brand === model.brand && item.id !== model.id).slice(0, 3);

  return (
    <div className="catalog-detail-page">
      <Header active="excavators" onQuote={() => { window.location.href = modelEnquiryUrl(model, 'quote'); }} />
      <main className="container model-detail">
        <nav className="catalog-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><ChevronRight size={14} aria-hidden="true" />
          <a href={brandUrl(brand)}>{brand.name}</a><ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{model.model}</span>
        </nav>
        <h1>{model.brandName} {model.model}</h1>
        <p className="model-detail__type">{model.type}</p>
        <figure className="model-detail__photo">
          <img src={model.image} alt={`Illustration of the ${model.type.toLowerCase()} machine class`} fetchPriority="high" />
        </figure>

        <div className="model-detail__grid">
          <section className="model-detail__panel" aria-labelledby="model-specs-title">
            <h2 id="model-specs-title">Model details</h2>
            <dl>
              {specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <p>{model.note}</p>
          </section>
          <section className="model-detail__panel model-detail__purchase" aria-labelledby="model-purchase-title">
            <h2 id="model-purchase-title">Pricing and enquiries</h2>
            <strong>{modelPrice(model)}</strong>
            <p>Request a quote, discuss a booking, or enquire about ordering. The Iron Crest team will confirm availability, terms, and delivery.</p>
            <a className="btn btn-primary" href={modelEnquiryUrl(model, 'quote')}>Request a quote <ArrowRight size={17} aria-hidden="true" /></a>
            <a className="model-detail__secondary" href={modelEnquiryUrl(model, 'booking')}>Request booking</a>
            <a className="model-detail__secondary" href={modelEnquiryUrl(model, 'order')}>Enquire about ordering</a>
          </section>
        </div>
        {related.length > 0 && (
          <section className="model-detail__related" aria-labelledby="model-related-title">
            <h2 id="model-related-title">More from {brand.name}</h2>
            <ul>{related.map((item) => <li key={item.id}><a href={modelUrl(item)}>{item.model} <ArrowRight size={16} aria-hidden="true" /></a></li>)}</ul>
          </section>
        )}
      </main>
      <Footer onQuote={() => { window.location.href = modelEnquiryUrl(model, 'quote'); }} />
    </div>
  );
}
