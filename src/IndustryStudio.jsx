import { useEffect, useId, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { industries } from './data.js';
import './industry-studio.css';

const profiles = {
  Construction: {
    id: 'construction',
    description: 'Choose equipment for foundations, utilities, and site preparation based on your digging depth, access, and job volume.',
    applications: ['Foundation excavation', 'Utility trenches', 'Site preparation'],
  },
  'Mining & Quarry': {
    id: 'mining-quarry',
    description: 'Match heavy excavators to the material, loading cycle, and operating conditions of the mine or quarry.',
    applications: ['Overburden removal', 'Bench preparation', 'Bulk material loading'],
  },
  'Road & Infrastructure': {
    id: 'road-infrastructure',
    description: 'Plan excavation around access, reach, and site constraints for roads, drainage, bridges, and utility corridors.',
    applications: ['Road formation', 'Drainage works', 'Utility corridors'],
  },
  'Urban Development': {
    id: 'urban-development',
    description: 'Choose compact or short-tail equipment for busy sites where surrounding structures and restricted access shape the work.',
    applications: ['Restricted access', 'Basement excavation', 'Urban utilities'],
  },
  'Material Handling': {
    id: 'material-handling',
    description: 'Match the machine and attachment to the materials you need to sort, move, or load.',
    applications: ['Stockpile handling', 'Loading operations', 'Material sorting'],
  },
  Demolition: {
    id: 'demolition',
    description: 'Plan the machine, reach, and attachments around the structure and the requirements for controlled site clearance.',
    applications: ['Structure removal', 'Debris separation', 'Site clearance'],
  },
};

const applications = industries.map((industry) => ({ ...industry, ...profiles[industry.title] }));

function IndustryMedia({ industry }) {
  const [videoAvailable, setVideoAvailable] = useState(false);
  const videoUrl = `/videos/industries/${industry.id}.mp4`;

  useEffect(() => {
    const controller = new AbortController();

    // Static files take priority, but the SPA fallback can return HTML for a missing clip.
    async function checkForClip() {
      try {
        const response = await fetch(videoUrl, { method: 'HEAD', signal: controller.signal });
        const contentType = response.headers.get('content-type') ?? '';
        if (response.ok && /^video\//i.test(contentType) && !controller.signal.aborted) {
          setVideoAvailable(true);
        }
      } catch {
        // Keep the industry poster available when the clip has not been uploaded.
      }
    }

    checkForClip();
    return () => controller.abort();
  }, [videoUrl]);

  return (
    <div className="industry-studio__media">
      {videoAvailable ? (
        <video
          controls
          playsInline
          preload="none"
          poster={industry.image}
          aria-label={`${industry.title} application video`}
          src={videoUrl}
          onError={() => setVideoAvailable(false)}
        />
      ) : (
        <img src={industry.image} alt={`Illustrative equipment for ${industry.title.toLowerCase()}`} loading="lazy" decoding="async" />
      )}
    </div>
  );
}

export default function IndustryStudio({ fullPage = false }) {
  const headingId = useId();
  const panelId = useId();
  const [active, setActive] = useState(() => {
    const requested = fullPage ? new URLSearchParams(window.location.search).get('industry') : null;
    return applications.find((industry) => industry.title === requested || industry.id === requested) ?? applications[0];
  });
  const actionUrl = fullPage ? '/excavators' : `/solutions?industry=${encodeURIComponent(active.title)}#solution-selector`;

  return (
    <section className="industry-studio" id={fullPage ? 'solution-selector' : 'solutions'} aria-labelledby={headingId}>
      <div className="container">
        <div className="industry-studio__heading">
          <h2 id={headingId}>Built for every industry</h2>
          <p>Select an industry to explore excavator applications.</p>
        </div>
        <div className="industry-studio__tabs" role="group" aria-label="Select an industry">
          {applications.map((industry) => (
            <button
              key={industry.id}
              type="button"
              aria-pressed={active.id === industry.id}
              aria-controls={panelId}
              onClick={() => setActive(industry)}
            >
              {industry.title}
            </button>
          ))}
        </div>
        <div className="industry-studio__layout" id={panelId}>
          <IndustryMedia key={active.id} industry={active} />
          <div className="industry-studio__profile">
            <div aria-live="polite" aria-atomic="true">
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              <ul>
                {active.applications.map((application) => (
                  <li key={application}><Check size={16} aria-hidden="true" />{application}</li>
                ))}
              </ul>
            </div>
            <a className="btn btn-primary" href={actionUrl}>
              {fullPage ? 'Browse excavators' : 'Explore solutions'} <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
