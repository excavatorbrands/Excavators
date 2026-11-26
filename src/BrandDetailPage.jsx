import { ArrowRight, ChevronRight } from 'lucide-react';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { brands } from './data.js';
import { brandHeroUrl, brandUrl } from './catalogLinks.js';
import CatalogModelTile from './CatalogModelTile.jsx';

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
        <nav className="container brand-switcher" aria-label="Switch manufacturer">
          <ul>
            <li><a href="/brands">All brands</a></li>
            {brands.map((item) => (
              <li key={item.id}>
                <a href={brandUrl(item)} aria-current={item.id === brand.id ? 'page' : undefined}>{item.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <section className="container brand-detail-lineup" id="brand-lineup" aria-labelledby="brand-lineup-title">
          <h2 id="brand-lineup-title">Explore the {brand.name} lineup</h2>
          <p>Images illustrate machine classes.</p>
          <div className="brand-detail-grid">
            {brandModels.map((model) => <CatalogModelTile key={model.id} model={model} />)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
