import { ChevronRight, Scale } from 'lucide-react';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import './legal.css';

const sections = [
  {
    title: 'Scope of These Website Terms',
    paragraphs: [
      'These Terms & Conditions (“Terms”) apply to your access to and use of the Iron Crest Excavator Solutions website. By using the website, you agree to these Terms. If you do not agree, please do not use the website.',
      'These Terms govern website use only. Any sale, lease, supply, service or other transaction is subject to its own written quotation, order confirmation, purchase contract and applicable equipment warranty, as relevant.',
    ],
  },
  {
    title: 'Acceptance of Terms',
    paragraphs: [
      'By accessing or browsing this website, you confirm that you have read and understood these Terms and will comply with them and applicable law. If you use the website on behalf of an organization, you confirm that you are authorized to accept these Terms for that organization.',
    ],
  },
  {
    title: 'Website Usage',
    paragraphs: [
      'You may use the website for lawful, legitimate purposes, including learning about equipment, services and Iron Crest, and contacting us with genuine enquiries. You are responsible for ensuring that your use is lawful in the place where you access the website.',
    ],
  },
  {
    title: 'Permitted and Prohibited Activities',
    paragraphs: [
      'You may view, print or share reasonable portions of website content for personal or internal business reference, provided you do not remove proprietary notices or misrepresent the material.',
      'You must not misuse the website, interfere with its operation or security, attempt unauthorized access, introduce malicious code, scrape or harvest information by automated means without permission, infringe another person’s rights, or use the website to send unlawful, misleading or harmful material.',
    ],
  },
  {
    title: 'Product Information',
    paragraphs: [
      'Product descriptions, images, brand names, model references and other website content are provided for general information and comparison. Some information may be supplied by manufacturers or other sources. It may be incomplete, illustrative, translated, or subject to change without notice.',
      'Website information is not a binding offer to sell and does not form part of a sales agreement unless expressly incorporated into a written agreement signed or accepted by the relevant parties.',
    ],
  },
  {
    title: 'Equipment Specifications',
    paragraphs: [
      'Specifications, dimensions, operating weights, configurations, attachments, features and performance information may vary by model year, market, production series and selected options. Images may show optional equipment or a configuration different from the one available in your market.',
      'Confirm the exact machine, configuration, compliance requirements and current manufacturer documentation with Iron Crest before making a purchase or operational decision. The final written quotation and sales contract control over general website information.',
    ],
  },
  {
    title: 'Pricing and Quotations',
    paragraphs: [
      'Any prices, estimates, financing references, delivery information or other commercial indications shown on the website are informational only unless expressly stated otherwise in a written quotation. They may exclude taxes, duties, transport, preparation, attachments or other charges, depending on the transaction and destination.',
      'A quotation is subject to its stated validity period, conditions and acceptance process. Only the terms of the applicable written quotation and final sales agreement establish the parties’ commercial obligations.',
    ],
  },
  {
    title: 'Product Availability',
    paragraphs: [
      'Listings and descriptions do not guarantee that a machine, part or service is currently available in a particular location. Availability, lead times and delivery arrangements must be confirmed with Iron Crest and recorded in the applicable transaction documents.',
    ],
  },
  {
    title: 'Enquiries and Communications',
    paragraphs: [
      'Submitting an enquiry does not create a contract, reserve equipment or guarantee a response within a particular time. Please ensure the contact details and information you provide are accurate and that you are authorized to share them.',
      'Any proposals, confirmations or commitments relating to a transaction must be made through the authorized representatives and documents designated for that transaction.',
    ],
  },
  {
    title: 'Intellectual Property Rights',
    paragraphs: [
      'Unless otherwise indicated, website design, text, graphics and original materials are owned by or used with permission by Iron Crest and are protected by applicable intellectual property laws. You may not reproduce, adapt, distribute or commercially exploit them without prior permission, except as allowed by law.',
      'Third-party names, logos and product marks belong to their respective owners. Their appearance on this website does not, by itself, imply endorsement, sponsorship or affiliation.',
    ],
  },
  {
    title: 'Third-Party Links',
    paragraphs: [
      'Links to third-party websites are provided for convenience. Iron Crest does not control and is not responsible for third-party content, availability, products, services or privacy practices. Accessing a linked website is at your discretion and subject to its terms.',
    ],
  },
  {
    title: 'Limitation of Liability',
    paragraphs: [
      'To the extent permitted by applicable law, Iron Crest will not be liable for indirect, incidental, special, consequential or punitive loss, or loss of profits, revenue, business opportunity, data or goodwill arising from or related to use of, or inability to use, this website.',
      'Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited. This section concerns website use only and does not replace the liability terms in a separate signed or accepted sales, service or purchase agreement.',
    ],
  },
  {
    title: 'Disclaimer of Warranties',
    paragraphs: [
      'The website and its content are provided on an “as available” and informational basis. To the extent permitted by law, Iron Crest disclaims warranties relating to uninterrupted availability, accuracy, completeness, fitness for a particular purpose and non-infringement.',
      'This website disclaimer does not create, change or remove any manufacturer warranty or equipment warranty. Warranty coverage, exclusions and claim procedures are governed only by the applicable written warranty and transaction documents.',
    ],
  },
  {
    title: 'Indemnification',
    paragraphs: [
      'To the extent permitted by applicable law, you agree to be responsible for third-party claims and reasonable costs arising directly from your unlawful use of the website, your material breach of these Terms, or your infringement of another person’s rights. This does not apply to the extent a claim results from Iron Crest’s own acts or omissions.',
    ],
  },
  {
    title: 'Changes to These Terms',
    paragraphs: [
      'We may revise these Terms from time to time by publishing an updated version on this page. The “Last updated” date indicates when the current version was published. Changes apply to website use from the time they are posted, subject to applicable law. Separate transaction agreements are changed only as provided in those agreements.',
    ],
  },
  {
    title: 'Governing Law',
    paragraphs: [
      'The governing law and courts for these website Terms have not yet been confirmed by Iron Crest. These Terms should not be treated as final or published as complete until the applicable law and jurisdiction have been confirmed with legal advisers and stated here. No jurisdiction is assumed based on the website’s location or contact details.',
    ],
  },
  {
    title: 'Questions About These Terms',
    paragraphs: [
      'Questions about these Terms may be sent to Iron Crest Excavator Solutions at sales@ironcrest.com or +92 300 1234567. A verified registered entity name and postal address have not yet been provided; add them here if required by applicable law before publication.',
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <div className="inner-page legal-page terms-page">
      <Header />
      <main>
        <section className="terms-hero">
          <div className="container terms-hero-inner">
            <div className="page-breadcrumb"><a href="/">Home</a><ChevronRight size={13} /><b>Terms &amp; Conditions</b></div>
            <div className="terms-hero-content">
              <div className="terms-hero-copy">
                <span className="page-kicker">WEBSITE TERMS OF USE</span>
                <h1>Terms &amp; <br /><em>Conditions</em></h1>
                <p>The rules that apply when using the Iron Crest website — with a clear distinction between online information and transaction documents.</p>
              </div>
              <div className="terms-document-stamp"><Scale size={23} /><span>LEGAL<br />DOCUMENT</span><b>IC / T&amp;C</b></div>
            </div>
            <div className="terms-updated"><span>LAST UPDATED</span><strong>November 18, 2026</strong></div>
          </div>
        </section>

        <section className="terms-document">
          <div className="container">
            <div className="terms-document-heading"><span>IRON CREST EXCAVATOR SOLUTIONS</span><p>Website terms &amp; conditions</p></div>
            <div className="terms-notice"><Scale size={18} /><p><strong>Website information is not a sales contract.</strong> Quotations, purchases, equipment warranties and service agreements are governed by their own applicable written documents.</p></div>
            <div className="terms-sections">
              {sections.map((section, index) => (
                <section className="terms-section" id={`terms-${index + 1}`} key={section.title}>
                  <div className="terms-section-number">{String(index + 1).padStart(2, '0')}<span> / {String(sections.length).padStart(2, '0')}</span></div>
                  <div className="terms-section-body"><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                  {index === 0 && <div className="terms-margin-note">PLEASE READ<br />BEFORE USE</div>}
                </section>
              ))}
            </div>
            <div className="terms-closing"><span>IRON CREST / LEGAL</span><p>Thank you for taking the time to review these Terms.</p></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
