import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, ClipboardList,
  FileText, Filter, Gauge, Headphones, Menu, Package, Search, Scale,
  ShieldCheck, SlidersHorizontal, Wrench, X, Youtube, MapPin, Phone, Mail,
} from 'lucide-react';
import { brands, models } from './data.js';
import './brands.css';

const sizeFilters = ['All', 'Mini', 'Medium', 'Large', 'Mining'];

function IronCrestLogo() {
  return (
    <a className="directory-logo" href="/" aria-label="Iron Crest home">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 3 40 8 49 7 53 16 61 23 57 32 61 41 53 48 49 57 40 56 32 61 24 56 15 57 11 48 3 41 7 32 3 23 11 16 15 7 24 8Z" fill="currentColor" />
        <path d="m12 39 11-14 7 8 8-12 14 18Z" fill="#0c1218" />
        <path d="M13 44h38" stroke="#0c1218" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span><strong>IRON <b>CREST</b></strong><small>EXCAVATOR SOLUTIONS</small></span>
    </a>
  );
}

function DirectoryHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="directory-header">
      <div className="directory-nav-wrap">
        <IronCrestLogo />
        <button className="directory-mobile-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`directory-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="/">Home</a>
          <a className="is-active" href="/brands" aria-current="page">Brands <ChevronDown size={12} /></a>
          <a href="/#models">Excavators <ChevronDown size={12} /></a>
          <a href="/#support">Parts &amp; Service</a>
          <a href="/#solutions">Solutions</a>
          <a href="/#why-us">About Us</a>
          <a href="/#contact">Contact</a>
        </nav>
        <a className="directory-quote" href="/#contact">Get a Quote <ArrowRight size={15} /></a>
      </div>
    </header>
  );
}

function BrandWordmark({ brand }) {
  return (
    <span className={`directory-wordmark wordmark-${brand.id}`}>
      {brand.id === 'hyundai' && <i className="hyundai-mark" aria-hidden="true" />}
      {brand.id === 'cat' && <i className="cat-mark" aria-hidden="true" />}
      {brand.id === 'sany' && <i className="sany-mark" aria-hidden="true" />}
      <strong>{brand.name}</strong>
    </span>
  );
}

function DirectoryHero({ search, setSearch, size, setSize, compareCount, goToCompare }) {
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
        <button className="directory-compare-shortcut" onClick={goToCompare}><Scale size={19} /> Compare <b>{compareCount}</b></button>
      </div>
    </section>
  );
}

function BrandIndex({ filteredBrands, selectedBrand, onSelect }) {
  return (
    <section className="brand-index directory-container" aria-labelledby="brand-index-title">
      <div className="directory-section-head">
        <div><span className="directory-section-kicker">MANUFACTURER INDEX</span><h2 id="brand-index-title">Our <em>Brands</em></h2></div>
        <span className="brand-index-caption">{filteredBrands.length} of {brands.length} manufacturers</span>
      </div>
      {filteredBrands.length ? (
        <div className="brand-index-grid">
          {filteredBrands.map((brand) => (
            <button type="button" key={brand.id} className={`brand-index-card ${selectedBrand === brand.id ? 'is-selected' : ''}`} onClick={() => onSelect(brand.id)} aria-pressed={selectedBrand === brand.id}>
              <span className="brand-index-card-top"><span className="brand-index-number">{String(brands.findIndex((item) => item.id === brand.id) + 1).padStart(2, '0')}</span><ArrowUpRight size={15} /></span>
              <BrandWordmark brand={brand} />
              <span className="brand-index-sub">{brand.sub}</span>
              <span className="brand-index-action">Explore range <ArrowRight size={13} /></span>
            </button>
          ))}
        </div>
      ) : <div className="directory-empty"><Search size={22} /><strong>No brands found</strong><span>Try a different manufacturer or model name.</span></div>}
    </section>
  );
}

function FeaturedBrand({ brand, model, onExplore }) {
  const brandModelCount = models.filter((item) => item.brand === brand.id).length;
  return (
    <section className="featured-brand directory-container" aria-labelledby="featured-brand-title">
      <div className="featured-visual">
        <img src={model ? `/images/brands/model-${model.brand}.webp` : "/images/brands/brand-featured-excavator.webp"} alt={`${brand.name} excavator model`} />
        <span className="featured-image-shade" />
        <span className="featured-label"><span>★</span> SELECTED MANUFACTURER</span>
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
          <button className="directory-primary-button" onClick={onExplore}>View {brand.name} models <ArrowRight size={16} /></button>
          <a className="directory-text-link" href="/#contact">Request brand information <ArrowUpRight size={15} /></a>
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

function ModelExplorer({ filteredModels, search, selectedSize, onAddCompare, compareIds, onClear }) {
  return (
    <section className="model-explorer directory-container" id="brand-models" aria-labelledby="model-explorer-title">
      <div className="directory-section-head model-explorer-head">
        <div><span className="directory-section-kicker">BROWSE THE LINEUP</span><h2 id="model-explorer-title">Model <em>Explorer</em></h2><p>Browse model examples associated with the manufacturers above.</p></div>
        <span className="model-result-count">{filteredModels.length.toString().padStart(2, '0')} LISTINGS</span>
      </div>
      {filteredModels.length ? (
        <div className="directory-model-grid">
          {filteredModels.map((model) => {
            const inCompare = compareIds.includes(model.id);
            return (
              <article className="directory-model-card" key={model.id}>
                <div className="directory-model-image"><img src={`/images/brands/model-${model.brand}.webp`} alt={`${model.brandName} ${model.model} excavator`} loading="lazy" /><span className="directory-model-brand">{model.brandName}</span></div>
                <div className="directory-model-body">
                  <div className="directory-model-title"><div><span>{model.type}</span><h3>{model.model}</h3></div><ArrowUpRight size={16} /></div>
                  <div className="directory-model-specs">
                    <span><Gauge size={14} /> Power <b>{model.power}</b></span>
                    <span><Package size={14} /> Operating weight <b>{model.weight}</b></span>
                    <span><Scale size={14} /> Bucket capacity <b>{model.bucket}</b></span>
                  </div>
                  <div className="directory-model-actions">
                    <a href="/#contact">Request details <ArrowRight size={14} /></a>
                    <button className={inCompare ? 'is-added' : ''} onClick={() => onAddCompare(model.id)} aria-pressed={inCompare}>{inCompare ? <Check size={14} /> : <span>+</span>} {inCompare ? 'Added' : 'Compare'}</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="directory-empty model-empty"><SlidersHorizontal size={23} /><strong>No matching model examples</strong><span>{selectedSize !== 'All' ? `There are no ${selectedSize.toLowerCase()} excavator examples in the current sample dataset.` : 'Try another search term or clear the current filters.'}</span><button onClick={onClear}>Clear filters <ArrowRight size={14} /></button></div>
      )}
      <p className="directory-data-note">Model names and technical figures shown here are sample directory content. Confirm current specifications, model availability and machine configurations with the manufacturer before making a purchase decision.</p>
    </section>
  );
}

function ComparisonBuilder({ selectedModels, onRemove, onClear, notice }) {
  return (
    <section className="comparison-builder directory-container" id="brand-comparison" aria-labelledby="comparison-title">
      <div className="comparison-heading">
        <div className="comparison-icon"><Scale size={25} /></div>
        <div><span className="directory-section-kicker">SIDE-BY-SIDE REVIEW</span><h2 id="comparison-title">Compare <em>Excavators</em></h2><p>Select up to three model examples from the Model Explorer.</p></div>
        {notice && <span className="comparison-notice">{notice}</span>}
        {selectedModels.length > 0 && <button className="comparison-clear" onClick={onClear}>Clear selection <X size={14} /></button>}
      </div>
      {selectedModels.length ? (
        <div className="comparison-table-scroll"><table className="directory-comparison-table">
          <thead><tr><th>Specification</th>{selectedModels.map((model) => <th key={model.id}><span>{model.brandName}</span><b>{model.model}</b><button onClick={() => onRemove(model.id)} aria-label={`Remove ${model.brandName} ${model.model}`}><X size={13} /></button></th>)}</tr></thead>
          <tbody>
            <tr><th>Machine type</th>{selectedModels.map((model) => <td key={model.id}>{model.type}</td>)}</tr>
            <tr><th>Engine power</th>{selectedModels.map((model) => <td key={model.id}>{model.power}</td>)}</tr>
            <tr><th>Operating weight</th>{selectedModels.map((model) => <td key={model.id}>{model.weight}</td>)}</tr>
            <tr><th>Bucket capacity</th>{selectedModels.map((model) => <td key={model.id}>{model.bucket}</td>)}</tr>
          </tbody>
        </table></div>
      ) : (
        <div className="comparison-empty">
          {[0, 1, 2].map((slot) => <div className="comparison-slot" key={slot}><span>0{slot + 1}</span><b>+</b><small>Add a model</small></div>)}
          <div className="comparison-empty-copy"><strong>Your comparison starts here</strong><span>Choose two or three models to review their listed specifications together.</span><a href="#brand-models">Browse model examples <ArrowDown size={14} /></a></div>
        </div>
      )}
      <p className="comparison-disclaimer">Comparison values are illustrative dataset entries, not verified current manufacturer specifications. Always request official technical data before comparing or ordering machines.</p>
    </section>
  );
}

function DirectoryResources() {
  const features = [
    { icon: <Wrench />, title: 'Parts & support', text: 'Ask about parts identification and service assistance.', href: '/#support' },
    { icon: <FileText />, title: 'Technical documents', text: 'Request current brochures and manufacturer specification sheets.', href: '/#resources' },
    { icon: <Youtube />, title: 'Machine guidance', text: 'Get help understanding machine classes and applications.', href: '/#contact' },
    { icon: <MapPin />, title: 'Dealer assistance', text: 'Contact the Iron Crest team about local support.', href: '/#contact' },
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
        <a href="/#contact" className="directory-cta-button">Talk to our team <ArrowRight size={16} /></a>
        <img src="/images/brands/brand-featured-excavator.webp" alt="Excavator at a quarry" loading="lazy" />
      </div>
    </section>
  );
}

function DirectoryFooter() {
  return (
    <footer className="directory-footer">
      <div className="directory-footer-main directory-container">
        <div><IronCrestLogo /><p>Excavator manufacturer directory, model browsing and equipment guidance from Iron Crest.</p></div>
        <div><b>Explore</b><a href="/">Home</a><a href="/brands">Brands</a><a href="/#models">Excavators</a></div>
        <div><b>Support</b><a href="/#support">Parts &amp; Service</a><a href="/#resources">Product information</a><a href="/#contact">Contact the team</a></div>
        <div><b>Contact</b><a href="tel:+923001234567"><Phone size={13} /> +92 300 1234567</a><a href="mailto:sales@ironcrest.com"><Mail size={13} /> sales@ironcrest.com</a><span><MapPin size={13} /> Lahore, Pakistan</span></div>
      </div>
      <div className="directory-footer-bottom directory-container"><span>© {new Date().getFullYear()} Iron Crest Excavator Solutions. All rights reserved.</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}

export default function BrandsPage() {
  const [search, setSearch] = useState('');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('hyundai');
  const [compareIds, setCompareIds] = useState([]);
  const [compareNotice, setCompareNotice] = useState('');

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Excavator Brands Directory | Iron Crest';
    return () => { document.title = previousTitle; };
  }, []);

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
  const selectedModels = compareIds.map((id) => models.find((model) => model.id === id)).filter(Boolean);

  const addCompare = (modelId) => {
    if (compareIds.includes(modelId)) {
      setCompareIds((current) => current.filter((id) => id !== modelId));
      setCompareNotice('');
      return;
    }
    if (compareIds.length >= 3) {
      setCompareNotice('The comparison is limited to three models. Remove one to add another.');
      return;
    }
    setCompareIds((current) => [...current, modelId]);
    setCompareNotice('');
  };

  const exploreSelectedBrand = () => {
    setSearch(activeBrand.name);
    setSelectedSize('All');
    document.getElementById('brand-models')?.scrollIntoView({ behavior: 'smooth' });
  };
  const goToCompare = () => document.getElementById('brand-comparison')?.scrollIntoView({ behavior: 'smooth' });
  const clearFilters = () => { setSearch(''); setSelectedSize('All'); };

  return (
    <div className="brands-page" id="top">
      <DirectoryHeader />
      <main>
        <DirectoryHero search={search} setSearch={setSearch} size={selectedSize} setSize={setSelectedSize} compareCount={compareIds.length} goToCompare={goToCompare} />
        <BrandIndex filteredBrands={filteredBrands} selectedBrand={activeBrand.id} onSelect={setSelectedBrand} />
        {filteredBrands.length > 0 && <FeaturedBrand brand={activeBrand} model={featuredModel} onExplore={exploreSelectedBrand} />}
        <ModelExplorer filteredModels={filteredModels} search={search} selectedSize={selectedSize} onAddCompare={addCompare} compareIds={compareIds} onClear={clearFilters} />
        <ComparisonBuilder selectedModels={selectedModels} onRemove={addCompare} onClear={() => { setCompareIds([]); setCompareNotice(''); }} notice={compareNotice} />
        <DirectoryResources />
        <DirectoryCTA />
      </main>
      <DirectoryFooter />
    </div>
  );
}
