import { useEffect } from 'react';
import HomePage from './Home.jsx';
import BrandsPage from './BrandsPage.jsx';
import ExcavatorsPage from './ExcavatorsPage.jsx';
import PartsServicePage from './PartsServicePage.jsx';
import SolutionsPage from './SolutionsPage.jsx';
import ResourcesPage from './ResourcesPage.jsx';
import AboutPage from './AboutPage.jsx';
import ContactPage from './ContactPage.jsx';
import PrivacyPolicyPage from './PrivacyPolicyPage.jsx';
import TermsAndConditionsPage from './TermsAndConditionsPage.jsx';

const rawPath = window.location.pathname;
const path = rawPath.length > 1 && rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;
const pageMetadata = {
  '/': ['Iron Crest | Excavator Solutions', 'Explore excavator brands, model examples, equipment solutions, parts and service support from Iron Crest.'],
  '/brands': ['Excavator Brands Directory | Iron Crest', 'Browse excavator brands and model examples in the Iron Crest manufacturer directory.'],
  '/excavators': ['Excavator Catalog | Iron Crest', 'Browse excavator model examples by manufacturer and machine class, and contact Iron Crest to confirm specifications and availability.'],
  '/parts-service': ['Parts & Service | Iron Crest', 'Explore excavator parts identification, maintenance planning and service support pathways from Iron Crest.'],
  '/solutions': ['Equipment Solutions | Iron Crest', 'Explore excavator applications for construction, mining, infrastructure, urban development, material handling and demolition.'],
  '/resources': ['Equipment Resources | Iron Crest', 'Explore equipment selection guides, planning resources and common excavator questions from Iron Crest.'],
  '/about': ['About Iron Crest | Excavator Solutions', 'Learn about the Iron Crest approach to multi-brand excavator selection, parts support and service enquiries.'],
  '/about-us': ['About Iron Crest | Excavator Solutions', 'Learn about the Iron Crest approach to multi-brand excavator selection, parts support and service enquiries.'],
  '/contact': ['Contact Iron Crest | Equipment Enquiries', 'Contact Iron Crest about excavators, parts, service support or project requirements.'],
  '/privacy-policy': ['Privacy Policy | Iron Crest', 'Read how Iron Crest handles information when you visit the website or contact the team.'],
  '/terms-and-conditions': ['Terms & Conditions | Iron Crest', 'Review the terms for using the Iron Crest website and how they differ from sales and equipment agreements.'],
};

export default function App() {
  useEffect(() => {
    const [title, description] = pageMetadata[path] || pageMetadata['/'];
    document.title = title;

    const setMeta = (selector, attribute, value, create) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement(create);
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    setMeta('meta[name="description"]', 'content', description, 'meta');
    setMeta('meta[property="og:title"]', 'content', title, 'meta');
    setMeta('meta[property="og:description"]', 'content', description, 'meta');
    setMeta('meta[property="og:type"]', 'content', 'website', 'meta');
    setMeta('meta[property="og:image"]', 'content', `${window.location.origin}/images/hero-quarry.webp`, 'meta');
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image', 'meta');
    setMeta('meta[name="twitter:title"]', 'content', title, 'meta');
    setMeta('meta[name="twitter:description"]', 'content', description, 'meta');

    const canonicalPath = path === '/about-us' ? '/about' : path || '/';
    setMeta('link[rel="canonical"]', 'href', `${window.location.origin}${canonicalPath}`, 'link');
  }, []);

  if (path === '/brands') return <BrandsPage />;
  if (path === '/excavators') return <ExcavatorsPage />;
  if (path === '/parts-service' || path === '/parts' || path === '/service') return <PartsServicePage />;
  if (path === '/solutions') return <SolutionsPage />;
  if (path === '/resources') return <ResourcesPage />;
  if (path === '/about' || path === '/about-us') return <AboutPage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/privacy-policy') return <PrivacyPolicyPage />;
  if (path === '/terms-and-conditions') return <TermsAndConditionsPage />;
  return <HomePage />;
}
