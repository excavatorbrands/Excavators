import { ArrowRight, Minus, Plus } from 'lucide-react';
import './equipment-faqs.css';

const catalogQuestions = [
  ['How do I choose an excavator class?', 'Start with the job, site access, digging depth, material and attachments. Use the machine class filter to build a shortlist, then check the specifications of each model.'],
  ['What should I compare between models?', 'Open each product page and compare operating weight, engine power, bucket capacity and attachment requirements. Ask for the specification sheets for the exact configurations you are considering.'],
  ['Does a catalog listing mean the machine is in stock?', 'Check the availability label on the listing. If it says “Needs confirmation”, ask the Iron Crest team to verify current stock and lead time for that model.'],
];

function FAQSection({ title, questions }) {
  return (
    <section className="equipment-faqs" aria-labelledby="equipment-faqs-title">
      <div className="equipment-faqs__intro">
        <h2 id="equipment-faqs-title">{title}</h2>
        <a href="/resources#resource-faqs">More FAQs <ArrowRight size={15} aria-hidden="true" /></a>
      </div>
      <div className="equipment-faqs__list">
        {questions.map(([question, answer]) => (
          <details className="equipment-faqs__item" key={question}>
            <summary>
              <span>{question}</span>
              <Plus className="equipment-faqs__plus" size={18} aria-hidden="true" />
              <Minus className="equipment-faqs__minus" size={18} aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function CatalogFAQs() {
  return <FAQSection title="Excavator catalog FAQs" questions={catalogQuestions} />;
}

export function ModelFAQs({ model }) {
  const name = `${model.brandName} ${model.model}`;
  const questions = [
    [`How do I confirm the exact specifications for the ${name}?`, 'Use the quote form to request a verified specification sheet. Include your market and the configuration you need, since machine specifications can vary.'],
    ['How do I check which attachments fit?', 'Share the attachment type and your intended application. If you already have the attachment, include its make and model so the team can check the coupler, hydraulic requirements and operating limits.'],
    ['What should I include in a quote request?', 'Include the job location, preferred configuration, any attachments and your expected timeline. The team can use those details to confirm pricing, availability and delivery options.'],
    ['What happens after I request a booking?', 'The team reviews your enquiry and confirms availability and terms. A booking request starts that conversation. Any reservation depends on confirmation from Iron Crest.'],
  ];
  return <FAQSection title="Model FAQs" questions={questions} />;
}
