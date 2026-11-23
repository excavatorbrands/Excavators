import {
  ArrowRight, Bell, Clock3, Cog, ShieldCheck, Wrench,
} from 'lucide-react';
import { Header } from './Chrome.jsx';
import './pages.css';

const launchBenefits = [
  { icon: <Cog />, title: <>Genuine<br />Spare Parts</> },
  { icon: <Wrench />, title: <>Expert<br />Service & Repair</> },
  { icon: <Clock3 />, title: <>Reliable<br />Support</> },
  { icon: <ShieldCheck />, title: <>Keep Your<br />Machine Running</> },
];

export default function PartsServicePage() {
  return (
    <div className="inner-page parts-page parts-coming-soon-page">
      <Header active="parts & service" />
      <main className="parts-coming-soon">
        <div className="parts-coming-soon-bg" aria-hidden="true" />
        <div className="parts-coming-soon-content">
          <div className="parts-coming-soon-heading">
            <div className="parts-coming-soon-mark"><Cog aria-hidden="true" /><Wrench aria-hidden="true" /></div>
            <div className="parts-coming-soon-title"><span />PARTS &amp; SERVICE<span /></div>
          </div>

          <div className="parts-coming-soon-sign" aria-label="Coming soon">
            <span>COMING SOON</span>
          </div>

          <p className="parts-coming-soon-subtitle">A dedicated Parts &amp; Service hub for your excavators.</p>

          <div className="parts-coming-soon-benefits">
            {launchBenefits.map((benefit, index) => (
              <div className="parts-coming-soon-benefit" key={index}>
                <div className="parts-coming-soon-benefit-icon">{benefit.icon}</div>
                <strong>{benefit.title}</strong>
              </div>
            ))}
          </div>

          <a className="parts-coming-soon-notify" href="/contact?type=parts">
            <Bell aria-hidden="true" />
            <strong>Notify Me</strong>
            <ArrowRight aria-hidden="true" />
          </a>
          <p className="parts-coming-soon-note">Be the first to know when our Parts &amp; Service page goes live.</p>
        </div>
      </main>
    </div>
  );
}
