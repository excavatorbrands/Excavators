import { ArrowRight, ChevronRight, Factory, Layers3, Truck } from 'lucide-react';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import IndustryStudio from './IndustryStudio.jsx';
import './pages.css';

export default function SolutionsPage() {
  return (
    <div className="inner-page solutions-page">
      <Header active="solutions" />
      <main>
        <section className="sol-hero">
          <div className="sol-hero-grid container">
            <div className="sol-hero-copy">
              <div className="page-breadcrumb"><a href="/">Home</a><ChevronRight size={13} /><b>Solutions</b></div>
              <h1>THE RIGHT MACHINE<br /><em>FOR THE JOB.</em></h1>
              <p>Different sites create different demands. Explore Iron Crest solutions by application, then narrow the machine class, configuration and support pathway around your project.</p>
              <a href="#solution-selector" className="btn btn-primary">Explore applications <ArrowRight size={16} /></a>
            </div>
            <div className="sol-hero-art"><img src="/images/hero-quarry.webp" alt="Excavator working in a quarry environment" /></div>
          </div>
        </section>

        <IndustryStudio fullPage />

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
            <a href="/contact-us" className="btn btn-primary">Discuss your project <ArrowRight size={16} /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
