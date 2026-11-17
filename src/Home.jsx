import { useMemo, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, BadgeCheck, CheckCircle2, ChevronDown,
  CircleDollarSign, Download, Factory, FileText, Gauge, Globe2, Headphones,
  Mail, MapPin, MapPinned, Menu, Package, Phone, Quote, Search, Settings2,
  ShieldCheck, SlidersHorizontal, Star, Truck, UserRound, Users, Wrench, X,
} from 'lucide-react';
import { brands, categories, industries, models } from './data.js';

function IronCrestLogo({ compact = false }) {
  return (
    <a className={`logo-lockup ${compact ? 'logo-compact' : ''}`} href="/" aria-label="Iron Crest home">
      <svg className="logo-emblem" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 3 40 8 49 7 53 16 61 23 57 32 61 41 53 48 49 57 40 56 32 61 24 56 15 57 11 48 3 41 7 32 3 23 11 16 15 7 24 8Z" fill="currentColor" />
        <path d="m12 39 11-14 7 8 8-12 14 18Z" fill="#0c1218" />
        <path d="M13 44h38" stroke="#0c1218" strokeWidth="3" strokeLinecap="round" />
        <path d="M19 18 32 10l13 8" fill="none" stroke="#0c1218" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="logo-type">
        <strong>IRON <b>CREST</b></strong>
        <small>EXCAVATOR SOLUTIONS</small>
      </span>
    </a>
  );
}

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

function QuoteModal({ modal, onClose }) {
  const [sent, setSent] = useState(false);
  if (!modal) return null;
  const isModel = modal.type === 'model';
  const isCatalog = modal.type === 'catalog';
  const heading = isModel ? `${modal.model.brandName} ${modal.model.model}` : isCatalog ? 'Request the Iron Crest catalog' : 'Talk to an excavator specialist';
  const subheading = isModel
    ? 'Ask our team for current availability, configuration options and a verified specification sheet.'
    : isCatalog
      ? 'Tell us where to send the latest excavator range and product information.'
      : 'Share a few details and our equipment team will help you shortlist the right machine.';

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close dialog"><X size={20} /></button>
        {!sent ? (
          <>
            <div className="modal-kicker"><span className="mini-mark">IC</span> IRON CREST ENQUIRY</div>
            <h2 id="modal-title">{heading}</h2>
            <p className="modal-intro">{subheading}</p>
            <form className="quote-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
              <label>Full name<input required name="name" placeholder="Your name" /></label>
              <div className="form-row">
                <label>Email address<input required type="email" name="email" placeholder="you@company.com" /></label>
                <label>Phone number<input required name="phone" placeholder="+92 ..." /></label>
              </div>
              <label>What are you looking for?
                <select defaultValue={isModel ? modal.model.id : ''} name="interest" required>
                  <option value="" disabled>Select an excavator or service</option>
                  {models.map((model) => <option key={model.id} value={model.id}>{model.brandName} {model.model}</option>)}
                  <option value="parts">Parts & service</option>
                  <option value="consultation">Equipment consultation</option>
                </select>
              </label>
              <label>Project details<textarea name="message" rows="3" placeholder="Tell us about your project, location and expected timeline." /></label>
              <button className="btn btn-primary btn-wide" type="submit">Send enquiry <ArrowRight size={17} /></button>
              <small className="form-note">Demo form only — connect your CRM or email service before publishing.</small>
            </form>
          </>
        ) : (
          <div className="success-state">
            <CheckCircle2 size={48} />
            <h2>Thanks for contacting Iron Crest.</h2>
            <p>This is a front-end demo confirmation. Connect a form backend to receive and store real submissions.</p>
            <button className="btn btn-primary" onClick={onClose}>Back to homepage <ArrowRight size={16} /></button>
          </div>
        )}
      </div>
    </div>
  );
}

function Header({ onQuote, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navItems = [
    ['Brands', '/brands'], ['Excavators', '#models'], ['Parts & Service', '#support'],
    ['Solutions', '#solutions'], ['Resources', '#resources'], ['About Us', '#why-us'], ['Contact', '#contact'],
  ];
  return (
    <>
      <div className="utility-bar">
        <div className="container utility-inner">
          <div className="utility-left">
            <a href="tel:+923001234567"><Phone size={12} /> +92 300 1234567</a>
            <a href="mailto:sales@ironcrest.com"><Mail size={12} /> sales@ironcrest.com</a>
            <span><MapPin size={12} /> Lahore, Pakistan</span>
          </div>
          <div className="utility-right"><a href="#contact">Dealer</a><a href="#support">Support</a><a href="#contact">Track Order</a></div>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav-inner">
          <IronCrestLogo />
          <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
          <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            <a className="nav-home active" href="/" onClick={() => setMenuOpen(false)}>Home</a>
            {navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}{['Brands', 'Excavators', 'Parts & Service', 'Solutions', 'Resources'].includes(label) && <ChevronDown size={12} />}</a>)}
          </nav>
          <div className="nav-actions">
            <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search size={19} /></button>
            <button className="icon-button account-button" aria-label="Account" onClick={() => onQuote()}><UserRound size={18} /></button>
            <button className="btn btn-primary nav-quote" onClick={() => onQuote()}>Get a Quote</button>
          </div>
        </div>
        {searchOpen && (
          <div className="search-drawer">
            <div className="container search-inner">
              <Search size={18} />
              <input autoFocus value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search brands, excavator models or services…" />
              <button onClick={() => { onSearch(searchText); setSearchOpen(false); document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn btn-primary">Search models <ArrowRight size={15} /></button>
              <button className="search-close" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={18} /></button>
            </div>
            {searchText && <div className="container search-hint">Search term: <strong>{searchText}</strong> — browse matching models in the excavator lineup below.</div>}
          </div>
        )}
      </header>
    </>
  );
}

function BrandStrip() {
  return (
    <section className="brand-strip" id="brands" aria-label="Available excavator brands">
      <div className="container brand-strip-inner">
        {brands.map((brand) => (
          <a href="#models" className={`brand-wordmark ${brand.className}`} key={brand.id} title={`${brand.name} excavators`}>
            <strong>{brand.name}</strong>
            {brand.id === 'hyundai' && <small>CONSTRUCTION EQUIPMENT</small>}
          </a>
        ))}
      </div>
    </section>
  );
}

function ModelCard({ model, onDetails }) {
  return (
    <article className="model-card">
      <div className="model-image-wrap"><img src={model.image} alt={`${model.brandName} ${model.model} excavator`} loading="lazy" /></div>
      <div className="model-card-body">
        <div className="model-brand-label">{model.brandName}</div>
        <h3>{model.model}</h3>
        <p className="model-type">{model.type}</p>
        <div className="spec-list">
          <span><Gauge size={14} /> Engine power <b>{model.power}</b></span>
          <span><Truck size={14} /> Operating weight <b>{model.weight}</b></span>
          <span><Package size={14} /> Bucket capacity <b>{model.bucket}</b></span>
        </div>
        <button className="model-link" onClick={() => onDetails(model)}>View Details <ArrowRight size={15} /></button>
      </div>
    </article>
  );
}

function Footer({ onQuote }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-main">
        <div className="footer-brand-col">
          <IronCrestLogo />
          <p>Your multi-brand destination for excavators, genuine parts and dependable equipment support.</p>
          <div className="social-links"><a href="#contact" aria-label="Facebook">f</a><a href="#contact" aria-label="YouTube">▶</a><a href="#contact" aria-label="Instagram">◎</a><a href="#contact" aria-label="LinkedIn">in</a></div>
        </div>
        <div className="footer-column"><h4>Quick Links</h4><a href="#home">Home</a><a href="/brands">Brands</a><a href="#models">Excavators</a><a href="#support">Parts & Service</a><a href="#solutions">Solutions</a><a href="#why-us">About Us</a></div>
        <div className="footer-column"><h4>Our Brands</h4>{brands.map((brand) => <a key={brand.id} href="/brands">{brand.name}</a>)}</div>
        <div className="footer-column"><h4>Support</h4><a href="#models">Compare Models</a><a href="#resources">Product Catalog</a><a href="#support">Service Centers</a><a href="#support">FAQs</a><a href="#support">Warranty</a></div>
        <div className="footer-column footer-contact"><h4>Contact Us</h4><a href="tel:+923001234567"><Phone size={14} /> +92 300 1234567</a><a href="mailto:sales@ironcrest.com"><Mail size={14} /> sales@ironcrest.com</a><span><MapPin size={14} /> Lahore, Pakistan</span><button className="btn btn-primary footer-quote" onClick={onQuote}>Talk to our team <ArrowRight size={15} /></button></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Iron Crest Excavator Solutions. All rights reserved.</span><div><a href="#contact">Privacy Policy</a><a href="#contact">Terms & Conditions</a><a href="#home">Back to top ↑</a></div></div>
    </footer>
  );
}

export default function HomePage() {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modal, setModal] = useState(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const filteredModels = useMemo(() => models.filter((model) => {
    const brandMatch = selectedBrand === 'all' || model.brand === selectedBrand;
    const query = searchQuery.trim().toLowerCase();
    const queryMatch = !query || `${model.brandName} ${model.model} ${model.type}`.toLowerCase().includes(query);
    return brandMatch && queryMatch;
  }), [selectedBrand, searchQuery]);

  const openQuote = () => setModal({ type: 'quote' });
  const showModels = () => document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="app-shell">
      <Header onQuote={openQuote} onSearch={setSearchQuery} />

      <main>
        <section className="hero-section" id="home">
          <div className="hero-bg" />
          <div className="container hero-content">
            <div className="hero-copy">
              <SectionEyebrow>The all-brand excavator destination</SectionEyebrow>
              <h1>EXCAVATORS<br /><em>FOR EVERY PROJECT</em></h1>
              <p>Premium excavators from the world’s leading brands. Compare models, get expert advice, and find the right machine for your business.</p>
              <div className="hero-actions"><button className="btn btn-primary btn-large" onClick={showModels}>Explore Excavators <ArrowRight size={17} /></button><button className="btn btn-outline btn-large" onClick={openQuote}><FileText size={16} /> Get a Quote</button></div>
            </div>
            <div className="hero-machine-caption"><span>FEATURED MACHINE</span><strong>HYUNDAI HX380LC</strong><small>Heavy-duty performance for demanding sites</small></div>
          </div>
          <div className="container hero-benefits">
            <div><Users /><span>Multiple<br />Brands</span></div><div><Wrench /><span>Genuine<br />Parts & Service</span></div><div><Headphones /><span>Expert<br />Consultation</span></div><div><ShieldCheck /><span>Reliable<br />Availability</span></div><div><Globe2 /><span>Nationwide<br />Support</span></div><div><CircleDollarSign /><span>Best Value &<br />Financing</span></div>
          </div>
        </section>

        <BrandStrip />

        <section className="category-section section-dark" id="categories">
          <div className="container category-grid">
            {categories.map((category, index) => (
              <button className="category-card" key={category.id} onClick={showModels}>
                <img src={category.image} alt="" loading="lazy" />
                <span className="category-shade" />
                <span className="category-copy"><strong>{category.title}</strong><small>{category.range}</small></span>
                <span className="category-arrow"><ArrowRight size={16} /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="models-section section-dark" id="models">
          <div className="container">
            <SectionTitle eyebrow="Featured models" title="Our Most" accent="Popular Excavators" description="Explore a multi-brand lineup selected for construction, quarrying and heavy-duty earthmoving." action={<div className="model-count"><span>{filteredModels.length.toString().padStart(2, '0')}</span> MODELS SHOWN</div>} />
            <div className="model-toolbar">
              <div className="filter-label"><SlidersHorizontal size={15} /> Filter by brand</div>
              <div className="brand-filters" role="group" aria-label="Filter excavators by brand">
                <button className={selectedBrand === 'all' ? 'selected' : ''} onClick={() => setSelectedBrand('all')}>All Models</button>
                {brands.map((brand) => <button key={brand.id} className={selectedBrand === brand.id ? 'selected' : ''} onClick={() => setSelectedBrand(brand.id)}>{brand.name}</button>)}
              </div>
              <label className="model-search"><Search size={14} /><input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Find a model" /></label>
            </div>
            {filteredModels.length ? <div className="models-grid">{filteredModels.map((model) => <ModelCard key={model.id} model={model} onDetails={(item) => setModal({ type: 'model', model: item })} />)}</div> : <div className="empty-state">No models match that search. <button onClick={() => { setSelectedBrand('all'); setSearchQuery(''); }}>Clear filters</button></div>}
            <p className="spec-disclaimer">* Model specifications are illustrative examples for this design prototype and must be verified against current manufacturer data before publication.</p>
          </div>
        </section>

        <section className="compare-banner">
          <div className="compare-art"><img src="/images/compare-machines.webp" alt="Two excavators ready for a model comparison" loading="lazy" /></div>
          <div className="compare-copy"><SectionEyebrow>Make an informed choice</SectionEyebrow><h2>Compare Excavators.<br /><em>Choose with Confidence.</em></h2><p>Compare operating weight, engine power, bucket capacity and key features across leading brands.</p><button className="btn btn-primary" onClick={() => setCompareOpen(!compareOpen)}>{compareOpen ? 'Hide Comparison' : 'Compare Models'} <ArrowRight size={16} /></button></div>
        </section>
        {compareOpen && (
          <section className="comparison-table-section section-dark">
            <div className="container">
              <SectionTitle eyebrow="Model comparison" title="At-a-Glance" accent="Specifications" description="A quick sample comparison of selected mid-size machines." />
              <div className="table-wrap"><table><thead><tr><th>Model</th><th>Power</th><th>Operating weight</th><th>Bucket capacity</th></tr></thead><tbody>{models.slice(0, 5).map((model) => <tr key={model.id}><td><strong>{model.brandName} {model.model}</strong></td><td>{model.power}</td><td>{model.weight}</td><td>{model.bucket}</td></tr>)}</tbody></table></div>
              <p className="spec-disclaimer">Illustrative values only. Confirm exact configurations and specifications with the relevant manufacturer.</p>
            </div>
          </section>
        )}

        <section className="solutions-section" id="solutions">
          <div className="container solutions-layout">
            <div className="solutions-intro"><SectionEyebrow>Industry solutions</SectionEyebrow><h2>Built for <em>Every Industry</em></h2><p>Powering projects across construction, mining, infrastructure and more.</p><a href="#support" className="btn btn-primary">Explore Solutions <ArrowRight size={16} /></a></div>
            <div className="industry-grid">{industries.map((industry, index) => <a href="#support" className="industry-card" key={industry.title}><img src={industry.image} alt="" loading="lazy" /><span className="industry-shade" /><span className="industry-name">{industry.title}</span><ArrowUpRight className="industry-arrow" size={17} /></a>)}</div>
          </div>
        </section>

        <section className="why-section section-dark" id="why-us">
          <div className="container why-layout">
            <div className="why-image"><img src="/images/parts-service.webp" alt="Heavy equipment component detail" loading="lazy" /></div>
            <div className="why-content"><SectionEyebrow>The Iron Crest advantage</SectionEyebrow><h2>Why Choose <em>Iron Crest?</em></h2><p>One trusted point of contact for multi-brand excavator selection, support and ownership guidance.</p>
              <div className="why-features">
                <div><BadgeCheck /><strong>Multi-brand<br />Selection</strong></div><div><Package /><strong>Genuine<br />Spare Parts</strong></div><div><Headphones /><strong>Expert Technical<br />Support</strong></div><div><CircleDollarSign /><strong>Flexible Finance<br />Options</strong></div><div><MapPinned /><strong>Nationwide Service<br />Network</strong></div><div><Users /><strong>After-sales Care<br />& Training</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section className="resource-section section-dark" id="resources">
          <div className="container resource-grid">
            <div className="resource-card catalog-card">
              <div className="resource-visual catalog-visual"><div className="catalog-sheet"><span>IRON CREST</span><strong>EXCAVATOR<br />RANGE</strong><small>PRODUCT GUIDE</small></div><div className="catalog-sheet catalog-sheet-back"><span>IRON CREST</span><strong>MODEL<br />OVERVIEW</strong></div></div>
              <div className="resource-copy"><SectionEyebrow>Product information</SectionEyebrow><h3>Download Our<br /><em>Product Catalog</em></h3><p>Get model information, machine categories and selection guidance in one place.</p><button className="btn btn-primary" onClick={() => setModal({ type: 'catalog' })}>Request Catalog <Download size={15} /></button></div>
            </div>
            <div className="resource-card support-card" id="support">
              <div className="support-icon"><Wrench size={35} /><Settings2 size={26} /></div>
              <div className="resource-copy"><SectionEyebrow>Parts & service</SectionEyebrow><h3>Keep Your Fleet<br /><em>Working Strong.</em></h3><p>Ask about parts support, maintenance planning, technical guidance and service availability.</p><button className="btn btn-outline" onClick={openQuote}>Talk to Service Team <ArrowRight size={15} /></button></div>
            </div>
          </div>
        </section>

        <section className="proof-news-section section-dark">
          <div className="container proof-news-grid">
            <div className="testimonial-panel">
              <SectionEyebrow>Customer testimonials</SectionEyebrow><h2>Trusted on <em>Real Jobsites</em></h2>
              <div className="testimonial-content"><Quote size={27} /><p>“Iron Crest helped us compare options and shortlist the right excavator for our quarry work. The team made the process clear from the start.”</p></div>
              <div className="testimonial-author"><div className="avatar">AR</div><div><strong>Ali Raza</strong><small>Project Manager · Quarry Operations</small></div><div className="stars"><Star /><Star /><Star /><Star /><Star /></div></div>
            </div>
            <div className="news-panel"><div className="news-heading"><div><SectionEyebrow>From the field</SectionEyebrow><h2>Latest Updates <em>& News</em></h2></div><a href="#contact">View all <ArrowRight size={14} /></a></div>
              <div className="news-list">
                <article className="news-item"><img src="/images/category-large.webp" alt="Excavator at a jobsite" loading="lazy" /><div><span>PRODUCT SPOTLIGHT · NOV 10, 2026</span><h3>Choosing the Right Excavator Class for Your Project</h3><a href="#models">Explore the lineup <ArrowUpRight size={13} /></a></div></article>
                <article className="news-item"><img src="/images/parts-service.webp" alt="Equipment parts and components" loading="lazy" /><div><span>MAINTENANCE · NOV 05, 2026</span><h3>Simple Maintenance Habits That Help Protect Uptime</h3><a href="#support">Speak to service <ArrowUpRight size={13} /></a></div></article>
              </div>
            </div>
          </div>
        </section>

        <section className="service-network section-dark">
          <div className="container service-network-inner">
            <div className="service-copy"><SectionEyebrow>Support that moves with you</SectionEyebrow><h2>Our Service <em>Network</em></h2><p>Connect with the Iron Crest team for equipment guidance, parts enquiries and after-sales support.</p><button className="btn btn-primary" onClick={openQuote}>Find Support <ArrowRight size={15} /></button></div>
            <div className="service-map"><div className="map-dots" /><span><MapPin /> Regional support</span></div>
            <div className="stat-grid"><div><Factory /><strong>08+</strong><small>Global Brands</small></div><div><Truck /><strong>500+</strong><small>Excavator Models*</small></div><div><Wrench /><strong>50+</strong><small>Service Partners*</small></div><div><Users /><strong>10,000+</strong><small>Customers Reached*</small></div></div>
          </div>
          <div className="container stat-note">* Illustrative design figures — replace with verified Iron Crest company data before launch.</div>
        </section>

        <section className="newsletter-section">
          <div className="container newsletter-inner">
            <div className="newsletter-icon"><Mail size={23} /></div><div className="newsletter-copy"><h3>Stay Updated with Iron Crest</h3><p>Get new model updates, special offers and industry insights in your inbox.</p></div>
            <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setNewsletterStatus('Demo confirmation only. Connect an email platform before launch to collect subscriptions.'); setNewsletterEmail(''); }}>
              <input type="email" required value={newsletterEmail} onChange={(event) => setNewsletterEmail(event.target.value)} placeholder="Enter your email address" aria-label="Email address" />
              <button type="submit">Subscribe <ArrowRight size={15} /></button>
            </form>
          </div>
          {newsletterStatus && <div className="container newsletter-status"><CheckCircle2 size={14} /> {newsletterStatus}</div>}
        </section>
      </main>

      <Footer onQuote={openQuote} />
      <QuoteModal modal={modal} onClose={() => setModal(null)} />
    </div>
  );
}
