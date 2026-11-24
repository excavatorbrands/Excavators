import { useState } from 'react';
import {
  ArrowRight, ChevronRight, Mail, MapPin,
  MessageSquare, Phone, Send, ShieldCheck,
} from 'lucide-react';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { submitEnquiry } from './submitEnquiry.js';
import './pages.css';

export default function ContactPage({ embedded = false }) {
  const [submissionNotice, setSubmissionNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const requestedType = params.get('type');
  const enquiryType = ['equipment', 'parts', 'service', 'project', 'warranty', 'resource', 'other'].includes(requestedType) ? requestedType : 'equipment';
  const context = params.get('model') || params.get('brand') || params.get('resource') || '';
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setSubmissionNotice('');
    try {
      await submitEnquiry(Object.fromEntries(new FormData(form).entries()));
      form.reset();
      setSubmissionNotice('Thank you. Your enquiry has been sent to the Iron Crest team.');
    } catch {
      setSubmissionNotice('We could not send your enquiry. Your details remain in this form. Please email sales@ironcrest.com or call +92 300 1234567.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="inner-page contact-page" id={embedded ? "contact-information" : undefined}>
      {!embedded && <Header active="contact us" />}
      <main>
        <section className="contact-hero">
          <div className="container contact-hero-inner">
            <div className="page-breadcrumb"><a href="/">Home</a><ChevronRight size={13} /><b>Contact</b></div>
            <div className="contact-hero-copy"><span className="page-kicker">LET'S TALK EQUIPMENT</span><h1>YOUR PROJECT.<br /><em>OUR NEXT CONVERSATION.</em></h1><p>Send an equipment or support enquiry to the Iron Crest team, or contact us directly by phone or email.</p></div>
          </div>
          <div className="contact-hero-side"><span>CONTACT<br />IRON CREST</span><strong>IC</strong><small>CALL OR EMAIL<br />OUR TEAM</small></div>
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
              </div>
              <div className="contact-assurance"><ShieldCheck size={19} /><span><b>Clear information first.</b> Exact machine configuration, availability and technical data should be verified before purchase.</span></div>
            </div>

            <div className="contact-form-card">
                  <div className="contact-form-head"><div><span className="page-kicker">SEND AN ENQUIRY</span><h2>What can we <em>help with?</em></h2></div><MessageSquare size={26} /></div>
                  <form onSubmit={handleSubmit}>
                    <label className="form-honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex="-1" autoComplete="off" /></label>
                    <div className="contact-form-row"><label>Full name<input name="name" required placeholder="Your name" /></label><label>Company<input name="company" placeholder="Company name" /></label></div>
                    <div className="contact-form-row"><label>Email<input name="email" required type="email" placeholder="you@company.com" /></label><label>Phone<input name="phone" required type="tel" placeholder="+92 ..." /></label></div>
                    <label>Enquiry type<select name="type" defaultValue={enquiryType}><option value="equipment">Equipment / excavator</option><option value="parts">Parts request</option><option value="service">Service support</option><option value="project">Project consultation</option><option value="warranty">Warranty enquiry</option><option value="resource">Resource request</option><option value="other">Other</option></select></label>
                    <label>Project / requirement details<textarea name="message" required rows="5" defaultValue={context ? `Regarding ${context}: ` : ''} placeholder="Tell us the machine, application, location and timeline..."></textarea></label>
                    <button className="btn btn-primary contact-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send enquiry'} <Send size={15} /></button>
                    <small className="contact-form-note">Your enquiry will be sent to Iron Crest by email. Please do not include sensitive personal information.</small>
                    {submissionNotice && <p className={`contact-form-note ${submissionNotice.startsWith('Thank you') ? 'contact-form-success' : 'contact-form-unavailable'}`} role={submissionNotice.startsWith('Thank you') ? 'status' : 'alert'}>{submissionNotice}</p>}
                  </form>
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
      {!embedded && <Footer />}
    </div>
  );
}
