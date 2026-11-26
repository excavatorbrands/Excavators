import { useState } from 'react';
import {
  ArrowRight, Mail, Phone, Send,
} from 'lucide-react';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { enquiryLabels } from './catalogLinks.js';
import { submitEnquiry } from './submitEnquiry.js';
import LocationLink from './LocationLink.jsx';
import './pages.css';

export default function ContactPage({ embedded = false }) {
  const [submissionNotice, setSubmissionNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const requestedType = params.get('type');
  const enquiryType = ['equipment', 'parts', 'service', 'project', 'warranty', 'resource', 'other'].includes(requestedType) ? requestedType : 'equipment';
  const intent = params.get('intent');
  const action = Object.hasOwn(enquiryLabels, intent) ? enquiryLabels[intent] : '';
  const context = params.get('model') || params.get('brand') || params.get('resource') || '';
  const interest = [action, context].filter(Boolean).join(' — ').slice(0, 160);
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
  const Content = embedded ? 'section' : 'main';

  return (
    <div className="inner-page contact-page project-brief">
      {!embedded && <Header active="contact us" />}
      <Content id="contact-information" aria-labelledby="project-brief-title">
        <div className="container project-brief__content">
          <header className="project-brief__hero">
            <img src="/images/industry-infrastructure.webp" alt="" fetchPriority="high" />
            <div className="project-brief__hero-copy">
              <h1 id="project-brief-title">Tell us about your project</h1>
              <p>Share your site, application and timeline so we can discuss the right equipment, parts, or support.</p>
              <a className="btn btn-primary" href="#equipment-enquiry">Start an enquiry <ArrowRight size={16} aria-hidden="true" /></a>
            </div>
          </header>

          <div className="project-brief__layout">
            <section className="project-brief__panel" id="equipment-enquiry" aria-labelledby="project-brief-form-title">
              <h2 id="project-brief-form-title">Send an enquiry</h2>
              <form className="project-brief__form" onSubmit={handleSubmit}>
                {interest && <p className="equipment-enquiry-context">{interest}<input type="hidden" name="interest" value={interest} /></p>}
                <label className="form-honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex="-1" autoComplete="off" /></label>
                <div className="project-brief__fields">
                  <label>Full name<input name="name" autoComplete="name" required /></label>
                  <label>Company (optional)<input name="company" autoComplete="organization" /></label>
                  <label>Email<input name="email" autoComplete="email" required type="email" /></label>
                  <label>Phone<input name="phone" autoComplete="tel" required type="tel" /></label>
                </div>
                <label>
                  Enquiry type
                  <select name="type" defaultValue={enquiryType}>
                    <option value="equipment">Equipment / excavator</option>
                    <option value="parts">Parts request</option>
                    <option value="service">Service support</option>
                    <option value="project">Project consultation</option>
                    <option value="warranty">Warranty enquiry</option>
                    <option value="resource">Resource request</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label>
                  Project details
                  <textarea name="message" required rows="5" defaultValue={interest ? `${interest}: ` : ''} placeholder="Machine, job site and timeline" />
                </label>
                <button className="btn btn-primary project-brief__send" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Send enquiry'} <Send size={16} aria-hidden="true" />
                </button>
                <small>We send your enquiry to the Iron Crest team by email.</small>
                {submissionNotice && (
                  <p className={`project-brief__notice${submissionNotice.startsWith('Thank you') ? ' is-success' : ''}`} role={submissionNotice.startsWith('Thank you') ? 'status' : 'alert'}>
                    {submissionNotice}
                  </p>
                )}
              </form>
            </section>

            <aside className="project-brief__panel project-brief__direct" aria-labelledby="project-brief-contact-title">
              <h2 id="project-brief-contact-title">Contact details</h2>
              <dl>
                <div><dt><Phone size={16} aria-hidden="true" /> Phone</dt><dd><a href="tel:+923001234567">+92 300 1234567</a></dd></div>
                <div><dt><Mail size={16} aria-hidden="true" /> Email</dt><dd><a href="mailto:sales@ironcrest.com">sales@ironcrest.com</a></dd></div>
                <div><dt>Location</dt><dd><LocationLink showMapLabel /></dd></div>
              </dl>
              <div className="project-brief__catalog">
                <h3>Still narrowing your shortlist?</h3>
                <p>Browse manufacturers and compare machine classes before sending your project brief.</p>
                <a href="/excavators">Browse excavators <ArrowRight size={15} aria-hidden="true" /></a>
              </div>
            </aside>
          </div>
        </div>
      </Content>
      {!embedded && <Footer />}
    </div>
  );
}
