import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown, Filter, Gauge, Search,
  SlidersHorizontal, X, XCircle,
} from 'lucide-react';
import { brands, models } from './data.js';
import { Header, Footer } from './Chrome.jsx';
import './excavators.css';

const availabilityFilters = ['All', 'Available', 'Not Available'];
const sizeFilters = ['All', 'Mini', 'Medium', 'Large', 'Mining'];

const statusKey = (value) => value === 'available' ? 'Available' : 'Not Available';

function CatalogCard({ model }) {
  const available = model.availability === 'available';
  return (
    <article className="catalog-card">
      <div className="catalog-card-image">
        <img src={model.image} alt={`${model.brandName} ${model.model} excavator`} loading="lazy" />
        <span className={`availability-badge ${available ? 'available' : 'unavailable'}`}>
          {available ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
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
          <a href={`/#contact?model=${encodeURIComponent(model.brandName + ' ' + model.model)}`} className="catalog-cta">Request details <ArrowRight size={15} /></a>
        </div>
      </div>
    </article>
  );
}

function AvailabilityManager({ models: allModels, setModels }) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  if (!open) return (
    <button className="availability-manager-trigger" onClick={() => setOpen(true)}>
      <SlidersHorizontal size={15} /> Manage availability
    </button>
  );
  return (
    <div className="availability-manager">
      <div className="manager-head">
        <div><strong>Availability manager</strong><span>Front-end control ready for hosting/CMS integration.</span></div>
        <button onClick={() => setOpen(false)} aria-label="Close"><X size={17} /></button>
      </div>
      <div className="manager-grid">
        {allModels.map((model) => (
          <label key={model.id} className="manager-item">
            <span><b>{model.brandName} {model.model}</b><small>{model.type}</small></span>
            <select value={model.availability} onChange={(e) => {
              const value = e.target.value;
              setModels(current => current.map(item => item.id === model.id ? { ...item, availability: value } : item));
              setSaved(false);
            }}>
              <option value="available">Available</option>
              <option value="not-available">Not Available</option>
            </select>
          </label>
        ))}
      </div>
      <button className="manager-save" onClick={() => { localStorage.setItem('ironCrestAvailability', JSON.stringify(allModels.reduce((acc, item) => ({ ...acc, [item.id]: item.availability }), {}))); setSaved(true); }}>
        {saved ? 'Saved in this browser' : 'Save availability'}
      </button>
      <p className="manager-note">For production, replace this local save with your hosting database/API. The UI and model IDs are already separated for that integration.</p>
    </div>
  );
}

export default function ExcavatorsPage() {
  const [catalogModels, setCatalogModels] = useState(models);
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('all');
  const [size, setSize] = useState('All');
  const [availability, setAvailability] = useState('All');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('ironCrestAvailability') || '{}');
      if (Object.keys(stored).length) {
        setCatalogModels(current => current.map(item => stored[item.id] ? { ...item, availability: stored[item.id] } : item));
      }
    } catch {}
  }, []);

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
              <p>Browse a professional multi-brand catalog by manufacturer, machine class and live availability status. Built for fast equipment selection and enquiry.</p>
              <div className="hero-stat-strip">
                <span><strong>{brands.length}</strong> brands</span>
                <span><strong>{catalogModels.length}</strong> catalog models</span>
                <span><strong>{catalogModels.filter(m => m.availability === 'available').length}</strong> currently available</span>
              </div>
            </div>
          </div>
        </section>

        <section className="catalog-controls-wrap">
          <div className="container">
            <div className="catalog-controls">
              <label className="catalog-search"><Search size={18} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search brand, model or machine class…" /><span>SEARCH</span></label>
              <div className="control-select"><span>Brand</span><select value={brand} onChange={e => setBrand(e.target.value)}><option value="all">All brands</option>{brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select><ChevronDown size={14} /></div>
              <div className="control-select"><span>Size</span><select value={size} onChange={e => setSize(e.target.value)}>{sizeFilters.map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></div>
              <div className="control-select"><span>Status</span><select value={availability} onChange={e => setAvailability(e.target.value)}>{availabilityFilters.map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></div>
              <button className="mobile-filter-button" onClick={() => setFiltersOpen(!filtersOpen)}><Filter size={16} /> Filters</button>
            </div>
          </div>
        </section>

        <section className="catalog-section container" id="catalog">
          <div className="catalog-heading">
            <div><span className="catalog-kicker">PRODUCT DIRECTORY</span><h2>Excavator <em>Catalog</em></h2><p>Choose a machine, check its status and request the exact local configuration.</p></div>
            <div className="catalog-heading-right"><span>{filtered.length} of {catalogModels.length} models</span><AvailabilityManager models={catalogModels} setModels={setCatalogModels} /></div>
          </div>

          {filtersOpen && <div className="mobile-filter-panel"><div className="control-select"><span>Brand</span><select value={brand} onChange={e => setBrand(e.target.value)}><option value="all">All brands</option>{brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></div><div className="control-select"><span>Size</span><select value={size} onChange={e => setSize(e.target.value)}>{sizeFilters.map(item => <option key={item}>{item}</option>)}</select></div><div className="control-select"><span>Status</span><select value={availability} onChange={e => setAvailability(e.target.value)}>{availabilityFilters.map(item => <option key={item}>{item}</option>)}</select></div></div>}

          {filtered.length ? <div className="catalog-grid">{filtered.map(model => <CatalogCard key={model.id} model={model} />)}</div> : (
            <div className="catalog-empty"><Search size={26} /><h3>No excavators match your filters</h3><p>Try another model, manufacturer or availability status.</p><button onClick={() => { setSearch(''); setBrand('all'); setSize('All'); setAvailability('All'); }}>Clear filters</button></div>
          )}
        </section>

        <section className="catalog-note">
          <div className="container catalog-note-inner">
            <div><Gauge size={28} /><div><strong>Need an exact specification?</strong><p>Model configurations can vary by market and attachment. Request the verified specification sheet and current stock status from Iron Crest before purchase.</p></div></div>
            <a href="/#contact" className="btn btn-primary">Talk to a specialist <ArrowRight size={16} /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
