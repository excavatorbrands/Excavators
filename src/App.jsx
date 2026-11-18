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

export default function App() {
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
