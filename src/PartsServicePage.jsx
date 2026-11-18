import { useMemo, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronRight, ClipboardCheck, Clock3,
  Cog, FileSearch, Gauge, PackageCheck, Phone, Search, ShieldCheck,
  Truck, Wrench, X,
} from 'lucide-react';
import { Header, Footer } from './Chrome.jsx';
import './pages.css';

const serviceLines = [
  { icon: <Wrench />, title: 'Planned maintenance', text: 'Build practical inspection and maintenance routines around operating hours, site conditions and machine class.' },
  { icon: <PackageCheck />, title: 'Parts identification', text: 'Start with the machine, component or part reference and let the Iron Crest team help identify the right item.' },
  { icon: <Gauge />, title: 'Technical support', text: 'Discuss machine symptoms, operating questions and service requirements before work is scheduled.' },
  { icon: <Truck />, title: 'Field support pathway', text: 'Coordinate the next service step with the appropriate local support contact and machine information.' },
];

const process = [
  ['01', 'Tell us the machine', 'Share brand, model, serial information and the issue or part you need.'],
  ['02', 'We clarify the requirement', 'Our team checks the request and identifies the appropriate technical or parts pathway.'],
  ['03', 'Confirm the solution', 'You receive the relevant part, service or next-step recommendation before work proceeds.'],
];

export default function PartsServicePage() {
  const [query, setQuery] = useState('');
  const visibleLines = useMemo(() => serviceLines.filter(item => !query || `${item.title} ${item.text}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <div className="inner-page parts-page">
      <Header active="parts & service" />
      <main>
        <section className="ps-hero">
          <div className="ps-hero-image" />
          <div className="container ps-hero-inner">
            <div className="page-breadcrumb"><a href="/">Home</a><ChevronRight size={13} /><b>Parts & Service</b></div>
            <div className="ps-hero-copy">
              <span className="page-kicker">KEEP YOUR EQUIPMENT MOVING</span>
              <h1>PARTS & <em>SERVICE</em><br />BUILT AROUND UPTIME.</h1>
              <p>Practical support for excavator owners, fleet teams and project managers — from parts identification to maintenance planning and technical guidance.</p>
              <div className="hero-cta-row">
                <a href="#parts-finder" className="btn btn-primary">Find a part <Search size={16} /></a>
                <a href="/contact" className="btn btn-outline">Talk to service <ArrowRight size={16} /></a>
              </div>
            </div>
          </div>
          <div className="ps-hero-stamp"><Cog size={20} /><span>PARTS<br /><b>+</b> SERVICE</span></div>
        </section>

        <section className="ps-service-grid-section">
          <div className="container">
            <div className="page-section-head">
              <div><span className="page-kicker">SUPPORT PATHWAYS</span><h2>One team. <em>Four ways forward.</em></h2></div>
              <p>Choose the route that matches what is happening on your site today.</p>
            </div>
            <div className="ps-service-grid">
              {visibleLines.map((item, index) => (
                <article className="ps-service-card" key={item.title}>
                  <span className="ps-card-index">0{index + 1}</span>
                  <div className="ps-card-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a href={`/contact?type=${item.title === 'Parts identification' ? 'parts' : 'service'}`}>Start a request <ArrowRight size={14} /></a>
                </article>
              ))}
              {!visibleLines.length && <p className="ps-no-results" role="status">No support topics match “{query}”. <button type="button" onClick={() => setQuery('')}>Clear search</button></p>}
            </div>
          </div>
        </section>

        <section className="ps-finder" id="parts-finder">
          <div className="container ps-finder-inner">
            <div className="ps-finder-copy">
              <span className="page-kicker">SUPPORT TOPIC SEARCH</span>
              <h2>Find a support <em>pathway.</em></h2>
              <p>This search filters the support topics shown above; it does not check parts inventory. A live parts lookup requires a connected catalog.</p>
              <label className="ps-search"><Search size={18} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g. maintenance, technical support..." aria-label="Search support topics" /><span>FIND</span></label>
              <div className="ps-search-hints"><span>Try:</span><button type="button" onClick={() => setQuery('planned maintenance')}>Maintenance</button><button type="button" onClick={() => setQuery('technical support')}>Technical support</button><button type="button" onClick={() => setQuery('identification')}>Identification</button></div>
            </div>
            <div className="ps-finder-panel">
              <div className="ps-panel-top"><span>REQUEST CHECKLIST</span><ClipboardCheck size={20} /></div>
              <ul>
                <li><CheckCircle2 /> Manufacturer and model</li>
                <li><CheckCircle2 /> Serial / component reference</li>
                <li><CheckCircle2 /> Required quantity</li>
                <li><CheckCircle2 /> Delivery location</li>
              </ul>
              <a href="/contact?type=parts" className="btn btn-primary">Prepare parts enquiry <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="ps-process">
          <div className="container">
            <div className="page-section-head compact"><div><span className="page-kicker">HOW IT WORKS</span><h2>From request to <em>resolution.</em></h2></div></div>
            <div className="ps-process-grid">
              {process.map(([num, title, text]) => <article key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div>{num !== '03' && <ArrowRight className="ps-process-arrow" />}</article>)}
            </div>
          </div>
        </section>

        <section className="ps-maintenance">
          <div className="container ps-maintenance-layout">
            <div className="ps-maintenance-image"><img src="/images/parts-service.webp" alt="Excavator parts and service detail" loading="lazy" /><span>FIELD READY</span></div>
            <div className="ps-maintenance-copy">
              <span className="page-kicker">MAINTENANCE MINDSET</span>
              <h2>Protect the machine before the <em>problem.</em></h2>
              <p>Good maintenance starts with clear machine information, consistent inspections and a service plan that fits the job. Iron Crest can help you structure the next step.</p>
              <div className="ps-checklist"><div><ShieldCheck /> Inspection-led</div><div><Clock3 /> Hours-aware</div><div><FileSearch /> Record-ready</div></div>
              <a href="/contact?type=service" className="btn btn-primary">Plan a service conversation <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="ps-callout">
          <div className="container ps-callout-inner">
            <div><Phone size={25} /><div><span>NEED IMMEDIATE GUIDANCE?</span><strong>Tell us what machine you are working with.</strong></div></div>
            <a href="/contact?type=service" className="btn btn-primary">Contact Iron Crest <ArrowRight size={15} /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
