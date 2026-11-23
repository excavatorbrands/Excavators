import {
  ArrowRight, BadgeCheck, ChevronRight, Compass, Handshake, Layers3,
  ShieldCheck, Target, UsersRound,
} from 'lucide-react';
import { Header, Footer } from './Chrome.jsx';
import './pages.css';

const values = [
  { icon: <Target />, title: 'Purpose before product', text: 'We start with the work, site and operating requirement before narrowing the machine.' },
  { icon: <Handshake />, title: 'Clear conversations', text: 'We keep equipment decisions practical, transparent and easy to understand.' },
  { icon: <ShieldCheck />, title: 'Verification matters', text: 'Exact specifications, configurations and availability should be confirmed before purchase.' },
  { icon: <UsersRound />, title: 'Support beyond sale', text: 'Parts, service and ownership questions remain part of the equipment conversation.' },
];

export default function AboutPage({ embedded = false }) {
  return (
    <div className="inner-page about-page" id={embedded ? "about" : undefined}>
      {!embedded && <Header active="contact us" />}
      <main>
        <section className="about-hero">
          <div className="container about-hero-inner">
            <div className="page-breadcrumb"><a href="/">Home</a><ChevronRight size={13} /><b>About Us</b></div>
            <div className="about-hero-copy"><span className="page-kicker">THE IRON CREST APPROACH</span><h1>EQUIPMENT<br /><em>WITHOUT THE NOISE.</em></h1><p>A focused, multi-brand approach to excavator selection, parts support and service conversations — built around the realities of the work.</p></div>
          </div>
        </section>

        <section className="about-intro">
          <div className="container about-intro-grid">
            <div className="about-intro-statement"><span className="page-kicker">WHO WE ARE</span><h2>One place to <em>compare.</em><br />One team to <em>ask.</em></h2></div>
            <div><p>Iron Crest Excavator Solutions is designed as a multi-brand equipment destination where buyers can explore excavator classes, compare model examples and connect their equipment decision with parts and service support.</p><p>The website brings the selection journey into one system: discover the application, shortlist the machine, verify the configuration and plan the ownership support around it.</p><a href="/excavators" className="btn btn-primary">Explore the catalog <ArrowRight size={15} /></a></div>
          </div>
        </section>

        <section className="about-values">
          <div className="container">
            <div className="page-section-head"><div><span className="page-kicker">WHAT GUIDES US</span><h2>Four principles. <em>One standard.</em></h2></div></div>
            <div className="about-values-grid">{values.map((item, i) => <article key={item.title}><span>0{i + 1}</span><div className="about-value-icon">{item.icon}</div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </div>
        </section>

        <section className="about-story">
          <div className="container about-story-grid">
            <div className="about-story-image"><img src="/images/hero-quarry.webp" alt="Excavator operating in a quarry" /><span>BUILT AROUND THE JOB</span></div>
            <div className="about-story-copy">
              <span className="page-kicker">OUR WAY OF WORKING</span>
              <h2>From <em>application</em> to ownership.</h2>
              <div className="about-story-steps">
                <div><span>01</span><div><b>Understand</b><p>Project, site and operating conditions.</p></div></div>
                <div><span>02</span><div><b>Shortlist</b><p>Brand, class, configuration and attachment.</p></div></div>
                <div><span>03</span><div><b>Verify</b><p>Current specifications and availability.</p></div></div>
                <div><span>04</span><div><b>Support</b><p>Parts, service and future ownership needs.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-difference">
          <div className="container about-difference-inner">
            <div className="about-difference-mark"><Compass size={32} /><span>IC</span></div>
            <div><span className="page-kicker">THE IRON CREST DIFFERENCE</span><h2>Professional by design.<br /><em>Practical by nature.</em></h2><p>The goal is simple: make a complex equipment decision easier to navigate without pretending that every machine, project or market is the same.</p></div>
            <a href="/contact-us" className="btn btn-primary">Start a conversation <ArrowRight size={15} /></a>
          </div>
        </section>

        <section className="about-commitment">
          <div className="container about-commitment-grid">
            <div><span className="page-kicker">A BETTER STANDARD</span><h2>Good equipment decisions are <em>informed decisions.</em></h2></div>
            <div className="about-commitment-points"><div><BadgeCheck /><span>Multi-brand discovery</span></div><div><Layers3 /><span>Application-led thinking</span></div><div><ShieldCheck /><span>Verification-first communication</span></div></div>
          </div>
        </section>
      </main>
      {!embedded && <Footer />}
    </div>
  );
}
