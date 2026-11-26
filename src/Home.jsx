
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle, ArrowRight, ArrowUpRight, BadgeCheck, Check,
  CircleDollarSign, Download,
  Factory, FileText, Headphones, MapPin,
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

import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import BrandLogoRail from './BrandLogoRail.jsx';
import { brandUrl, modelUrl } from './catalogLinks.js';
import HomeBrandShowcases from './HomeBrandShowcase.jsx';
import QuarryPanorama from './QuarryPanorama.jsx';
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
  onFinishComparison,
  replaceSlot,
  notice,
}) {
  const [drawerSearch, setDrawerSearch] = useState('');
  const [drawerBrand, setDrawerBrand] = useState('all');
  const [reviewedSelection, setReviewedSelection] = useState(null);
  const specifications = useRef(null);
  const selectionKey = selectedModels.map(({ id }) => id).join(',');

  useEffect(() => {
    setDrawerSearch('');
    setDrawerBrand('all');
    setReviewedSelection(null);
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

  function handleDone() {
    if (!specifications.current || reviewedSelection === selectionKey) {
      onFinishComparison();
      return;
    }

    setReviewedSelection(selectionKey);
    specifications.current.focus({ preventScroll: true });
    specifications.current.scrollIntoView({ block: 'start' });
  }

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
                      <article className="ic-catalog-card model-click-surface" key={model.id}>
                        <div className="ic-catalog-card-image">
                          <img
                            src={model.image}
                            alt="Illustrative excavator"
                            loading="lazy"
                          />

                          <span>{model.brandName}</span>
                        </div>

                        <div className="ic-catalog-card-body">
                          <h3><a className="model-click-target" href={modelUrl(model)} aria-label={`View ${model.brandName} ${model.model} details`}>{model.model}</a></h3>
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
                onClick={() => onOpenCatalog()}
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
                            <img src={model.image} alt="Illustrative excavator" />
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
                          onClick={() => onOpenCatalog()}
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
                    <h3 ref={specifications} tabIndex={-1}>Model Specifications</h3>
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

                  <button type="button" onClick={() => onOpenCatalog()}>
                    Browse Excavator Catalog <ArrowRight size={15} />
                  </button>
                </div>
              )}

            </div>

            <div className="ic-drawer-footer">
              <button
                type="button"
                className="ic-drawer-secondary"
                onClick={() => onOpenCatalog()}
                disabled={selectedModels.length >= 3}
              >
                <span>+</span> Add another model
              </button>

              <button
                type="button"
                className="ic-drawer-primary"
                onClick={handleDone}
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

  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const [paused, setPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    if (paused) return;
    const rotation = window.setInterval(() => {
      setActiveHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(rotation);
  }, [paused]);

  const activeHero = heroSlides[activeHeroIndex];
  const selectHero = (index) => {
    setPaused(true);
    setActiveHeroIndex(index);
  };

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

  const finishComparison = () => {
    setCompareIds([]);
    setCompareNotice('');
    closeDrawer();
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
        onSearch={(query) => { setSelectedBrand("all"); setSearchQuery(query); }}
      />

      <main>
        {/* HERO */}
        <section className="hero-section" id="home" aria-label="Excavator manufacturers">
          <div className="hero-image-track" aria-hidden="true">
            <div className="hero-bg hero-bg-active">
              <picture>
                <source media="(max-width: 760px)" srcSet={activeHero.mobileImage} />
                <img src={activeHero.image} alt="" fetchPriority="high" />
              </picture>
            </div>
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

            <div className="hero-machine-caption">
              <div className="hero-brand-details" aria-live={paused ? 'polite' : 'off'}>
                <a className="hero-brand-link" href={brandUrl(activeHero)}>{activeHero.name} <ArrowRight size={16} /></a>
              </div>
              <div className="hero-slide-controls">
                <div className="hero-slide-list" role="group" aria-label="Choose a manufacturer">
                  {heroSlides.map((slide, index) => (
                    <button
                      type="button"
                      key={slide.id}
                      aria-label={`View ${slide.name} slide`}
                      title={slide.name}
                      aria-pressed={index === activeHeroIndex}
                      onClick={() => selectHero(index)}
                    ><span /></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <BrandStrip />
        <QuarryPanorama />
        {/* CATEGORIES */}
        <section className="category-section section-dark" id="categories" aria-labelledby="equipment-classes-title">
          <div className="container"><h2 className="equipment-classes-title" id="equipment-classes-title">Find the right machine class</h2></div>
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
          <p className="container image-disclosure"></p>
          <div className="container">
            <SectionTitle
              eyebrow="Featured models"
              title="Our Most"
              accent="Popular Excavators"
              action={
                <div className="model-count">
                  <span>{filteredModels.length.toString().padStart(2, '0')}</span>
                  MATCHING MODELS
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
              <HomeBrandShowcases
                brands={brands}
                models={filteredModels}
                showAll={selectedBrand !== 'all' || Boolean(searchQuery.trim())}
                compareIds={compareIds}
                onCompare={handleCardCompare}
              />
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

          </div>
        </section>

        {/* COMPARISON BANNER */}
        <section className="compare-banner">
          <div className="compare-art">
            <img
              src="/images/compare-machines.webp"
              alt="A lineup of excavators in different sizes"
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
                    <img src={model.image} alt="Illustrative excavator" />

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

                <button type="button" className="btn btn-primary" onClick={openQuote}>
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

        <section className="newsletter-section">
          <div className="container newsletter-inner">
            <div className="newsletter-icon"><FileText aria-hidden="true" /></div>
            <div className="newsletter-copy"><h3>Equipment guides</h3><p>Plan machine selection, maintenance and your next equipment enquiry.</p></div>
            <a className="btn btn-primary" href="/resources">Browse guides <ArrowRight size={16} /></a>
          </div>
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
        onFinishComparison={finishComparison}
        replaceSlot={replaceSlot}
        notice={compareNotice}
      />
    </div>
  );
}
