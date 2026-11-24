import { useState, useEffect } from 'react';
import { ArrowRight, Menu, Search, X } from 'lucide-react';
import { IronCrestLogo } from './IronCrestLogo.jsx';

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
          <button type="button" className="mobile-menu-button" onClick={() => { setSearchOpen(false); setMenuOpen(!menuOpen); }} aria-expanded={menuOpen} aria-controls="main-nav" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X /> : <Menu />}</button>
          <nav id="main-nav" className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            <a className={active === 'home' ? 'nav-home active' : 'nav-home'} aria-current={active === 'home' ? 'page' : undefined} href="/" onClick={() => setMenuOpen(false)}>Home</a>
            {navItems.map(([label, href]) => {
              const isActive = active === label.toLowerCase();
              return <a className={isActive ? 'active' : ''} aria-current={isActive ? 'page' : undefined} key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>;
            })}
          </nav>
          <div className="nav-actions">
            <button type="button" className="icon-button" aria-label="Search models" aria-expanded={searchOpen} aria-controls="search-drawer" onClick={() => { setMenuOpen(false); setSearchOpen(!searchOpen); }}><Search size={19} /></button>
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
