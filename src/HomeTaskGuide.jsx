import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Construction, Wrench } from 'lucide-react';
import LocationLink from './LocationLink.jsx';
import './home-task-guide.css';

const tasks = [
  {
    id: 'equipment',
    icon: Construction,
    label: 'Find an excavator',
    hint: 'Browse brands and machine classes',
    title: 'Find the right model',
    steps: [
      ['Pick a machine class', 'Start with the job and space available.'],
      ['Shortlist models', 'Filter by brand or search by model name.'],
      ['Confirm the details', 'Ask about configuration and availability.'],
    ],
    href: '/excavators',
    action: 'View catalog',
  },
  {
    id: 'support',
    icon: Wrench,
    label: 'Get parts or service',
    hint: 'Prepare a machine support request',
    title: 'Prepare a service request',
    steps: [
      ['Identify your machine', 'Find the model and serial number if available.'],
      ['Describe what you need', 'Share a part number or describe the issue.'],
      ['Send your enquiry', 'Tell the service team how to contact you.'],
    ],
    href: '/contact-us?type=service#equipment-enquiry',
    action: 'Contact the service team',
  },
  {
    id: 'guides',
    icon: BookOpen,
    label: 'Read a guide',
    hint: 'Get ready for your next enquiry',
    title: 'Choose a guide',
    steps: [
      ['Machine selection', 'Plan around site access and digging needs.'],
      ['Maintenance planning', 'Prepare a checklist for your fleet.'],
      ['Project enquiries', 'Gather the details the equipment team will ask for.'],
    ],
    href: '/resources',
    action: 'View all guides',
  },
];

export default function HomeTaskGuide({ onRequestCatalog }) {
  const [taskId, setTaskId] = useState(() => window.location.hash === '#support' ? 'support' : 'equipment');
  const task = tasks.find(item => item.id === taskId);

  useEffect(() => {
    const selectSupport = () => {
      if (window.location.hash === '#support') setTaskId('support');
    };
    window.addEventListener('hashchange', selectSupport);
    return () => window.removeEventListener('hashchange', selectSupport);
  }, []);

  return (
    <div className="home-task-guide container" id="resources">
      <section className="task-guide-choice" aria-labelledby="task-guide-title">
        <img src="/images/industry-infrastructure.webp" alt="" loading="lazy" width="1672" height="941" />
        <div className="task-guide-choice__content">
          <h2 id="task-guide-title">What do you need?</h2>
          <div className="task-guide-options" role="group" aria-label="Equipment and support options">
            {tasks.map(({ id, icon: Icon, label, hint }) => (
              <button
                key={id}
                id={id === 'support' ? 'support' : undefined}
                type="button"
                aria-pressed={taskId === id}
                aria-controls="task-guide-steps"
                onClick={() => setTaskId(id)}
              >
                <Icon size={20} aria-hidden="true" />
                <span><strong>{label}</strong><small>{hint}</small></span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="task-guide-steps" id="task-guide-steps" aria-labelledby="task-guide-step-title">
        <h2 id="task-guide-step-title" aria-live="polite">{task.title}</h2>
        <ol>
          {task.steps.map(([title, description]) => (
            <li key={title}><strong>{title}</strong><p>{description}</p></li>
          ))}
        </ol>
        <div className="task-guide-actions">
          <a className="btn btn-primary" href={task.href}>{task.action} <ArrowRight size={16} aria-hidden="true" /></a>
          {taskId === 'equipment' && <button className="task-guide-request" type="button" onClick={onRequestCatalog}>Request a copy</button>}
        </div>
      </section>

      <section className="task-guide-help" aria-labelledby="task-guide-help-title">
        <div>
          <h2 id="task-guide-help-title">Need a hand deciding?</h2>
          <p>Share the job, location and timeline with our team.</p>
        </div>
        <a className="btn btn-primary" href="/contact-us?type=project#equipment-enquiry">
          Ask for equipment advice <ArrowRight size={16} aria-hidden="true" />
        </a>
      </section>
      <LocationLink showMapLabel />
    </div>
  );
}
