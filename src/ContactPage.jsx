import { useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronRight, Clock3, Mail, MapPin,
  MessageSquare, Phone, Send, ShieldCheck,
} from 'lucide-react';
import { Header, Footer } from './Chrome.jsx';
import './pages.css';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="inner-page contact-page">
      <Header active="contact" />
      <main>
        <section className="contact-hero">
          <div className="container contact-hero-inner">
            <div className="page-breadcrumb"><a href="/">Home</a><ChevronRight size={13} /><b>Contact</b></div>
            <div className="contact-hero-copy"><span className="page-kicker">LET'S TALK EQUIPMENT</span><h1>YOUR PROJECT.<br /><em>OUR NEXT CONVERSATION.</em></h1><p>Tell us what you are working on, what machine you are considering or what support you need. We will route the request to the right conversation.</p></div>
          </div>
          <div className="contact-hero-side"><span>CONTACT<br />DESK</span><strong>24/7</strong><small>REQUEST<br />INTAKE</small></div>
        </section>

        <section className="contact-main">
          <div className="container contact-layout">
            <div className="contact-info">
              <span className="page-kicker">IRON CREST CONTACT DESK</span>
              <h2>Start with the <em>details.</em></h2>
              <p>The more context you share, the easier it is to guide you toward the right machine, part or service pathway.</p>
              <div className="contact-methods">
                <a href="tel:+923001234567"><span><Phone /></span><div><small>CALL</small><strong>+92 300 1234567</strong></div></a>
                <a href="mailto:sales@ironcrest.com"><span><Mail /></span><div><small>EMAIL</small><strong>sales@ironcrest.com</strong></div></a>
                <div><span><MapPin /></span><div><small>LOCATION</small><strong>Lahore, Pakistan</strong></div></div>
                <div><span><Clock3 /></span><div><small>ENQUIRY HOURS</small><strong>Mon–Sat · Business hours</strong></div></div>
              </div>
              <div className="contact-assurance"><ShieldCheck size={19} /><span><b>Clear information first.</b> Exact machine configuration, availability and technical data should be verified before purchase.</span></div>
            </div>

            <div className="contact-form-card">
              {!sent ? (
                <>
                  <div className="contact-form-head"><div><span className="page-kicker">SEND AN ENQUIRY</span><h2>What can we <em>help with?</em></h2></div><MessageSquare size={26} /></div>
                  <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
                    <div className="contact-form-row"><label>Full name<input required placeholder="Your name" /></label><label>Company<input placeholder="Company name" /></label></div>
                    <div className="contact-form-row"><label>Email<input required type="email" placeholder="you@company.com" /></label><label>Phone<input required placeholder="+92 ..." /></label></div>
                    <label>Enquiry type<select defaultValue="equipment"><option value="equipment">Equipment / excavator</option><option value="parts">Parts request</option><option value="service">Service support</option><option value="project">Project consultation</option><option value="other">Other</option></select></label>
                    <label>Project / requirement details<textarea required rows="5" placeholder="Tell us the machine, application, location and timeline..."></textarea></label>
                    <button className="btn btn-primary contact-submit" type="submit">Send enquiry <Send size={15} /></button>
                    <small className="contact-form-note">Front-end form ready for CRM, email or serverless integration.</small>
                  </form>
                </>
              ) : (
                <div className="contact-success"><CheckCircle2 size={54} /><span className="page-kicker">REQUEST RECEIVED</span><h2>Thank you.</h2><p>Your enquiry has been captured in this front-end demo. Connect the form backend before launch to receive real submissions.</p><button className="btn btn-primary" onClick={() => setSent(false)}>Send another request <ArrowRight size={15} /></button></div>
              )}
            </div>
          </div>
        </section>

        <section className="contact-bottom">
          <div className="container contact-bottom-grid">
            <div className="contact-map-card"><div className="contact-map-grid" /><div className="contact-map-pin"><MapPin /><span>IRON CREST<br /><b>Lahore, Pakistan</b></span></div></div>
            <div className="contact-next"><span className="page-kicker">NOT SURE WHERE TO START?</span><h2>Begin with the <em>catalog.</em></h2><p>Explore the multi-brand excavator directory first, then return here with the model or application you have in mind.</p><a href="/excavators" className="btn btn-primary">Browse excavators <ArrowRight size={15} /></a></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
