import { useEffect, useState } from 'react';
import {
  ArrowRight, Mail, MapPin, Menu, Phone, Search, X,
} from 'lucide-react';
import { brands } from './data.js';

export function IronCrestLogo({ compact = false }) {
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

export function Header({ onQuote = () => { window.location.href = '/contact'; }, onSearch = () => {}, active = '' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = 'hidden';
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);
  const navItems = [
    ['Brands', '/brands'], ['Excavators', '/excavators'], ['Parts & Service', '/parts-service'],
    ['Solutions', '/solutions'], ['Resources', '/resources'], ['About Us', '/about'], ['Contact', '/contact'],
  ];
  const submitSearch = (event) => {
    event.preventDefault();
    const query = searchText.trim();
    setSearchOpen(false);
    if (!query) return;
    if (window.location.pathname === '/') {
      onSearch(query);
      document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/excavators?search=${encodeURIComponent(query)}`;
    }
  };
  return (
    <>
      <div className="utility-bar">
        <div className="container utility-inner">
          <div className="utility-left">
            <a href="tel:+923001234567"><Phone size={12} /> +92 300 1234567</a>
            <a href="mailto:sales@ironcrest.com"><Mail size={12} /> sales@ironcrest.com</a>
            <span><MapPin size={12} /> Lahore, Pakistan</span>
          </div>
          <div className="utility-right"><a href="/about">About Us</a><a href="/parts-service">Support</a><a href="/contact">Contact</a></div>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav-inner">
          <IronCrestLogo />
          <button type="button" className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-nav" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X /> : <Menu />}</button>
          <nav id="main-nav" className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            <a className={active === 'home' ? 'nav-home active' : 'nav-home'} aria-current={active === 'home' ? 'page' : undefined} href="/" onClick={() => setMenuOpen(false)}>Home</a>
            {navItems.map(([label, href]) => {
              const isActive = active === label.toLowerCase();
              return <a className={isActive ? 'active' : ''} aria-current={isActive ? 'page' : undefined} key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>;
            })}
          </nav>
          <div className="nav-actions">
            <button type="button" className="icon-button" aria-label="Search models" aria-expanded={searchOpen} aria-controls="search-drawer" onClick={() => setSearchOpen(!searchOpen)}><Search size={19} /></button>
            <button type="button" className="btn btn-primary nav-quote" onClick={() => onQuote()}>Get a Quote</button>
          </div>
        </div>
        {searchOpen && (
          <div className="search-drawer" id="search-drawer">
            <div className="container search-inner">
              <form className="search-form" role="search" onSubmit={submitSearch}>
                <Search size={18} aria-hidden="true" />
                <input autoFocus type="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search brands, excavator models or services…" aria-label="Search excavator models" />
                <button type="submit" className="btn btn-primary">Search models <ArrowRight size={15} /></button>
              </form>
              <button type="button" className="search-close" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={18} /></button>
            </div>
            {searchText && <div className="container search-hint">Search term: <strong>{searchText}</strong> — browse matching excavators.</div>}
          </div>
        )}
      </header>
    </>
  );
}

export function Footer({ onQuote = () => { window.location.href = '/contact'; } }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-main">
        <div className="footer-brand-col">
          <IronCrestLogo />
          <p>Your multi-brand destination for excavators, genuine parts and dependable equipment support.</p>
          <a className="footer-brand-contact" href="/contact">Talk to the Iron Crest team <ArrowRight size={14} /></a>
        </div>
        <div className="footer-column"><h4>Quick Links</h4><a href="/">Home</a><a href="/brands">Brands</a><a href="/excavators">Excavators</a><a href="/parts-service">Parts & Service</a><a href="/solutions">Solutions</a><a href="/resources">Resources</a><a href="/about">About Us</a><a href="/contact">Contact</a></div>
        <div className="footer-column"><h4>Our Brands</h4>{brands.map((brand) => <a key={brand.id} href={`/brands?brand=${brand.id}`}>{brand.name}</a>)}</div>
        <div className="footer-column"><h4>Support</h4><a href="/excavators#catalog">Product Catalog</a><a href="/parts-service">Service Support</a><a href="/resources">FAQs & Guides</a><a href="/contact?type=warranty">Warranty Enquiry</a></div>
        <div className="footer-column"><h4>Legal</h4><a href="/privacy-policy">Privacy Policy</a><a href="/terms-and-conditions">Terms & Conditions</a></div>
        <div className="footer-column footer-contact"><h4>Contact Us</h4><a href="tel:+923001234567"><Phone size={14} /> +92 300 1234567</a><a href="mailto:sales@ironcrest.com"><Mail size={14} /> sales@ironcrest.com</a><span><MapPin size={14} /> Lahore, Pakistan</span><button className="btn btn-primary footer-quote" onClick={onQuote}>Talk to our team <ArrowRight size={15} /></button></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Iron Crest Excavator Solutions. All rights reserved.</span><div><a href="/privacy-policy">Privacy Policy</a><a href="/terms-and-conditions">Terms & Conditions</a><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}>Back to top ↑</button></div></div>
    </footer>
  );
}
