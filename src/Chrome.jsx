import { useState } from 'react';
import {
  ArrowRight, ChevronDown, Mail, MapPin, Menu, Phone, Search, UserRound, X,
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

export function Header({ onQuote = () => {}, onSearch = () => {}, active = '' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navItems = [
    ['Brands', '/brands'], ['Excavators', '/excavators'], ['Parts & Service', '/#support'],
    ['Solutions', '/#solutions'], ['Resources', '/#resources'], ['About Us', '/#why-us'], ['Contact', '/#contact'],
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
          <div className="utility-right"><a href="/#contact">Dealer</a><a href="/#support">Support</a><a href="/#contact">Track Order</a></div>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav-inner">
          <IronCrestLogo />
          <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
          <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            <a className={active === 'home' ? 'nav-home active' : 'nav-home'} href="/" onClick={() => setMenuOpen(false)}>Home</a>
            {navItems.map(([label, href]) => <a className={active === label.toLowerCase() ? 'active' : ''} key={label} href={href} onClick={() => setMenuOpen(false)}>{label}{['Brands', 'Excavators', 'Parts & Service', 'Solutions', 'Resources'].includes(label) && <ChevronDown size={12} />}</a>)}
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
              <button onClick={() => { onSearch(searchText); setSearchOpen(false); if (window.location.pathname !== '/') window.location.href = `/excavators?search=${encodeURIComponent(searchText)}`; else document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn btn-primary">Search models <ArrowRight size={15} /></button>
              <button className="search-close" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={18} /></button>
            </div>
            {searchText && <div className="container search-hint">Search term: <strong>{searchText}</strong> — browse matching excavators.</div>}
          </div>
        )}
      </header>
    </>
  );
}

export function Footer({ onQuote = () => {} }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-main">
        <div className="footer-brand-col">
          <IronCrestLogo />
          <p>Your multi-brand destination for excavators, genuine parts and dependable equipment support.</p>
          <div className="social-links"><a href="/#contact" aria-label="Facebook">f</a><a href="/#contact" aria-label="YouTube">▶</a><a href="/#contact" aria-label="Instagram">◎</a><a href="/#contact" aria-label="LinkedIn">in</a></div>
        </div>
        <div className="footer-column"><h4>Quick Links</h4><a href="/">Home</a><a href="/brands">Brands</a><a href="/excavators">Excavators</a><a href="/#support">Parts & Service</a><a href="/#solutions">Solutions</a><a href="/#why-us">About Us</a></div>
        <div className="footer-column"><h4>Our Brands</h4>{brands.map((brand) => <a key={brand.id} href={`/brands?brand=${brand.id}`}>{brand.name}</a>)}</div>
        <div className="footer-column"><h4>Support</h4><a href="/excavators#catalog">Product Catalog</a><a href="/#support">Service Centers</a><a href="/#support">FAQs</a><a href="/#support">Warranty</a></div>
        <div className="footer-column footer-contact"><h4>Contact Us</h4><a href="tel:+923001234567"><Phone size={14} /> +92 300 1234567</a><a href="mailto:sales@ironcrest.com"><Mail size={14} /> sales@ironcrest.com</a><span><MapPin size={14} /> Lahore, Pakistan</span><button className="btn btn-primary footer-quote" onClick={onQuote}>Talk to our team <ArrowRight size={15} /></button></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Iron Crest Excavator Solutions. All rights reserved.</span><div><a href="/#contact">Privacy Policy</a><a href="/#contact">Terms & Conditions</a><a href="#top">Back to top ↑</a></div></div>
    </footer>
  );
}
