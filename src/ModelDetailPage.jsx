import { ArrowRight, ChevronRight } from 'lucide-react';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { brandUrl, modelEnquiryUrl, modelPrice } from './catalogLinks.js';
import CatalogModelTile from './CatalogModelTile.jsx';
import { ModelFAQs } from './EquipmentFAQs.jsx';

const machineClass = (model) => model.type.toLowerCase().split(/\s+/)[0];

function similarModels(model, models) {
  const currentClass = machineClass(model);
  const matchScore = (candidate) =>
    Number(machineClass(candidate) === currentClass) * 2 + Number(candidate.brand === model.brand);

  return models
    .filter((candidate) => candidate.id !== model.id && matchScore(candidate) > 0)
    .sort((first, second) => matchScore(second) - matchScore(first))
    .slice(0, 4);
}

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
  const related = similarModels(model, models);

  return (
    <div className="catalog-detail-page catalog-detail-page--model">
      <Header active="excavators" onQuote={() => { window.location.href = modelEnquiryUrl(model, 'quote'); }} />
      <main>
        <section className="model-detail-hero" aria-labelledby="model-title">
          <img src={model.image} alt={`Illustration of the ${model.type.toLowerCase()} machine class`} fetchPriority="high" />
          <div className="container model-detail-hero__inner">
            <nav className="catalog-breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a><ChevronRight size={14} aria-hidden="true" />
              <a href={brandUrl(brand)}>{brand.name}</a><ChevronRight size={14} aria-hidden="true" />
              <span aria-current="page">{model.model}</span>
            </nav>
            <header className="model-detail-hero__intro">
              <h1 id="model-title">{model.brandName} {model.model}</h1>
              <p>{model.type}</p>
              <strong>{modelPrice(model)}</strong>
            </header>
          </div>
        </section>

        <div className="container model-detail">
          <div className="model-detail__grid">
            <section className="model-detail__panel" aria-labelledby="model-specs-title">
              <h2 id="model-specs-title">Model specifications</h2>
              <dl>
                {specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>
              <p>{model.note}</p>
            </section>
            <section className="model-detail__panel model-detail__purchase" aria-labelledby="model-purchase-title">
              <h2 id="model-purchase-title">Quotes, booking and orders</h2>
              <p>The Iron Crest team will confirm availability, terms, and delivery.</p>
              <a className="btn btn-primary" href={modelEnquiryUrl(model, 'quote')}>Request a quote <ArrowRight size={17} aria-hidden="true" /></a>
              <a className="model-detail__secondary" href={modelEnquiryUrl(model, 'booking')}>Request booking</a>
              <a className="model-detail__secondary" href={modelEnquiryUrl(model, 'order')}>Enquire about ordering</a>
            </section>
          </div>
          <ModelFAQs model={model} />

          {related.length > 0 && (
            <section className="model-detail__related" aria-labelledby="model-related-title">
              <h2 id="model-related-title">Similar excavator models</h2>
              <div className="brand-detail-grid">
                {related.map((item) => <CatalogModelTile key={item.id} model={item} showManufacturer />)}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer onQuote={() => { window.location.href = modelEnquiryUrl(model, 'quote'); }} />
    </div>
  );
}
