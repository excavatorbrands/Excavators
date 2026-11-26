import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, Menu, Search, X } from 'lucide-react';
import { brands } from './data.js';
import { brandUrl } from './catalogLinks.js';
import { IronCrestLogo } from './IronCrestLogo.jsx';

export function Header({ onQuote = () => { window.location.href = '/contact'; }, onSearch = () => {}, active = '' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const brandMenu = useRef(null);
  const brandToggle = useRef(null);
  const brandCloseTimer = useRef(null);
  const [searchText, setSearchText] = useState('');
  useEffect(() => () => window.clearTimeout(brandCloseTimer.current), []);

  function handleBrandPointerEnter(event) {
    if (event.pointerType !== 'mouse' || !window.matchMedia('(min-width: 821px) and (any-hover: hover)').matches) return;
    window.clearTimeout(brandCloseTimer.current);
    setBrandsOpen(true);
  }

  function handleBrandPointerLeave(event) {
    if (event.pointerType !== 'mouse') return;
    window.clearTimeout(brandCloseTimer.current);
    brandCloseTimer.current = window.setTimeout(() => {
      const focused = document.activeElement;
      if (focused === brandToggle.current || !brandMenu.current?.contains(focused)) setBrandsOpen(false);
    }, 220);
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = 'hidden';
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (brandsOpen) {
          setBrandsOpen(false);
          brandToggle.current?.focus();
          return;
        }
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen, brandsOpen]);
  useEffect(() => {
    if (!brandsOpen) return;
    const closeOutside = (event) => {
      if (!brandMenu.current?.contains(event.target)) setBrandsOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [brandsOpen]);
  const navItems = [
    ['Excavators', '/excavators'], ['Parts & Service', '/parts-service'],
    ['Solutions', '/solutions'], ['Contact Us', '/contact-us'],
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
      <header className="site-header">
        <div className="container nav-inner">
          <IronCrestLogo />
          <button type="button" className="mobile-menu-button" onClick={() => { setSearchOpen(false); setBrandsOpen(false); setMenuOpen(!menuOpen); }} aria-expanded={menuOpen} aria-controls="main-nav" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X /> : <Menu />}</button>
          <nav id="main-nav" className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            <a className={active === 'home' ? 'nav-home active' : 'nav-home'} aria-current={active === 'home' ? 'page' : undefined} href="/" onClick={() => setMenuOpen(false)}>Home</a>
            <div className="header-brands" ref={brandMenu}
              onPointerEnter={handleBrandPointerEnter}
              onPointerLeave={handleBrandPointerLeave}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setBrandsOpen(false);
              }}>
              <button type="button" className={`header-brands__toggle${active === 'brands' ? ' is-current' : ''}`}
                ref={brandToggle} aria-expanded={brandsOpen} aria-controls="header-brand-links"
                onClick={() => {
                  window.clearTimeout(brandCloseTimer.current);
                  setBrandsOpen((open) => !open);
                }}>
                Brands <ChevronDown size={15} aria-hidden="true" />
              </button>
              <div id="header-brand-links" className="header-brands__links" hidden={!brandsOpen}>
                <div className="header-brands__feature">
                  <a href="/brands" aria-current={window.location.pathname === '/brands' ? 'page' : undefined}>
                    View all brands <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </div>
                <ul className="header-brands__grid">
                  {brands.map((brand) => <li key={brand.id}>
                    <a href={brandUrl(brand)} aria-current={window.location.pathname === brandUrl(brand) ? 'page' : undefined}>{brand.name}</a>
                  </li>)}
                </ul>
              </div>
            </div>
            {navItems.map(([label, href]) => {
              const isActive = active === label.toLowerCase();
              return <a className={isActive ? 'active' : ''} aria-current={isActive ? 'page' : undefined} key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>;
            })}
          </nav>
          <div className="nav-actions">
            <button type="button" className="icon-button" aria-label="Search models" aria-expanded={searchOpen} aria-controls="search-drawer" onClick={() => { setMenuOpen(false); setBrandsOpen(false); setSearchOpen(!searchOpen); }}><Search size={19} /></button>
            <button type="button" className="btn btn-primary nav-quote" onClick={() => onQuote()}>Get a Quote</button>
          </div>
        </div>
        {searchOpen && (
          <div className="search-drawer" id="search-drawer">
            <div className="container search-inner">
              <form className="search-form" role="search" onSubmit={submitSearch}>
                <Search size={18} aria-hidden="true" />
                <input autoFocus type="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search by brand or excavator model…" aria-label="Search excavator models" />
                <button type="submit" className="btn btn-primary">Search models <ArrowRight size={15} /></button>
              </form>
              <button type="button" className="search-close" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={18} /></button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
