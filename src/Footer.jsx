import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { brands } from './data.js';
import { IronCrestLogo } from './IronCrestLogo.jsx';

export function Footer({ onQuote = () => { window.location.href = '/contact'; } }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-main">
        <div className="footer-brand-col">
          <IronCrestLogo />
          <p>Your multi-brand destination for excavators, genuine parts and dependable equipment support.</p>
          <a className="footer-brand-contact" href="/contact-us">Talk to the Iron Crest team <ArrowRight size={14} /></a>
        </div>
        <div className="footer-column"><h4>Quick Links</h4><a href="/">Home</a><a href="/brands">Brands</a><a href="/excavators">Excavators</a><a href="/parts-service">Parts & Service</a><a href="/solutions">Solutions</a><a href="/resources">Resources</a><a href="/about">About Us</a><a href="/contact-us">Contact Us</a></div>
        <div className="footer-column"><h4>Our Brands</h4>{brands.map((brand) => <a key={brand.id} href={`/brands?brand=${brand.id}`}>{brand.name}</a>)}</div>
        <div className="footer-column"><h4>Support</h4><a href="/excavators#catalog">Product Catalog</a><a href="/parts-service">Service Support</a><a href="/contact-us#resources">FAQs & Guides</a><a href="/contact?type=warranty">Warranty Enquiry</a></div>
        <div className="footer-column"><h4>Legal</h4><a href="/privacy-policy">Privacy Policy</a><a href="/terms-and-conditions">Terms & Conditions</a></div>
        <div className="footer-column footer-contact"><h4>Contact Us</h4><a href="tel:+923001234567"><Phone size={14} /> +92 300 1234567</a><a href="mailto:sales@ironcrest.com"><Mail size={14} /> sales@ironcrest.com</a><span><MapPin size={14} /> Lahore, Pakistan</span><button className="btn btn-primary footer-quote" onClick={onQuote}>Talk to our team <ArrowRight size={15} /></button></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Iron Crest Excavator Solutions. All rights reserved.</span><div><a href="/privacy-policy">Privacy Policy</a><a href="/terms-and-conditions">Terms & Conditions</a><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}>Back to top ↑</button></div></div>
    </footer>
  );
}
