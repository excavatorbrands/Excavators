import { useMemo, useRef, useState } from 'react';
import {
  ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Filter, Gauge, Search,
} from 'lucide-react';
import { brands, models } from './data.js';
import { Header, Footer } from './Chrome.jsx';
import './excavators.css';

const availabilityFilters = ['All', 'Needs confirmation', 'Confirmed available', 'Confirmed unavailable'];
const sizeFilters = ['All', 'Mini', 'Medium', 'Large', 'Mining'];

const statusKey = (value) => value === 'available'
  ? 'Confirmed available'
  : value === 'not-available' ? 'Confirmed unavailable' : 'Needs confirmation';

function CatalogCard({ model }) {
  return (
    <article className="catalog-card">
      <div className="catalog-card-image">
        <img src={model.image} alt={`${model.brandName} ${model.model} excavator`} loading="lazy" />
        <span className="availability-badge unverified">
          {statusKey(model.availability)}
        </span>
        <span className="catalog-brand">{model.brandName}</span>
      </div>
      <div className="catalog-card-body">
        <div className="catalog-type">{model.type}</div>
        <h3>{model.model}</h3>
        <div className="catalog-divider" />
        <div className="catalog-spec-row"><span>Brand</span><b>{model.brandName}</b></div>
        <div className="catalog-spec-row"><span>Machine class</span><b>{model.type}</b></div>
        <div className="catalog-spec-row"><span>Specifications</span><b>On request</b></div>
        <div className="catalog-actions">
          <a href={`/contact?type=equipment&model=${encodeURIComponent(`${model.brandName} ${model.model}`)}`} className="catalog-cta">Request details <ArrowRight size={15} /></a>
        </div>
      </div>
    </article>
  );
}

function CatalogBrandRail({ brand, brandModels }) {
  const railRef = useRef(null);
  const scrollRail = (direction) => railRef.current?.scrollBy({ left: direction * 660, behavior: 'smooth' });
  return (
    <section className="catalog-brand-row" aria-label={`${brand.name} excavators`}>
      <div className="catalog-brand-row-heading">
        <div><span className="catalog-kicker">MANUFACTURER</span><h3>{brand.name}</h3><span>{brandModels.length} model{brandModels.length === 1 ? '' : 's'}</span></div>
        <div className="catalog-rail-controls">
          <button type="button" onClick={() => scrollRail(-1)} aria-label={`Scroll ${brand.name} models left`}><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => scrollRail(1)} aria-label={`Scroll ${brand.name} models right`}><ChevronRight size={18} /></button>
        </div>
      </div>
      <div className="catalog-model-rail" ref={railRef}>
        {brandModels.map(model => <CatalogCard key={model.id} model={model} />)}
      </div>
    </section>
  );
}

export default function ExcavatorsPage() {
  const catalogModels = models;
  const [search, setSearch] = useState(() => new URLSearchParams(window.location.search).get('search') || '');
  const [brand, setBrand] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('brand');
    return brands.some(item => item.id === requested) ? requested : 'all';
  });
  const [size, setSize] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('size');
    return sizeFilters.find(item => item.toLowerCase() === requested?.toLowerCase()) || 'All';
  });
  const [availability, setAvailability] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('availability');
    return availabilityFilters.find(item => item.toLowerCase() === requested?.toLowerCase()) || 'All';
  });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => catalogModels.filter(model => {
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || `${model.brandName} ${model.model} ${model.type}`.toLowerCase().includes(q);
    const matchesBrand = brand === 'all' || model.brand === brand;
    const matchesSize = size === 'All' || model.type.toLowerCase().includes(size.toLowerCase());
    const matchesAvailability = availability === 'All' || statusKey(model.availability) === availability;
    return matchesSearch && matchesBrand && matchesSize && matchesAvailability;
  }), [catalogModels, search, brand, size, availability]);

  return (
    <div className="excavators-page" id="top">
      <Header active="excavators" />
      <main>
        <section className="excavators-hero">
          <div className="excavators-hero-image" />
          <div className="excavators-hero-inner container">
            <div className="excavators-breadcrumb"><a href="/">Home</a><span>›</span><b>Excavators</b></div>
            <div className="excavators-hero-copy">
              <span className="excavators-kicker">IRON CREST / GLOBAL EXCAVATOR CATALOG</span>
              <h1>THE COMPLETE<br /><em>EXCAVATOR RANGE</em></h1>
              <p>Browse model examples by manufacturer and machine class. Stock status and exact configurations must be confirmed with the Iron Crest team.</p>
              <div className="hero-stat-strip">
                <span><strong>{brands.length}</strong> brands</span>
                <span><strong>{catalogModels.length}</strong> model examples</span>
                <span><strong>Confirm</strong> stock status</span>
              </div>
            </div>
          </div>
        </section>

        <section className="catalog-controls-wrap">
          <div className="container">
            <div className="catalog-controls">
              <label className="catalog-search"><Search size={18} /><input aria-label="Search brand, model or machine class" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search brand, model or machine class…" /><span>SEARCH</span></label>
              <div className="control-select"><span>Brand</span><select aria-label="Filter by brand" value={brand} onChange={e => setBrand(e.target.value)}><option value="all">All brands</option>{brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select><ChevronDown size={14} /></div>
              <div className="control-select"><span>Size</span><select aria-label="Filter by machine class" value={size} onChange={e => setSize(e.target.value)}>{sizeFilters.map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></div>
              <div className="control-select"><span>Status</span><select aria-label="Filter by availability confirmation" value={availability} onChange={e => setAvailability(e.target.value)}>{availabilityFilters.map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></div>
              <button type="button" className="mobile-filter-button" aria-expanded={filtersOpen} aria-controls="mobile-catalog-filters" onClick={() => setFiltersOpen(!filtersOpen)}><Filter size={16} /> Filters</button>
            </div>
          </div>
        </section>

        <section className="catalog-section container" id="catalog">
          <div className="catalog-heading">
            <div><span className="catalog-kicker">PRODUCT DIRECTORY</span><h2>Excavator <em>Catalog</em></h2><p>Choose a machine, check its status and request the exact local configuration.</p></div>
            <div className="catalog-heading-right"><span>{filtered.length} of {catalogModels.length} model examples</span></div>
          </div>

          {filtersOpen && <div className="mobile-filter-panel" id="mobile-catalog-filters"><div className="control-select"><span>Brand</span><select aria-label="Filter by brand" value={brand} onChange={e => setBrand(e.target.value)}><option value="all">All brands</option>{brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></div><div className="control-select"><span>Size</span><select aria-label="Filter by machine class" value={size} onChange={e => setSize(e.target.value)}>{sizeFilters.map(item => <option key={item}>{item}</option>)}</select></div><div className="control-select"><span>Status</span><select aria-label="Filter by availability confirmation" value={availability} onChange={e => setAvailability(e.target.value)}>{availabilityFilters.map(item => <option key={item}>{item}</option>)}</select></div></div>}

          {filtered.length ? <div className="catalog-brand-rows">{brands.map(brandItem => { const brandModels = filtered.filter(model => model.brand === brandItem.id); return brandModels.length ? <CatalogBrandRail key={brandItem.id} brand={brandItem} brandModels={brandModels} /> : null; })}</div> : (
            <div className="catalog-empty" role="status"><Search size={26} /><h3>No excavators match your filters</h3><p>Try another model, manufacturer or availability status.</p><button type="button" onClick={() => { setSearch(''); setBrand('all'); setSize('All'); setAvailability('All'); }}>Clear filters</button></div>
          )}
        </section>

        <section className="catalog-note">
          <div className="container catalog-note-inner">
            <div><Gauge size={28} /><div><strong>Need an exact specification?</strong><p>Model configurations can vary by market and attachment. Request the verified specification sheet and current stock status from Iron Crest before purchase.</p></div></div>
            <a href="/contact?type=equipment" className="btn btn-primary">Talk to a specialist <ArrowRight size={16} /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
