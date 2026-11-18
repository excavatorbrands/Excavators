import { useState } from 'react';
import {
  ArrowRight, ArrowUpRight, Building2, Check, ChevronRight, Factory,
  Layers3, Mountain, Route, Sparkles, Truck, X,
} from 'lucide-react';
import { Header, Footer } from './Chrome.jsx';
import { industries } from './data.js';
import './pages.css';

const solutionData = {
  Construction: { icon: <Building2 />, title: 'Construction', lead: 'Versatile excavation for foundations, utilities, earthworks and site preparation.', image: '/images/industry-construction.webp', points: ['General excavation', 'Foundation preparation', 'Utility trenching', 'Site development'] },
  'Mining & Quarry': { icon: <Mountain />, title: 'Mining & Quarry', lead: 'Heavy-duty machine selection for demanding excavation, loading and quarry environments.', image: '/images/industry-quarry.webp', points: ['Overburden removal', 'Bench preparation', 'Material loading', 'Quarry development'] },
  'Road & Infrastructure': { icon: <Route />, title: 'Road & Infrastructure', lead: 'Equipment planning for roadworks, drainage, bridges and major infrastructure packages.', image: '/images/industry-infrastructure.webp', points: ['Road formation', 'Drainage works', 'Bridge packages', 'Utility corridors'] },
  'Urban Development': { icon: <Building2 />, title: 'Urban Development', lead: 'Compact and controlled excavation for active urban sites where access and precision matter.', image: '/images/industry-urban.webp', points: ['Restricted access', 'Demolition preparation', 'Basement excavation', 'Utility work'] },
  'Material Handling': { icon: <Layers3 />, title: 'Material Handling', lead: 'Machine and attachment planning for moving, sorting and loading bulk material.', image: '/images/industry-handling.webp', points: ['Stockpile handling', 'Loading operations', 'Material sorting', 'Attachment planning'] },
  Demolition: { icon: <Sparkles />, title: 'Demolition', lead: 'Purpose-led machine selection for controlled demolition, separation and site clearance.', image: '/images/industry-demolition.webp', points: ['Structure removal', 'Site clearance', 'Material separation', 'Attachment selection'] },
};

export default function SolutionsPage() {
  const [active, setActive] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('industry');
    return solutionData[requested] ? requested : 'Construction';
  });
  const current = solutionData[active];

  return (
    <div className="inner-page solutions-page">
      <Header active="solutions" />
      <main>
        <section className="sol-hero">
          <div className="sol-hero-grid container">
            <div className="sol-hero-copy">
              <div className="page-breadcrumb"><a href="/">Home</a><ChevronRight size={13} /><b>Solutions</b></div>
              <span className="page-kicker">APPLICATION-FIRST EQUIPMENT PLANNING</span>
              <h1>THE RIGHT MACHINE<br /><em>FOR THE JOB.</em></h1>
              <p>Different sites create different demands. Explore Iron Crest solutions by application, then narrow the machine class, configuration and support pathway around your project.</p>
              <a href="#solution-selector" className="btn btn-primary">Explore applications <ArrowRight size={16} /></a>
            </div>
            <div className="sol-hero-art"><img src="/images/hero-quarry.webp" alt="Excavator working in a quarry environment" /><span>PROJECT<br /><b>→</b> MACHINE</span></div>
          </div>
        </section>

        <section className="sol-selector" id="solution-selector">
          <div className="container">
            <div className="page-section-head"><div><span className="page-kicker">INDUSTRY SELECTOR</span><h2>Choose the <em>work.</em></h2></div><p>Each application below opens a focused planning view.</p></div>
            <div className="sol-selector-layout">
              <div className="sol-tabs">
                {industries.map(item => (
                  <button type="button" key={item.title} className={active === item.title ? 'active' : ''} aria-pressed={active === item.title} onClick={() => setActive(item.title)}>
                    <span>{solutionData[item.title].icon}</span><strong>{item.title}</strong><ArrowRight size={15} />
                  </button>
                ))}
              </div>
              <article className="sol-feature">
                <div className="sol-feature-image"><img src={current.image} alt={current.title} /><span>{current.title.toUpperCase()}</span></div>
                <div className="sol-feature-copy">
                  <div className="sol-feature-icon">{current.icon}</div>
                  <span className="page-kicker">APPLICATION PROFILE</span>
                  <h3>{current.title}</h3>
                  <p>{current.lead}</p>
                  <div className="sol-points">{current.points.map(point => <span key={point}><Check size={14} /> {point}</span>)}</div>
                  <a href="/excavators" className="btn btn-primary">Browse excavators <ArrowUpRight size={15} /></a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="sol-method">
          <div className="container">
            <div className="page-section-head"><div><span className="page-kicker">THE IRON CREST METHOD</span><h2>Start with the site. <em>Then choose.</em></h2></div></div>
            <div className="sol-method-grid">
              <article><span>01</span><Truck /><h3>Understand the work</h3><p>Clarify material, access, cycle, depth, reach and operating environment.</p></article>
              <article><span>02</span><Factory /><h3>Define the machine</h3><p>Match the application to machine class, configuration and attachment needs.</p></article>
              <article><span>03</span><Layers3 /><h3>Plan ownership</h3><p>Consider parts, maintenance, service support and the practical operating horizon.</p></article>
            </div>
          </div>
        </section>

        <section className="sol-project-band">
          <div className="container sol-project-inner">
            <div><span className="page-kicker">PROJECT SUPPORT</span><h2>Have a project already scoped?</h2><p>Send the basic project parameters and let the Iron Crest team help you define the equipment shortlist.</p></div>
            <a href="/contact" className="btn btn-primary">Discuss your project <ArrowRight size={16} /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
