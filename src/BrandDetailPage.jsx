import { ArrowRight, ChevronRight } from 'lucide-react';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { brandHeroUrl, modelPrice, modelUrl } from './catalogLinks.js';

export default function BrandDetailPage({ brand, models }) {
  const brandModels = models.filter((model) => model.brand === brand.id);

  return (
    <div className="catalog-detail-page">
      <Header active="brands" />
      <main>
        <section className="brand-detail-hero">
          <img src={brandHeroUrl(brand)} alt="" fetchPriority="high" />
          <div className="container brand-detail-hero__inner">
            <nav className="catalog-breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a><ChevronRight size={14} aria-hidden="true" />
              <a href="/brands">All brands</a><ChevronRight size={14} aria-hidden="true" />
              <span aria-current="page">{brand.name}</span>
            </nav>
            <h1>{brand.name} excavators</h1>
            <p>Explore {brandModels.length} models in the Iron Crest catalog and ask our team about specifications, pricing, and availability.</p>
            <a href="#brand-lineup" className="btn btn-primary">Browse models <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
        </section>
        <section className="container brand-detail-lineup" id="brand-lineup" aria-labelledby="brand-lineup-title">
          <h2 id="brand-lineup-title">Explore the {brand.name} lineup</h2>
          <p>Images illustrate machine classes.</p>
          <div className="brand-detail-grid">
            {brandModels.map((model) => (
              <a className="brand-detail-card" href={modelUrl(model)} key={model.id}>
                <img src={model.image} alt="" loading="lazy" decoding="async" />
                <div className="brand-detail-card__body">
                  <p>{model.type}</p>
                  <h3>{model.model}</h3>
                  <div><span>{modelPrice(model)}</span><ArrowRight size={17} aria-hidden="true" /></div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
