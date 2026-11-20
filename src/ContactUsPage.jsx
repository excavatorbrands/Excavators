import { Header, Footer } from './Chrome.jsx';
import ContactPage from './ContactPage.jsx';
import ResourcesPage from './ResourcesPage.jsx';
import AboutPage from './AboutPage.jsx';
import './pages.css';

export default function ContactUsPage() {
  return (
    <div className="inner-page contact-us-combined">
      <Header active="contact us" />
      <ContactPage embedded />
      <ResourcesPage embedded />
      <AboutPage embedded />
      <Footer />
    </div>
  );
}
