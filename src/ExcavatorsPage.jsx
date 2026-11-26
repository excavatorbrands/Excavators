import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Gauge, Search, SlidersHorizontal } from 'lucide-react';
import { brands, models } from './data.js';
import { Header } from './Header.jsx';
import { modelPrice, modelUrl } from './catalogLinks.js';
import { Footer } from './Footer.jsx';
import { CatalogFAQs } from './EquipmentFAQs.jsx';
import './excavators.css';

const availabilityFilters = ['All', 'Needs confirmation', 'Confirmed available', 'Confirmed unavailable'];
const sizeFilters = ['All', 'Mini', 'Medium', 'Large', 'Mining'];
const batchSize = 9;
const brandNames = Object.fromEntries(brands.map(({ id, name }) => [id, name]));
const defaultFilters = { search: '', brand: 'all', size: 'All', availability: 'All' };

const statusKey = (value) => value === 'available'
  ? 'Confirmed available'
  : value === 'not-available' ? 'Confirmed unavailable' : 'Needs confirmation';

const normalizeSearch = (value) => value.trim().toLowerCase().replace(/\s+/g, ' ');

function initialFilters() {
  const params = new URLSearchParams(window.location.search);
  const brand = params.get('brand')?.toLowerCase();
  const size = sizeFilters.find(value => value.toLowerCase() === params.get('size')?.toLowerCase());
  const availability = availabilityFilters.find(value => value.toLowerCase() === params.get('availability')?.toLowerCase());
  return {
    search: params.get('search') || '',
    brand: brands.some(item => item.id === brand) ? brand : defaultFilters.brand,
    size: size || defaultFilters.size,
    availability: availability || defaultFilters.availability,
  };
}

function CatalogCard({ model, firstNewCardRef }) {
  return (
    <article className="gallery-card">
      <a className="gallery-card__link" ref={firstNewCardRef} href={modelUrl(model)} aria-label={`View ${model.brandName} ${model.model} details`}>
        <img className="gallery-card__image" src={model.image} alt="" loading="lazy" />
        <div className="gallery-card__body">
          <p className="gallery-kicker">{model.brandName}</p>
          <h3>{model.model}</h3>
          <p className="gallery-card__type">{model.type}</p>
          <p className="gallery-card__status">{statusKey(model.availability)}</p>
          <div className="gallery-card__bottom">
            <strong>{modelPrice(model)}</strong>
            <span className="gallery-card__arrow" aria-hidden="true"><ArrowRight size={17} /></span>
          </div>
        </div>
      </a>
    </article>
  );
}

export default function ExcavatorsPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const firstNewCardRef = useRef(null);
  const searchRef = useRef(null);
  const { search, brand, size, availability } = filters;
  const terms = normalizeSearch(search).split(' ').filter(Boolean);
  const filtered = models.filter(model => {
    const searchable = normalizeSearch(`${model.brandName} ${model.model} ${model.type} ${brandNames[model.brand] || ''}`);
    return terms.every(term => searchable.includes(term)) &&
      (brand === 'all' || model.brand === brand) &&
      (size === 'All' || model.type.toLowerCase().includes(size.toLowerCase())) &&
      (availability === 'All' || statusKey(model.availability) === availability);
  });

  useEffect(() => {
    if (visibleCount > batchSize) firstNewCardRef.current?.focus();
  }, [visibleCount]);

  const updateFilter = (event) => {
    const { name, value } = event.target;
    setFilters(current => ({ ...current, [name]: value }));
    setVisibleCount(batchSize);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setVisibleCount(batchSize);
    searchRef.current?.focus();
  };

  const hasFilters = Boolean(search || brand !== 'all' || size !== 'All' || availability !== 'All');
  const shown = Math.min(filtered.length, visibleCount);

  return (
    <div className="excavators-page catalog-gallery" id="top">
      <Header active="excavators" />
      <main className="container gallery-main">
        <nav className="gallery-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Excavators</span>
        </nav>
        <section className="gallery-hero" aria-labelledby="gallery-title">
          <div className="gallery-hero__copy">
            <p className="gallery-kicker">{brands.length} brands · {models.length} models</p>
            <h1 id="gallery-title">Excavator catalog</h1>
            <p>Browse the range, from compact machines to heavy quarry equipment.</p>
          </div>
          <img src="/images/brands/brand-directory-hero.webp" alt="" fetchPriority="high" />
        </section>

        <div className="gallery-layout" id="catalog">
          <aside className="gallery-filters" aria-labelledby="gallery-filter-title">
            <h2 id="gallery-filter-title"><SlidersHorizontal size={18} aria-hidden="true" /> Filter models</h2>
            <div className="gallery-filters__fields">
              <label className="gallery-filter-search">
                Search models
                <span className="gallery-search-input">
                  <Search size={16} aria-hidden="true" />
                  <input ref={searchRef} type="search" name="search" value={search} onChange={updateFilter} placeholder="e.g. Volvo EC60E" />
                </span>
              </label>
              <label>
                Manufacturer
                <select name="brand" value={brand} onChange={updateFilter}>
                  <option value="all">All brands</option>
                  {brands.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
              </label>
              <label>
                Machine class
                <select name="size" value={size} onChange={updateFilter}>
                  {sizeFilters.map(item => <option key={item} value={item}>{item === 'All' ? 'All classes' : item}</option>)}
                </select>
              </label>
              <label>
                Availability
                <select name="availability" value={availability} onChange={updateFilter}>
                  {availabilityFilters.map(item => <option key={item} value={item}>{item === 'All' ? 'All statuses' : item}</option>)}
                </select>
              </label>
            </div>
            {hasFilters && <button className="gallery-clear" type="button" onClick={clearFilters}>Clear filters</button>}
          </aside>

          <section className="gallery-results" aria-labelledby="gallery-results-title">
            <div className="gallery-results__heading">
              <h2 id="gallery-results-title">Browse models</h2>
              <p role="status">{shown} shown · {filtered.length} of {models.length} models</p>
            </div>
            {filtered.length ? (
              <div className="gallery-grid">
                {filtered.slice(0, visibleCount).map((model, index) => (
                  <CatalogCard key={model.id} model={model} firstNewCardRef={index === visibleCount - batchSize ? firstNewCardRef : undefined} />
                ))}
              </div>
            ) : (
              <div className="gallery-empty">
                <Search size={24} aria-hidden="true" />
                <h3>No excavators match your filters</h3>
                <p>Try another model, manufacturer, or availability status.</p>
              </div>
            )}
            {visibleCount < filtered.length && (
              <button className="btn gallery-more" type="button" onClick={() => setVisibleCount(count => count + batchSize)}>
                Show more models <ArrowDown size={16} aria-hidden="true" />
              </button>
            )}
            <p className="gallery-image-note">Equipment images are AI-generated illustrations. Ask us for photos of the exact machine.</p>
          </section>
        </div>

        <CatalogFAQs />

        <section className="gallery-support" aria-labelledby="gallery-support-title">
          <Gauge size={25} aria-hidden="true" />
          <div>
            <h2 id="gallery-support-title">Need an exact specification?</h2>
            <p>Ask the Iron Crest team for the verified specification sheet and current availability.</p>
          </div>
          <a href="/contact?type=equipment" className="btn btn-primary">Talk to a specialist <ArrowRight size={16} aria-hidden="true" /></a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
