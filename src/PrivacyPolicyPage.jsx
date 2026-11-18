import { ChevronRight, ShieldCheck } from 'lucide-react';
import { Header, Footer } from './Chrome.jsx';
import './legal.css';

const sections = [
  {
    title: 'Introduction',
    paragraphs: [
      'This Privacy Policy explains how Iron Crest Excavator Solutions (“Iron Crest”, “we”, “us” or “our”) handles information when you visit this website or contact us through it. We aim to handle personal information responsibly and use it only in ways consistent with this policy and applicable law.',
      'This policy applies to this website. It does not replace any separate privacy notice or terms that may apply to a particular transaction, service or business relationship.',
    ],
  },
  {
    title: 'Information We Collect',
    paragraphs: [
      'The information involved depends on how you use the website. It may include information you choose to send us and limited technical information generated when a browser requests website content. Please avoid sending sensitive personal information unless it is necessary for your enquiry.',
    ],
  },
  {
    title: 'Information You Provide',
    paragraphs: [
      'If you contact us or submit an enquiry, you may provide details such as your name, business name, email address, telephone number, country or region, and the equipment or support you are interested in. The website may also receive the content of your message and any files you choose to attach.',
      'Providing information is optional, but we may be unable to respond to an enquiry if the information needed to do so is not supplied.',
    ],
  },
  {
    title: 'Information Collected Automatically',
    paragraphs: [
      'Like most websites, the server or hosting environment may process technical data needed to deliver and protect the site. Depending on the configuration in use, this may include an IP address, browser and device details, pages requested, referring page, and the date and time of a request. We do not represent that every category is collected or retained.',
    ],
  },
  {
    title: 'How We Use Your Information',
    paragraphs: [
      'We may use information you provide to respond to questions, follow up on equipment or service enquiries, provide information you request, operate and maintain the website, help protect its security, and meet legal obligations. We use technical information, where available, to diagnose errors and understand basic website performance.',
      'We do not use information for a purpose that is incompatible with the context in which it was provided, unless permitted by applicable law or explained to you at the time.',
    ],
  },
  {
    title: 'Cookies and Similar Technologies',
    paragraphs: [
      'This website may use cookies or similar technologies where they are required for website functionality, security or preferences. The technologies actually in use depend on the site and hosting configuration. We do not claim that advertising cookies or tracking technologies are used.',
      'You can manage cookies through your browser settings. Disabling certain cookies may affect website functionality. If optional cookies are introduced, this policy and any required consent controls should be updated accordingly.',
    ],
  },
  {
    title: 'Website Analytics',
    paragraphs: [
      'The website may be configured to use analytics tools to understand aggregate site use. No specific analytics provider or service is represented as being in use by this policy. If analytics tools are enabled, the applicable provider, information processed, controls and consent requirements should be identified here: [Add details of any analytics tools actually in use, or state that none are used].',
    ],
  },
  {
    title: 'Sharing of Information',
    paragraphs: [
      'We do not sell personal information. Information may be made available to service providers involved in hosting, maintaining or securing the website, where such access is necessary for their work and permitted by applicable law. We may also disclose information when required by law, to protect rights and safety, or in connection with a business transfer, subject to applicable requirements.',
      'The providers, locations and arrangements depend on the services actually engaged by Iron Crest. This policy does not assert that any particular third-party service or data-sharing partner is used.',
    ],
  },
  {
    title: 'Data Security',
    paragraphs: [
      'We take reasonable measures appropriate to the information and circumstances to help protect information from unauthorized access, alteration, disclosure or loss. No website or method of transmission can be guaranteed completely secure. Please contact us promptly if you believe information sent through this website has been exposed or misused.',
    ],
  },
  {
    title: 'Data Retention',
    paragraphs: [
      'We retain information only for as long as reasonably necessary for the purposes described in this policy, including responding to enquiries, maintaining business records, resolving disputes and meeting legal requirements. Retention periods depend on the type of information and the reason it was collected.',
    ],
  },
  {
    title: 'Your Privacy Rights',
    paragraphs: [
      'Depending on where you live and the law that applies, you may have rights to request access to, correction or deletion of personal information, to object to or restrict certain processing, or to withdraw consent where processing relies on consent. These rights may be subject to exceptions and verification requirements.',
      'To make a privacy request, contact us using the details below and describe your request and the country or region relevant to it. We will handle the request in accordance with applicable law.',
    ],
  },
  {
    title: 'Third-Party Websites',
    paragraphs: [
      'This website may link to websites or services operated by others. Their privacy practices are governed by their own notices, not this policy. Review those notices before providing information to a third party.',
    ],
  },
  {
    title: 'Children’s Privacy',
    paragraphs: [
      'This website is intended for business and general audiences, not for children. We do not knowingly seek personal information from children. If you believe a child has provided personal information to us, please contact us so that we can assess and address the matter.',
    ],
  },
  {
    title: 'International Visitors',
    paragraphs: [
      'Iron Crest serves an international audience. Depending on the website’s hosting and the location of our service providers, information may be processed in a country other than the country from which you access the site. Where required, appropriate safeguards will be applied to cross-border transfers.',
    ],
  },
  {
    title: 'Changes to This Privacy Policy',
    paragraphs: [
      'We may update this policy to reflect changes to the website, our practices or applicable requirements. The “Last updated” date at the top indicates when this version was published. Please review this page periodically for changes.',
    ],
  },
  {
    title: 'Contact Information',
    paragraphs: [
      'For privacy questions or requests, contact Iron Crest Excavator Solutions at sales@ironcrest.com or +92 300 1234567. A postal address and any formal privacy contact details should be added here if required: [Insert verified company contact or privacy-office details].',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="inner-page legal-page privacy-page">
      <Header />
      <main>
        <section className="privacy-hero">
          <div className="container privacy-hero-inner">
            <div className="page-breadcrumb"><a href="/">Home</a><ChevronRight size={13} /><b>Privacy Policy</b></div>
            <div className="privacy-hero-copy">
              <span className="page-kicker">INFORMATION &amp; PRIVACY</span>
              <h1>Privacy <em>Policy</em></h1>
              <p>A clear overview of how Iron Crest handles information when you visit our website or get in touch with our team.</p>
            </div>
            <div className="privacy-hero-meta"><ShieldCheck size={18} /><span>LAST UPDATED<strong>November 18, 2026</strong></span></div>
          </div>
        </section>

        <div className="privacy-document">
          <div className="container privacy-document-grid">
            <aside className="privacy-toc">
              <div className="privacy-toc-heading"><span>ON THIS PAGE</span><b>Policy index</b></div>
              <nav aria-label="Privacy policy sections">
                {sections.map((section, index) => (
                  <a key={section.title} href={`#privacy-${index + 1}`}><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</a>
                ))}
              </nav>
              <div className="privacy-toc-note"><ShieldCheck size={17} /><span>We aim to explain our information practices clearly and accurately.</span></div>
            </aside>
            <div className="privacy-article">
              <div className="privacy-intro-note"><span>OUR COMMITMENT</span><p>Your information matters. This policy describes our approach without assuming that particular tracking or analytics services are enabled.</p></div>
              {sections.map((section, index) => (
                <section className="privacy-section" id={`privacy-${index + 1}`} key={section.title}>
                  <div className="privacy-section-number">{String(index + 1).padStart(2, '0')}</div>
                  <div><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
