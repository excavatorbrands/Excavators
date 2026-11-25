import { useMemo, useRef, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, ClipboardList,
  FileText, Filter, Gauge, Headphones, Menu, Package, Scale, Search,
  ShieldCheck, SlidersHorizontal, Wrench, X, MapPin, Phone, Mail,
} from 'lucide-react';
import { brands, models } from './data.js';
import BrandLogoRail from './BrandLogoRail.jsx';
import './brands.css';
import { Header } from './Header.jsx';
import { brandUrl, modelPrice, modelUrl } from './catalogLinks.js';
import { Footer } from './Footer.jsx';

const sizeFilters = ['All', 'Mini', 'Medium', 'Large', 'Mining'];

function BrandWordmark({ brand }) {
  return (
    <span className={`directory-wordmark wordmark-${brand.id}`}>
      <img src={brand.logo} alt="" />
    </span>
  );
}

function DirectoryHero({ search, setSearch, size, setSize }) {
  return (
    <section className="directory-hero">
      <div className="directory-hero-image" />
      <div className="directory-hero-content">
        <div className="directory-breadcrumb"><a href="/">Home</a><span>›</span><span>Brands</span></div>
        <div className="directory-hero-copy">
          <span className="directory-kicker">IRON CREST / MANUFACTURER INDEX</span>
          <h1>Excavator Brands<br /><em>Directory</em></h1>
          <p>Explore the manufacturers in our excavator lineup, review model ranges and compare machine information in one place.</p>
        </div>
      </div>
      <div className="directory-tools">
        <label className="directory-search">
          <Search size={18} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by brand or model…" aria-label="Search by brand or model" />
          {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search"><X size={15} /></button>}
          <span className="search-shortcut">SEARCH</span>
        </label>
        <div className="directory-size-filter" role="group" aria-label="Filter by excavator size">
          <span className="directory-filter-label"><Filter size={14} /> Filter by size</span>
          {sizeFilters.map((item) => (
            <button key={item} className={size === item ? 'selected' : ''} onClick={() => setSize(item)}>{item}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandIndex({ filteredBrands, selectedBrand }) {
  return (
    <section className="brand-index directory-container" aria-labelledby="brand-index-title">
      <div className="directory-section-head">
        <div><span className="directory-section-kicker">MANUFACTURER INDEX</span><h2 id="brand-index-title">Our <em>Brands</em></h2></div>
        <span className="brand-index-caption">{filteredBrands.length} of {brands.length} manufacturers</span>
      </div>
      {filteredBrands.length ? (
        <div className="brand-index-grid">
          {filteredBrands.map((brand) => (
            <a key={brand.id} href={brandUrl(brand)} className={`brand-index-card ${selectedBrand === brand.id ? 'is-selected' : ''}`}>
              <span className="brand-index-card-top"><span className="brand-index-number">{String(brands.findIndex((item) => item.id === brand.id) + 1).padStart(2, '0')}</span><ArrowUpRight size={15} /></span>
              <BrandWordmark brand={brand} />
              <span className="brand-index-sub">{brand.sub}</span>
              <span className="brand-index-action">Explore range <ArrowRight size={13} /></span>
            </a>
          ))}
        </div>
      ) : <div className="directory-empty"><Search size={22} /><strong>No brands found</strong><span>Try a different manufacturer or model name.</span></div>}
    </section>
  );
}

function FeaturedBrand({ brand, model }) {
  const brandModelCount = models.filter((item) => item.brand === brand.id).length;
  return (
    <section className="featured-brand directory-container" aria-labelledby="featured-brand-title">
      <div className="featured-visual">
        <img src={model ? model.image : "/images/hero-quarry.webp"} alt="Illustrative excavator" />
        <span className="featured-image-shade" />
        <span className="featured-label"><span>★</span> ILLUSTRATIVE IMAGE</span>
        <div className="featured-visual-caption"><span>IRON CREST DIRECTORY</span><strong>EXCAVATOR<br />MANUFACTURERS</strong></div>
      </div>
      <div className="featured-details">
        <div className="featured-brand-heading">
          <BrandWordmark brand={brand} />
          <div><span className="directory-section-kicker">FEATURED BRAND</span><h2 id="featured-brand-title">{brand.name} <em>Excavators</em></h2></div>
        </div>
        <p className="featured-description">Explore the {brand.name} excavator listing in the Iron Crest directory. Review the model currently shown and contact our team for verified specifications, configurations and availability.</p>
        <div className="featured-metrics">
          <div><ClipboardList size={20} /><span><b>{brandModelCount}</b><small>Directory listing{brandModelCount === 1 ? '' : 's'}</small></span></div>
          <div><Gauge size={20} /><span><b>{model?.type || 'Excavator'}</b><small>Listed machine type</small></span></div>
          <div><Headphones size={20} /><span><b>Expert</b><small>Enquiry assistance</small></span></div>
        </div>
        <div className="featured-actions">
          <a className="directory-primary-button" href={brandUrl(brand)}>View {brand.name} models <ArrowRight size={16} /></a>
          <a className="directory-text-link" href={`/contact?type=equipment&brand=${brand.id}`}>Request brand information <ArrowUpRight size={15} /></a>
        </div>
      </div>
      <aside className="featured-aside">
        <span className="directory-section-kicker">BRAND SNAPSHOT</span>
        <div className="snapshot-row"><span>Manufacturer</span><b>{brand.name}</b></div>
        <div className="snapshot-row"><span>Product focus</span><b>Excavators</b></div>
        <div className="snapshot-row"><span>Listings in directory</span><b>{brandModelCount}</b></div>
        <div className="snapshot-note"><ShieldCheck size={17} /><span>Technical details should be confirmed against the current manufacturer specification sheet.</span></div>
      </aside>
    </section>
  );
}

function BrandModelRail({ brand, brandModels }) {
  const railRef = useRef(null);
  const scrollRail = (direction) => railRef.current?.scrollBy({ left: direction * 620, behavior: 'smooth' });

  return (
    <section className="directory-brand-model-row" aria-label={`${brand.name} excavator models`}>
      <div className="directory-brand-model-heading">
        <div><span className="directory-section-kicker">MANUFACTURER</span><h3>{brand.name}</h3><span className="directory-brand-model-count">{brandModels.length} model{brandModels.length === 1 ? '' : 's'}</span></div>
        <div className="directory-rail-controls">
          <button type="button" onClick={() => scrollRail(-1)} aria-label={`Scroll ${brand.name} models left`}><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => scrollRail(1)} aria-label={`Scroll ${brand.name} models right`}><ChevronRight size={18} /></button>
        </div>
      </div>
      <div className="directory-model-rail" ref={railRef}>
        {brandModels.map((model) => (
            <article className="directory-model-card directory-model-rail-card model-click-surface" key={model.id}>
              <div className="directory-model-image"><img src={model.image} alt="Illustrative excavator" loading="lazy" /><span className="directory-model-brand">{model.brandName}</span></div>
              <div className="directory-model-body">
                <div className="directory-model-title"><div><span>{model.type}</span><h3>{model.model}</h3></div><ArrowUpRight size={16} /></div>
                <div className="directory-model-specs">
                  <span><Gauge size={14} /> Power <b>{model.power}</b></span>
                  <span><Package size={14} /> Operating weight <b>{model.weight}</b></span>
                  <span><Scale size={14} /> Bucket capacity <b>{model.bucket}</b></span>
                </div>
                <div className="directory-model-actions">
                  <span>{modelPrice(model)}</span><a className="model-click-target" href={modelUrl(model)} aria-label={`View ${model.brandName} ${model.model} details`}>View details <ArrowRight size={14} /></a>
                </div>
              </div>
            </article>
        ))}
      </div>
    </section>
  );
}

function ModelExplorer({ filteredModels, selectedSize, onClear }) {
  const visibleBrandRows = brands.map((brand) => ({
    brand,
    brandModels: filteredModels.filter((model) => model.brand === brand.id),
  })).filter((group) => group.brandModels.length > 0);

  return (
    <section className="model-explorer directory-container" id="brand-models" aria-labelledby="model-explorer-title">
      <div className="directory-section-head model-explorer-head">
        <div><span className="directory-section-kicker">BROWSE THE LINEUP</span><h2 id="model-explorer-title">Model <em>Explorer</em></h2><p>Each manufacturer has its own horizontal model lineup. Use the arrows or swipe to explore more machines.</p></div>
        <span className="model-result-count">{filteredModels.length.toString().padStart(2, '0')} LISTINGS</span>
      </div>
      {visibleBrandRows.length ? (
        <div className="directory-brand-model-rows">
          {visibleBrandRows.map(({ brand, brandModels }) => <BrandModelRail key={brand.id} brand={brand} brandModels={brandModels} />)}
        </div>
      ) : (
        <div className="directory-empty model-empty"><SlidersHorizontal size={23} /><strong>No matching model examples</strong><span>{selectedSize !== 'All' ? `There are no ${selectedSize.toLowerCase()} excavator examples in the current sample dataset.` : 'Try another search term or clear the current filters.'}</span><button onClick={onClear}>Clear filters <ArrowRight size={14} /></button></div>
      )}
      <p className="directory-data-note">Model names and technical figures shown here are sample directory content. Confirm current specifications, model availability and machine configurations with the manufacturer before making a purchase decision.</p>
    </section>
  );
}

function DirectoryResources() {
  const features = [
    { icon: <Wrench />, title: 'Parts & support', text: 'Ask about parts identification and service assistance.', href: '/parts-service' },
    { icon: <FileText />, title: 'Technical documents', text: 'Browse resources or request verified documents.', href: '/resources' },
    { icon: <Gauge />, title: 'Machine guidance', text: 'Get help understanding machine classes and applications.', href: '/solutions' },
    { icon: <MapPin />, title: 'Contact the team', text: 'Send an equipment enquiry with your project details.', href: '/contact' },
  ];
  return (
    <section className="directory-resources directory-container">
      <div className="directory-resources-heading"><span className="directory-section-kicker">AFTER THE SHORTLIST</span><h2>More ways to <em>get support</em></h2><p>Useful next steps when you have a manufacturer or model in mind.</p></div>
      <div className="directory-resource-grid">
        {features.map((feature) => <a className="directory-resource-card" href={feature.href} key={feature.title}><span className="directory-resource-icon">{feature.icon}</span><span className="directory-resource-copy"><b>{feature.title}</b><small>{feature.text}</small><em>Learn more <ArrowUpRight size={13} /></em></span></a>)}
      </div>
    </section>
  );
}

function DirectoryCTA() {
  return (
    <section className="directory-cta">
      <div className="directory-cta-inner directory-container">
        <div className="directory-cta-icon"><Headphones size={34} /></div>
        <div><span>NEED HELP WITH YOUR SHORTLIST?</span><h2>Choose your next excavator <em>with confidence.</em></h2><p>Share your project requirements and ask the Iron Crest team for guidance.</p></div>
        <a href="/contact-us" className="directory-cta-button">Talk to our team <ArrowRight size={16} /></a>
        <img src="/images/hero-quarry.webp" alt="Excavator at a quarry" loading="lazy" />
      </div>
    </section>
  );
}

export default function BrandsPage() {
  const [search, setSearch] = useState(() => new URLSearchParams(window.location.search).get('search') || '');
  const [selectedSize, setSelectedSize] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('size');
    return sizeFilters.find(item => item.toLowerCase() === requested?.toLowerCase()) || 'All';
  });
  const [selectedBrand] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('brand');
    return brands.some(item => item.id === requested) ? requested : 'hyundai';
  });
  const searchTerm = search.trim().toLowerCase();
  const filteredBrands = useMemo(() => brands.filter((brand) => {
    const brandMatches = `${brand.name} ${brand.sub}`.toLowerCase().includes(searchTerm);
    const modelMatches = models.some((model) => model.brand === brand.id && `${model.model} ${model.brandName}`.toLowerCase().includes(searchTerm));
    return !searchTerm || brandMatches || modelMatches;
  }), [searchTerm]);

  const filteredModels = useMemo(() => models.filter((model) => {
    const sizeMatches = selectedSize === 'All' || model.type.toLowerCase().includes(selectedSize.toLowerCase());
    const textMatches = !searchTerm || `${model.brandName} ${model.model} ${model.type}`.toLowerCase().includes(searchTerm);
    return sizeMatches && textMatches;
  }), [selectedSize, searchTerm]);

  const activeBrand = filteredBrands.find((brand) => brand.id === selectedBrand) || filteredBrands[0] || brands.find((brand) => brand.id === selectedBrand) || brands[0];
  const featuredModel = models.find((model) => model.brand === activeBrand.id);
  const clearFilters = () => { setSearch(''); setSelectedSize('All'); };

  return (
    <div className="brands-page" id="top">
      <Header active="brands" />
      <main>
        <DirectoryHero search={search} setSearch={setSearch} size={selectedSize} setSize={setSelectedSize} />
        <BrandLogoRail className="brand-logo-strip-directory" />
        <BrandIndex filteredBrands={filteredBrands} selectedBrand={activeBrand.id} />
        {filteredBrands.length > 0 && <FeaturedBrand brand={activeBrand} model={featuredModel} />}
        <ModelExplorer filteredModels={filteredModels} selectedSize={selectedSize} onClear={clearFilters} />
        <DirectoryResources />
        <DirectoryCTA />
      </main>
      <Footer />
    </div>
  );
}
