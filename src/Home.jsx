
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle, ArrowRight, ArrowUpRight, BadgeCheck, Check,
  ChevronLeft, ChevronRight, CircleDollarSign, Download,
  Factory, FileText, Gauge, Headphones, Mail, MapPin,
  MapPinned, Package, Search, Settings2, Scale,
  SlidersHorizontal, Truck, Users, Wrench, X,
} from 'lucide-react';

import {
  brands,
  categories,
  heroSlides,
  industries,
  models,
} from './data.js';

import { Header, Footer } from './Chrome.jsx';
import BrandLogoRail from './BrandLogoRail.jsx';
import { submitEnquiry } from './submitEnquiry.js';

import './HomeComparisonDrawer.css';


function SectionEyebrow({ children }) {
  return <div className="eyebrow"><span />{children}</div>;
}


function SectionTitle({ eyebrow, title, accent, description, action }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
        <h2>{title} {accent && <em>{accent}</em>}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}


// --------------------------------------------------
// ENQUIRY MODAL
// --------------------------------------------------

function QuoteModal({ modal, onClose }) {
  const [requestNotice, setRequestNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setRequestNotice('');
  }, [modal?.type, modal?.model?.id]);

  useEffect(() => {
    if (!modal) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modal, onClose]);

  if (!modal) return null;

  const isModel = modal.type === 'model';
  const isCatalog = modal.type === 'catalog';

  const heading = isModel
    ? `${modal.model.brandName} ${modal.model.model}`
    : isCatalog
      ? 'Request the Iron Crest catalog'
      : 'Talk to an excavator specialist';

  const subheading = isModel
    ? 'Ask our team for current availability, configuration options and a verified specification sheet.'
    : isCatalog
      ? 'Tell us where to send the latest excavator range and product information.'
      : 'Share a few details and our equipment team will help you shortlist the right machine.';

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const interest = formData.get('interest');

    const interestLabel =
      form.elements.namedItem('interest').selectedOptions[0]?.textContent?.trim() || '';

    setIsSubmitting(true);
    setRequestNotice('');

    try {
      await submitEnquiry({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        type:
          interest === 'parts'
            ? 'parts'
            : interest === 'consultation'
              ? 'project'
              : 'equipment',
        interest: interestLabel,
        message: formData.get('message'),
        website: formData.get('website'),
      });

      form.reset();
      setRequestNotice('Thank you. Your enquiry has been sent to the Iron Crest team.');
    } catch {
      setRequestNotice(
        'We could not send your enquiry. Your details remain in this form. Please email us or call +92 300 1234567.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          autoFocus
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="modal-kicker">
          <span className="mini-mark">IC</span>
          IRON CREST ENQUIRY
        </div>

        <h2 id="modal-title">{heading}</h2>
        <p className="modal-intro">{subheading}</p>

        <form className="quote-form" onSubmit={handleSubmit}>
          <label className="form-honeypot" aria-hidden="true">
            Leave this field empty
            <input name="website" tabIndex="-1" autoComplete="off" />
          </label>

          <label>
            Full name
            <input required name="name" placeholder="Your name" />
          </label>

          <div className="form-row">
            <label>
              Email address
              <input required type="email" name="email" placeholder="you@company.com" />
            </label>

            <label>
              Phone number
              <input required name="phone" placeholder="+92 ..." />
            </label>
          </div>

          <label>
            What are you looking for?
            <select defaultValue={isModel ? modal.model.id : ''} name="interest" required>
              <option value="" disabled>Select an excavator or service</option>

              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.brandName} {model.model}
                </option>
              ))}

              <option value="parts">Parts & service</option>
              <option value="consultation">Equipment consultation</option>
            </select>
          </label>

          <label>
            Project details
            <textarea
              name="message"
              rows="3"
              placeholder="Tell us about your project, location and expected timeline."
            />
          </label>

          <button className="btn btn-primary btn-wide" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send enquiry'}
            <ArrowRight size={17} />
          </button>

          <small className="form-note">
            Your enquiry will be sent to Iron Crest by email. Please do not include sensitive personal information.
          </small>

          {requestNotice && (
            <p
              className={`form-note ${
                requestNotice.startsWith('Thank you') ? 'form-success' : 'form-unavailable'
              }`}
              role={requestNotice.startsWith('Thank you') ? 'status' : 'alert'}
            >
              {requestNotice}

              {!requestNotice.startsWith('Thank you') && (
                <>
                  {' '}Contact us at{' '}
                  <a href="mailto:sales@ironcrest.com">sales@ironcrest.com</a>
                  {' '}or{' '}
                  <a href="tel:+923001234567">+92 300 1234567</a>.
                </>
              )}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}


// --------------------------------------------------
// BRAND STRIP
// --------------------------------------------------

function BrandStrip() {
  return <BrandLogoRail className="brand-logo-strip-home" id="brands" />;
}


// --------------------------------------------------
// FULLY CLICKABLE MODEL CARD
// --------------------------------------------------

function ModelCard({ model, onDetails, onCompare, inCompare }) {
  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onDetails(model);
    }
  };

  return (
    <article
      className="model-card home-clickable-model-card"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${model.brandName} ${model.model}`}
      onClick={(event) => {
        if (event.target.closest('button, a')) return;
        onDetails(model);
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="model-image-wrap">
        <img
          src={model.image}
          alt={`${model.brandName} ${model.model} excavator`}
          loading="lazy"
        />
      </div>

      <div className="model-card-body">
        <div className="model-brand-label">{model.brandName}</div>

        <h3>{model.model}</h3>

        <p className="model-type">{model.type}</p>

        <div className="spec-list">
          <span>
            <Gauge size={14} />
            Engine power
            <b>{model.power}</b>
          </span>

          <span>
            <Truck size={14} />
            Operating weight
            <b>{model.weight}</b>
          </span>

          <span>
            <Package size={14} />
            Bucket capacity
            <b>{model.bucket}</b>
          </span>
        </div>

        <div className="model-card-actions">
          <button
            type="button"
            className="model-link"
            onClick={(event) => {
              event.stopPropagation();
              onDetails(model);
            }}
          >
            View Details
            <ArrowRight size={15} />
          </button>

          <button
            type="button"
            className={`model-compare-link ${inCompare ? 'is-added' : ''}`}
            onClick={(event) => {
              event.stopPropagation();
              onCompare(model);
            }}
            aria-pressed={inCompare}
          >
            {inCompare ? <Check size={13} /> : <span>+</span>}
            {inCompare ? 'Added' : 'Compare'}
          </button>
        </div>
      </div>
    </article>
  );
}


// --------------------------------------------------
// MANUFACTURER MODEL RAIL
// --------------------------------------------------

function HomeBrandModelRail({
  brand,
  brandModels,
  compareIds,
  onCompare,
  onDetails,
}) {
  const railRef = useRef(null);

  const scrollRail = (direction) => {
    railRef.current?.scrollBy({
      left: direction * 620,
      behavior: 'smooth',
    });
  };

  return (
    <section className="home-brand-row" aria-label={`${brand.name} excavators`}>
      <div className="home-brand-row-heading">
        <div>
          <span>MANUFACTURER</span>
          <h3>{brand.name}</h3>
        </div>

        <div className="home-model-rail-actions">
          <span>
            {brandModels.length} model{brandModels.length === 1 ? '' : 's'}
          </span>

          <button
            type="button"
            onClick={() => scrollRail(-1)}
            aria-label={`Scroll ${brand.name} models left`}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => scrollRail(1)}
            aria-label={`Scroll ${brand.name} models right`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="home-model-rail" ref={railRef}>
        {brandModels.map((model) => (
          <ModelCard
            key={model.id}
            model={model}
            onDetails={onDetails}
            onCompare={onCompare}
            inCompare={compareIds.includes(model.id)}
          />
        ))}
      </div>
    </section>
  );
}


// --------------------------------------------------
// RIGHT-SIDE CATALOG AND COMPARISON DRAWER
// --------------------------------------------------

function ExcavatorDrawer({
  mode,
  onClose,
  selectedModels,
  onSelectModel,
  onRemoveModel,
  onOpenCatalog,
  onOpenComparison,
  replaceSlot,
  notice,
}) {
  const [drawerSearch, setDrawerSearch] = useState('');
  const [drawerBrand, setDrawerBrand] = useState('all');

  useEffect(() => {
    setDrawerSearch('');
    setDrawerBrand('all');
  }, [mode]);

  useEffect(() => {
    if (!mode) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mode, onClose]);

  const catalogModels = useMemo(() => {
    const query = drawerSearch.trim().toLowerCase();

    return models.filter((model) => {
      const matchesBrand = drawerBrand === 'all' || model.brand === drawerBrand;

      const matchesSearch =
        !query ||
        `${model.brandName} ${model.model} ${model.type}`
          .toLowerCase()
          .includes(query);

      return matchesBrand && matchesSearch;
    });
  }, [drawerSearch, drawerBrand]);

  if (!mode) return null;

  const isCatalog = mode === 'catalog';

  return (
    <div className="ic-drawer-layer">
      <button
        className="ic-drawer-backdrop"
        type="button"
        aria-label="Close panel"
        onClick={onClose}
      />

      <aside
        className="ic-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ic-drawer-title"
      >
        <div className="ic-drawer-header">
          <div className="ic-drawer-heading">
            <span className="ic-drawer-eyebrow">
              {isCatalog ? 'IRON CREST · EQUIPMENT DIRECTORY' : 'IRON CREST · SIDE-BY-SIDE REVIEW'}
            </span>

            <h2 id="ic-drawer-title">
              {isCatalog ? (
                <>Excavator <em>Catalog</em></>
              ) : (
                <>Compare <em>Excavators</em></>
              )}
            </h2>

            <p>
              {isCatalog
                ? 'Find a manufacturer and select the excavator you want to compare.'
                : 'Review your selected machines and their listed specifications.'}
            </p>
          </div>

          <button
            type="button"
            className="ic-drawer-close"
            onClick={onClose}
            aria-label="Close drawer"
          >
            <X size={21} />
          </button>
        </div>

        {isCatalog ? (
          <>
            <div className="ic-catalog-toolbar">
              <label className="ic-catalog-search">
                <Search size={17} />

                <input
                  type="search"
                  value={drawerSearch}
                  onChange={(event) => setDrawerSearch(event.target.value)}
                  placeholder="Search model, manufacturer..."
                  autoFocus
                />

                {drawerSearch && (
                  <button
                    type="button"
                    onClick={() => setDrawerSearch('')}
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </label>

              <div className="ic-catalog-filter-heading">
                <SlidersHorizontal size={15} />
                MANUFACTURERS
              </div>

              <div className="ic-catalog-brand-filters">
                <button
                  type="button"
                  className={drawerBrand === 'all' ? 'active' : ''}
                  onClick={() => setDrawerBrand('all')}
                >
                  All Brands
                </button>

                {brands.map((brand) => (
                  <button
                    type="button"
                    key={brand.id}
                    className={drawerBrand === brand.id ? 'active' : ''}
                    onClick={() => setDrawerBrand(brand.id)}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>

              <div className="ic-catalog-results">
                <strong>{catalogModels.length} Models</strong>
                <span>Available in the catalog directory</span>
              </div>
            </div>

            <div className="ic-drawer-scroll">
              {catalogModels.length ? (
                <div className="ic-catalog-grid">
                  {catalogModels.map((model) => {
                    const alreadySelected = selectedModels.some(
                      (selected) => selected.id === model.id
                    );

                    return (
                      <article className="ic-catalog-card" key={model.id}>
                        <div className="ic-catalog-card-image">
                          <img
                            src={model.image}
                            alt={`${model.brandName} ${model.model}`}
                            loading="lazy"
                          />

                          <span>{model.brandName}</span>
                        </div>

                        <div className="ic-catalog-card-body">
                          <h3>{model.model}</h3>
                          <p>{model.type}</p>

                          <div className="ic-catalog-card-specs">
                            <span>Engine power</span>
                            <b>{model.power}</b>
                          </div>

                          <button
                            type="button"
                            className={`ic-catalog-select ${
                              alreadySelected ? 'selected' : ''
                            }`}
                            onClick={() => onSelectModel(model)}
                          >
                            {alreadySelected ? (
                              <>
                                <Check size={15} />
                                Already Added
                              </>
                            ) : replaceSlot !== null ? (
                              <>
                                <Check size={15} />
                                Replace Model
                              </>
                            ) : (
                              <>
                                <span>+</span>
                                Add to Comparison
                              </>
                            )}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="ic-drawer-empty">
                  <Search size={30} />
                  <h3>No excavators found</h3>
                  <p>Try another model name or manufacturer.</p>

                  <button
                    type="button"
                    onClick={() => {
                      setDrawerSearch('');
                      setDrawerBrand('all');
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="ic-comparison-toolbar">
              <div>
                <strong>{selectedModels.length} / 3 Machines Selected</strong>
                <span>Compare up to three excavator models.</span>
              </div>

              <button
                type="button"
                onClick={onOpenCatalog}
                disabled={selectedModels.length >= 3}
              >
                <span>+</span> Add Excavator
              </button>
            </div>

            <div className="ic-drawer-scroll ic-comparison-scroll">
              <div className="ic-comparison-machine-grid">
                {[0, 1, 2].map((slot) => {
                  const model = selectedModels[slot];

                  return (
                    <div className="ic-comparison-machine" key={slot}>
                      {model ? (
                        <>
                          <button
                            type="button"
                            className="ic-machine-remove"
                            aria-label={`Remove ${model.model}`}
                            onClick={() => onRemoveModel(model)}
                          >
                            <X size={15} />
                          </button>

                          <div className="ic-comparison-machine-image">
                            <img src={model.image} alt={`${model.brandName} ${model.model}`} />
                          </div>

                          <span className="ic-machine-brand">{model.brandName}</span>
                          <strong>{model.model}</strong>
                          <small>{model.type}</small>

                          <button
                            type="button"
                            className="ic-machine-replace"
                            onClick={() => onOpenCatalog(slot)}
                          >
                            Replace model
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="ic-comparison-add-slot"
                          onClick={() => onOpenCatalog(slot)}
                        >
                          <span>0{slot + 1}</span>
                          <b>+</b>
                          <strong>Add Excavator</strong>
                          <small>Select from catalog</small>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {selectedModels.length > 0 && (
                <div className="ic-spec-comparison">
                  <div className="ic-spec-heading">
                    <span>TECHNICAL OVERVIEW</span>
                    <h3>Model Specifications</h3>
                    <p>Illustrative entries · Verify manufacturer data</p>
                  </div>

                  <table>
                    <thead>
                      <tr>
                        <th>Specification</th>

                        {selectedModels.map((model) => (
                          <th key={model.id}>
                            {model.model}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <th>Manufacturer</th>
                        {selectedModels.map((model) => (
                          <td key={model.id}>{model.brandName}</td>
                        ))}
                      </tr>

                      <tr>
                        <th>Machine type</th>
                        {selectedModels.map((model) => (
                          <td key={model.id}>{model.type}</td>
                        ))}
                      </tr>

                      <tr>
                        <th>Engine power</th>
                        {selectedModels.map((model) => (
                          <td key={model.id}>{model.power}</td>
                        ))}
                      </tr>

                      <tr>
                        <th>Operating weight</th>
                        {selectedModels.map((model) => (
                          <td key={model.id}>{model.weight}</td>
                        ))}
                      </tr>

                      <tr>
                        <th>Bucket capacity</th>
                        {selectedModels.map((model) => (
                          <td key={model.id}>{model.bucket}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {!selectedModels.length && (
                <div className="ic-drawer-empty">
                  <Scale size={34} />
                  <h3>Your comparison starts here</h3>
                  <p>Add two or three machines to review their specifications together.</p>

                  <button type="button" onClick={onOpenCatalog}>
                    Browse Excavator Catalog <ArrowRight size={15} />
                  </button>
                </div>
              )}

              <p className="ic-comparison-disclaimer">
                Comparison values are illustrative dataset entries, not verified current
                manufacturer specifications. Always request official technical data before
                comparing or ordering machines.
              </p>
            </div>

            <div className="ic-drawer-footer">
              <button
                type="button"
                className="ic-drawer-secondary"
                onClick={onOpenCatalog}
                disabled={selectedModels.length >= 3}
              >
                <span>+</span> Add another model
              </button>

              <button
                type="button"
                className="ic-drawer-primary"
                onClick={onClose}
              >
                Done <Check size={16} />
              </button>
            </div>
          </>
        )}

        {notice && (
          <div className="ic-drawer-notice" role="status">
            <AlertCircle size={15} />
            {notice}
          </div>
        )}
      </aside>
    </div>
  );
}


// --------------------------------------------------
// HOMEPAGE
// --------------------------------------------------

export default function HomePage() {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modal, setModal] = useState(null);

  const [compareIds, setCompareIds] = useState([]);
  const [compareNotice, setCompareNotice] = useState('');

  const [drawerMode, setDrawerMode] = useState(null);
  const [replaceSlot, setReplaceSlot] = useState(null);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  useEffect(() => {
    const rotation = window.setInterval(() => {
      setActiveHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(rotation);
  }, []);

  useEffect(() => {
    heroSlides.forEach((slide) => {
      const image = new Image();
      image.src = slide.image;
    });
  }, []);

  const activeHero = heroSlides[activeHeroIndex];

  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      const brandMatch =
        selectedBrand === 'all' || model.brand === selectedBrand;

      const query = searchQuery.trim().toLowerCase();

      const queryMatch =
        !query ||
        `${model.brandName} ${model.model} ${model.type}`
          .toLowerCase()
          .includes(query);

      return brandMatch && queryMatch;
    });
  }, [selectedBrand, searchQuery]);

  const selectedModels = compareIds
    .map((id) => models.find((model) => model.id === id))
    .filter(Boolean);

  const openComparison = () => {
    setReplaceSlot(null);
    setCompareNotice('');
    setDrawerMode('compare');
  };

  const openCatalog = (slot = null) => {
    setReplaceSlot(slot);
    setCompareNotice('');
    setDrawerMode('catalog');
  };

  const closeDrawer = () => {
    setDrawerMode(null);
    setReplaceSlot(null);
  };

  const selectCatalogModel = (model) => {
    if (replaceSlot !== null) {
      const existingIndex = compareIds.indexOf(model.id);

      if (existingIndex !== -1 && existingIndex !== replaceSlot) {
        setCompareNotice('This excavator is already in another comparison slot.');
        return;
      }

      setCompareIds((current) => {
        const updated = [...current];
        updated[replaceSlot] = model.id;
        return updated.filter(Boolean);
      });

      setReplaceSlot(null);
      setCompareNotice('');
      setDrawerMode('compare');
      return;
    }

    if (compareIds.includes(model.id)) {
      setCompareNotice('This excavator has already been added.');
      return;
    }

    if (compareIds.length >= 3) {
      setCompareNotice('Maximum three excavators can be compared. Replace an existing model.');
      return;
    }

    setCompareIds((current) => [...current, model.id]);
    setCompareNotice('');
    setDrawerMode('compare');
  };

  const removeCompareModel = (model) => {
    setCompareIds((current) => current.filter((id) => id !== model.id));
    setCompareNotice('');
  };

  const handleCardCompare = (model) => {
    if (compareIds.includes(model.id)) {
      openComparison();
      return;
    }

    if (compareIds.length >= 3) {
      setCompareNotice('The comparison is limited to three models. Remove or replace one.');

      openComparison();
      return;
    }

    setCompareIds((current) => [...current, model.id]);
    setCompareNotice('');
    setReplaceSlot(null);
    setDrawerMode('compare');
  };

  const openQuote = () => setModal({ type: 'quote' });

  const showModels = () => {
    document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-shell home-shell">
      <Header
        active="home"
        onQuote={openQuote}
        onSearch={setSearchQuery}
      />

      <main>
        {/* HERO */}
        <section className="hero-section" id="home">
          <div className="hero-image-track" aria-hidden="true">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.image}
                className={`hero-bg ${
                  index === activeHeroIndex ? 'hero-bg-active' : ''
                }`}
                style={{ backgroundImage: `url("${slide.image}")` }}
              />
            ))}
          </div>

          <div className="container hero-content">
            <div className="hero-copy">
              <SectionEyebrow>The all-brand excavator destination</SectionEyebrow>

              <h1>
                EXCAVATORS
                <br />
                <em>FOR EVERY PROJECT</em>
              </h1>

              <p>
                Browse manufacturer and model examples, then ask for verified
                specifications, configuration and availability details for your project.
              </p>

              <div className="hero-actions">
                <button
                  className="btn btn-primary btn-large"
                  onClick={showModels}
                >
                  Explore Excavators <ArrowRight size={17} />
                </button>

                <button
                  className="btn btn-outline btn-large"
                  onClick={openQuote}
                >
                  <FileText size={16} /> Get a Quote
                </button>
              </div>
            </div>

            <div className="hero-machine-caption" aria-live="polite">
              <span>FEATURED MACHINE · {activeHero.brand.toUpperCase()}</span>
              <strong>{activeHero.model}</strong>
              <small>
                {activeHero.type} · Confirm configuration and availability
              </small>
            </div>
          </div>
        </section>

        <BrandStrip />

        {/* CATEGORIES */}
        <section className="category-section section-dark" id="categories">
          <div className="container category-grid">
            {categories.map((category) => (
              <a
                className="category-card"
                key={category.id}
                href={
                  category.id === 'special'
                    ? '/solutions?industry=Demolition'
                    : `/excavators?size=${category.id}`
                }
              >
                <img src={category.image} alt="" loading="lazy" />
                <span className="category-shade" />

                <span className="category-copy">
                  <strong>{category.title}</strong>
                  <small>{category.range}</small>
                </span>

                <span className="category-arrow">
                  <ArrowRight size={16} />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* MODELS */}
        <section className="models-section section-dark" id="models">
          <div className="container">
            <SectionTitle
              eyebrow="Featured models"
              title="Our Most"
              accent="Popular Excavators"
              description="Explore a multi-brand lineup selected for construction, quarrying and heavy-duty earthmoving."
              action={
                <div className="model-count">
                  <span>{filteredModels.length.toString().padStart(2, '0')}</span>
                  MODELS SHOWN
                </div>
              }
            />

            <div className="model-toolbar">
              <div className="filter-label">
                <SlidersHorizontal size={15} /> Filter by brand
              </div>

              <div
                className="brand-filters"
                role="group"
                aria-label="Filter excavators by brand"
              >
                <button
                  className={selectedBrand === 'all' ? 'selected' : ''}
                  onClick={() => setSelectedBrand('all')}
                >
                  All Models
                </button>

                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    className={selectedBrand === brand.id ? 'selected' : ''}
                    onClick={() => setSelectedBrand(brand.id)}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>

              <label className="model-search">
                <Search size={14} />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Find a model"
                />
              </label>
            </div>

            {filteredModels.length ? (
              <div className="home-brand-rows">
                {brands.map((brand) => {
                  const brandModels = filteredModels.filter(
                    (model) => model.brand === brand.id
                  );

                  if (!brandModels.length) return null;

                  return (
                    <HomeBrandModelRail
                      key={brand.id}
                      brand={brand}
                      brandModels={brandModels}
                      compareIds={compareIds}
                      onCompare={handleCardCompare}
                      onDetails={(item) =>
                        setModal({ type: 'model', model: item })
                      }
                    />
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                No models match that search.

                <button
                  onClick={() => {
                    setSelectedBrand('all');
                    setSearchQuery('');
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}

            <p className="spec-disclaimer">
              * Model specifications are illustrative examples for this design
              prototype and must be verified against current manufacturer data
              before publication.
            </p>
          </div>
        </section>

        {/* COMPARISON BANNER */}
        <section className="compare-banner">
          <div className="compare-art">
            <img
              src="/images/compare-machines.webp"
              alt="Two excavators ready for a model comparison"
              loading="lazy"
            />
          </div>

          <div className="compare-copy">
            <SectionEyebrow>Make an informed choice</SectionEyebrow>

            <h2>
              Compare Excavators.
              <br />
              <em>Choose with Confidence.</em>
            </h2>

            <p>
              Compare operating weight, engine power, bucket capacity and key
              features across leading brands.
            </p>

            <button className="btn btn-primary" onClick={openComparison}>
              Compare Models <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* COMPARISON BUILDER */}
        <section
          className="home-comparison-builder"
          id="home-comparison"
          aria-labelledby="home-comparison-title"
        >
          <div className="home-comparison-heading">
            <div className="home-comparison-icon">
              <Scale size={25} />
            </div>

            <div>
              <span>SIDE-BY-SIDE REVIEW</span>
              <h2 id="home-comparison-title">
                Compare <em>Excavators</em>
              </h2>
              <p>Select up to three model examples from the excavator catalog.</p>
            </div>

            {compareNotice && (
              <span className="home-comparison-notice">{compareNotice}</span>
            )}

            {selectedModels.length > 0 && (
              <button
                className="home-comparison-clear"
                onClick={() => {
                  setCompareIds([]);
                  setCompareNotice('');
                }}
              >
                Clear selection <X size={14} />
              </button>
            )}
          </div>

          {selectedModels.length ? (
            <div className="ic-builder-selected">
              <div className="ic-builder-models">
                {selectedModels.map((model) => (
                  <div className="ic-builder-model" key={model.id}>
                    <img src={model.image} alt={`${model.brandName} ${model.model}`} />

                    <div>
                      <span>{model.brandName}</span>
                      <strong>{model.model}</strong>
                      <small>{model.type}</small>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeCompareModel(model)}
                      aria-label={`Remove ${model.model}`}
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}

                {selectedModels.length < 3 && (
                  <button
                    className="ic-builder-add"
                    type="button"
                    onClick={() => openCatalog()}
                  >
                    <span>+</span>
                    Add another model
                  </button>
                )}
              </div>

              <button
                type="button"
                className="ic-builder-open"
                onClick={openComparison}
              >
                Open Comparison Panel <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <div className="home-comparison-empty">
              {[0, 1, 2].map((slot) => (
                <button
                  className="home-comparison-slot"
                  type="button"
                  key={slot}
                  onClick={() => openCatalog()}
                >
                  <span>0{slot + 1}</span>
                  <b>+</b>
                  <small>Add a model</small>
                </button>
              ))}

              <div className="home-comparison-empty-copy">
                <strong>Your comparison starts here</strong>

                <span>
                  Choose two or three models to review their listed specifications
                  together.
                </span>

                <button type="button" onClick={() => openCatalog()}>
                  Browse model examples <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          <p className="home-comparison-disclaimer">
            Comparison values are illustrative dataset entries, not verified
            current manufacturer specifications. Always request official technical
            data before comparing or ordering machines.
          </p>
        </section>

        {/* SOLUTIONS */}
        <section className="solutions-section" id="solutions">
          <div className="container solutions-layout">
            <div className="solutions-intro">
              <SectionEyebrow>Industry solutions</SectionEyebrow>

              <h2>
                Built for <em>Every Industry</em>
              </h2>

              <p>
                Explore application profiles and equipment planning topics across
                a range of project types.
              </p>

              <a href="/solutions" className="btn btn-primary">
                Explore Solutions <ArrowRight size={16} />
              </a>
            </div>

            <div className="industry-grid">
              {industries.map((industry) => (
                <a
                  href={`/solutions?industry=${encodeURIComponent(industry.title)}`}
                  className="industry-card"
                  key={industry.title}
                >
                  <img src={industry.image} alt="" loading="lazy" />
                  <span className="industry-shade" />
                  <span className="industry-name">{industry.title}</span>
                  <ArrowUpRight className="industry-arrow" size={17} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* WHY IRON CREST */}
        <section className="why-section section-dark" id="why-us">
          <div className="container why-layout">
            <div className="why-image">
              <img
                src="/images/parts-service.webp"
                alt="Heavy equipment component detail"
                loading="lazy"
              />
            </div>

            <div className="why-content">
              <SectionEyebrow>The Iron Crest advantage</SectionEyebrow>

              <h2>
                Why Choose <em>Iron Crest?</em>
              </h2>

              <p>
                One trusted point of contact for multi-brand excavator selection,
                support and ownership guidance.
              </p>

              <div className="why-features">
                <div><BadgeCheck /><strong>Multi-brand<br />Directory</strong></div>
                <div><Package /><strong>Parts<br />Enquiries</strong></div>
                <div><Headphones /><strong>Technical Support<br />Enquiries</strong></div>
                <div><CircleDollarSign /><strong>Request<br />Pricing</strong></div>
                <div><MapPinned /><strong>Confirm Local<br />Support</strong></div>
                <div><Users /><strong>Project<br />Consultation</strong></div>
              </div>

              <a href="/contact-us#about" className="why-about-link">
                About the Iron Crest approach <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* RESOURCES */}
        <section className="resource-section section-dark" id="resources">
          <div className="container resource-grid">
            <div className="resource-card catalog-card">
              <div className="resource-visual catalog-visual">
                <div className="catalog-sheet">
                  <span>IRON CREST</span>
                  <strong>EXCAVATOR<br />RANGE</strong>
                  <small>PRODUCT GUIDE</small>
                </div>

                <div className="catalog-sheet catalog-sheet-back">
                  <span>IRON CREST</span>
                  <strong>MODEL<br />OVERVIEW</strong>
                </div>
              </div>

              <div className="resource-copy">
                <SectionEyebrow>Product information</SectionEyebrow>

                <h3>
                  Download Our
                  <br />
                  <em>Product Catalog</em>
                </h3>

                <p>
                  Get model information, machine categories and selection guidance
                  in one place.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() => setModal({ type: 'catalog' })}
                >
                  Request Catalog <Download size={15} />
                </button>
              </div>
            </div>

            <div className="resource-card support-card" id="support">
              <div className="support-icon">
                <Wrench size={35} />
                <Settings2 size={26} />
              </div>

              <div className="resource-copy">
                <SectionEyebrow>Parts & service</SectionEyebrow>

                <h3>
                  Keep Your Fleet
                  <br />
                  <em>Working Strong.</em>
                </h3>

                <p>
                  Ask about parts support, maintenance planning, technical guidance
                  and service availability.
                </p>

                <button className="btn btn-outline" onClick={openQuote}>
                  Talk to Service Team <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PROOF AND NEWS */}
        <section className="proof-news-section section-dark">
          <div className="container proof-news-grid">
            <div className="testimonial-panel">
              <SectionEyebrow>Before you shortlist</SectionEyebrow>

              <h2>
                Start with the <em>application.</em>
              </h2>

              <div className="testimonial-content">
                <BadgeCheck size={27} />
                <p>
                  Consider the site, material, access, duty cycle and attachments
                  before comparing machine examples.
                </p>
              </div>

              <div className="testimonial-author">
                <div className="avatar">IC</div>
                <div>
                  <strong>Equipment selection</strong>
                  <small>
                    Application · Configuration · Availability confirmation
                  </small>
                </div>
              </div>
            </div>

            <div className="news-panel">
              <div className="news-heading">
                <div>
                  <SectionEyebrow>Practical resources</SectionEyebrow>
                  <h2>
                    Guides &amp; <em>Next steps</em>
                  </h2>
                </div>

                <a href="/contact-us#resources">
                  View resources <ArrowRight size={14} />
                </a>
              </div>

              <div className="news-list">
                <article className="news-item">
                  <img
                    src="/images/category-large.webp"
                    alt="Large excavator category example"
                    loading="lazy"
                  />

                  <div>
                    <span>SELECTION GUIDE</span>
                    <h3>Choosing an Excavator Class for Your Project</h3>
                    <a href="/contact-us#resources">
                      Explore resources <ArrowUpRight size={13} />
                    </a>
                  </div>
                </article>

                <article className="news-item">
                  <img
                    src="/images/parts-service.webp"
                    alt="Excavator parts and service detail"
                    loading="lazy"
                  />

                  <div>
                    <span>PARTS &amp; SERVICE</span>
                    <h3>Prepare for a Parts or Service Enquiry</h3>
                    <a href="/parts-service">
                      See support pathways <ArrowUpRight size={13} />
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE NETWORK */}
        <section className="service-network section-dark">
          <div className="container service-network-inner">
            <div className="service-copy">
              <SectionEyebrow>Support that moves with you</SectionEyebrow>

              <h2>
                Our Service <em>Network</em>
              </h2>

              <p>
                Connect with the Iron Crest team for equipment guidance, parts
                enquiries and after-sales support.
              </p>

              <button className="btn btn-primary" onClick={openQuote}>
                Find Support <ArrowRight size={15} />
              </button>
            </div>

            <div className="service-map">
              <div className="map-dots" />
              <span><MapPin /> Contact Iron Crest</span>
            </div>

            <div className="stat-grid">
              <div><Factory /><strong>Brand directory</strong><small>Explore manufacturer listings</small></div>
              <div><Truck /><strong>Model examples</strong><small>Confirm current configurations</small></div>
              <div><Wrench /><strong>Parts &amp; service</strong><small>Review support pathways</small></div>
              <div><Users /><strong>Project enquiries</strong><small>Share your requirements</small></div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="newsletter-section">
          <div className="container newsletter-inner">
            <div className="newsletter-icon">
              <Mail size={23} />
            </div>

            <div className="newsletter-copy">
              <h3>Stay Updated with Iron Crest</h3>
              <p>
                Get new model updates, special offers and industry insights in
                your inbox.
              </p>
            </div>

            <form
              className="newsletter-form"
              onSubmit={(event) => {
                event.preventDefault();

                setNewsletterStatus(
                  'Your address has not been subscribed because this website is not connected to a mailing-list service.'
                );
              }}
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address"
              />

              <button type="submit">
                Subscribe <ArrowRight size={15} />
              </button>
            </form>
          </div>

          {newsletterStatus && (
            <div className="container newsletter-status" role="alert">
              <AlertCircle size={14} />
              {newsletterStatus}
              {' '}Contact{' '}
              <a href="mailto:sales@ironcrest.com">sales@ironcrest.com</a>
              {' '}for enquiries.
            </div>
          )}
        </section>
      </main>

      <Footer onQuote={openQuote} />

      <QuoteModal
        modal={modal}
        onClose={() => setModal(null)}
      />

      <ExcavatorDrawer
        mode={drawerMode}
        onClose={closeDrawer}
        selectedModels={selectedModels}
        onSelectModel={selectCatalogModel}
        onRemoveModel={removeCompareModel}
        onOpenCatalog={openCatalog}
        onOpenComparison={openComparison}
        replaceSlot={replaceSlot}
        notice={compareNotice}
      />
    </div>
  );
}