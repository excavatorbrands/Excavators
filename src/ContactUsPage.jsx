import { useEffect } from 'react';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import ContactPage from './ContactPage.jsx';
import ResourcesPage from './ResourcesPage.jsx';
import AboutPage from './AboutPage.jsx';
import './pages.css';
import './contact-project-brief.css';

export default function ContactUsPage() {
  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;
    document.getElementById(targetId)?.scrollIntoView();
  }, []);

  return (
    <div className="inner-page contact-us-combined project-brief-page">
      <Header active="contact us" />
      <main>
        <ContactPage embedded />
        <ResourcesPage embedded />
        <AboutPage embedded />
      </main>
      <Footer />
    </div>
  );
}
