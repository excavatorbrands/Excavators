import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight, BookOpen, CalendarDays, CheckCircle2, ChevronRight,
  Download, FileText, HelpCircle, Search, ShieldCheck, Wrench,
} from 'lucide-react';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import './pages.css';

const resources = [
  { category: 'Guide', title: 'Excavator Class Selection Guide', text: 'A practical starting point for choosing a machine class around access, duty and application.', icon: <BookOpen />, image: '/images/category-medium.webp' },
  { category: 'Maintenance', title: 'Maintenance Planning Checklist', text: 'Use a simple inspection-led structure to prepare service conversations and maintenance records.', icon: <Wrench />, image: '/images/parts-service.webp' },
  { category: 'Catalog', title: 'Multi-Brand Excavator Directory', text: 'Browse manufacturers and model examples in the Iron Crest equipment directory.', icon: <FileText />, image: '/images/brands/brand-directory-hero.webp' },
  { category: 'Project', title: 'Equipment Enquiry Brief', text: 'Prepare the core project details your equipment team needs before a recommendation.', icon: <ShieldCheck />, image: '/images/compare-machines.webp' },
];

const faqs = [
  ['Can I request a specific manufacturer model?', 'Yes. Use the excavator catalog or contact page to tell the Iron Crest team the brand and model you are considering.'],
  ['Can specifications vary by market?', 'Yes. Machine configurations, attachments and specifications can vary. Request the verified specification for the exact configuration before purchase.'],
  ['Can I ask about parts and service?', 'Yes. The Parts & Service page is designed for parts identification, maintenance planning and technical support enquiries.'],
];

export default function ResourcesPage({ embedded = false }) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const faqSection = useRef(null);

  useEffect(() => {
    if (!embedded && window.location.hash === '#resource-faqs') {
      faqSection.current?.scrollIntoView({ behavior: 'instant' });
    }
  }, [embedded]);
  const filters = ['All', 'Guide', 'Maintenance', 'Catalog', 'Project'];
  const filtered = useMemo(() => resources.filter(item => (filter === 'All' || item.category === filter) && (!query || `${item.title} ${item.text}`.toLowerCase().includes(query.toLowerCase()))), [filter, query]);
  const Content = embedded ? 'section' : 'main';

  return (
    <div className="inner-page resources-page" id={embedded ? "resources" : undefined}>
      {!embedded && <Header active="contact us" />}
      <Content aria-labelledby={embedded ? 'project-brief-resources-title' : undefined}>
        {embedded ? (
          <header className="project-brief-chapter">
            <div className="container">
              <h2 id="project-brief-resources-title">Resource Room</h2>
              <p>Equipment guides, planning tools, and answers to common questions.</p>
            </div>
          </header>
        ) : <section className="res-hero">
          <div className="container res-hero-inner">
            <div className="page-breadcrumb"><a href="/">Home</a><ChevronRight size={13} /><b>Resources</b></div>
            <div className="res-hero-copy">
              <span className="page-kicker">KNOWLEDGE FOR BETTER EQUIPMENT DECISIONS</span>
              <h1>THE IRON CREST<br /><em>RESOURCE ROOM.</em></h1>
              <p>Guides, catalog references and practical planning tools designed to help you move from equipment questions to confident next steps.</p>
            </div>
          </div>
        </section>}

        <section className="res-library">
          <div className="container">
            <div className="res-library-top">
              <div><span className="page-kicker">LIBRARY</span><h2>Explore the <em>collection.</em></h2></div>
              <label className="res-search"><Search size={17} /><input aria-label="Search resources" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search resources..." /></label>
            </div>
            <div className="res-filters" role="group" aria-label="Filter resources by category">{filters.map(item => <button type="button" key={item} className={filter === item ? 'active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
            <div className="res-grid">
              {filtered.map(item => (
                <article className="res-card" key={item.title}>
                  <div className="res-card-image"><img src={item.image} alt="" loading="lazy" /><span>{item.category}</span></div>
                  <div className="res-card-body"><div className="res-card-icon">{item.icon}</div><h3>{item.title}</h3><p>{item.text}</p><a href={`/contact?type=resource&resource=${encodeURIComponent(item.title)}`}>Ask about this resource <ArrowRight size={14} /></a></div>
                </article>
              ))}
              {!filtered.length && <p className="res-empty" role="status">No resources match your search. Try another term or choose a different category.</p>}
            </div>
          </div>
        </section>

        <section className="res-download-band">
          <div className="container res-download-inner">
            <div className="res-document-art"><div><span>IRON CREST</span><strong>EXCAVATOR<br />RANGE</strong><small>PRODUCT DIRECTORY</small></div></div>
            <div><span className="page-kicker">PRODUCT DIRECTORY</span><h2>Need the <em>full range?</em></h2><p>Use the live excavator catalog to browse brands, models, machine classes and availability status.</p><a href="/excavators" className="btn btn-primary">Open excavator catalog <ArrowRight size={16} /></a></div>
            <div className="res-download-note"><Download size={19} /><span>Digital-first<br /><b>catalog access</b></span></div>
          </div>
        </section>

        <section className="res-faq" id="resource-faqs" ref={faqSection}>
          <div className="container res-faq-layout">
            <div><span className="page-kicker">QUICK ANSWERS</span><h2>Before you <em>enquire.</em></h2><p>Common questions to help you prepare the right information for an equipment conversation.</p><a href="/contact-us" className="btn btn-outline">Ask another question <ArrowRight size={15} /></a></div>
            <div className="faq-list">
              {faqs.map(([q, a], i) => <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={q}><button type="button" aria-expanded={openFaq === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}><span><HelpCircle size={17} />{q}</span><span aria-hidden="true">{openFaq === i ? '−' : '+'}</span></button><p id={`faq-answer-${i}`} hidden={openFaq !== i}>{a}</p></div>)}
            </div>
          </div>
        </section>

        <section className="res-news">
          <div className="container res-news-inner">
            <div><CalendarDays size={20} /><span>FIELD NOTE</span></div>
            <p>Model data, stock status and configurations should always be confirmed against current manufacturer and local Iron Crest information.</p>
            <a href="/contact-us">Request verified information <ArrowRight size={14} /></a>
          </div>
        </section>
      </Content>
      {!embedded && <Footer />}
    </div>
  );
}
