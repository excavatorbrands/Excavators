import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Gauge, Package, Truck } from 'lucide-react';
import { modelPrice, modelUrl } from './catalogLinks.js';
import './home-brand-showcase.css';

function BrandShowcase({ brand, brandModels, reverse, compareIds, onCompare }) {
  const [selectedModelId, setSelectedModelId] = useState(null);
  const index = Math.max(0, brandModels.findIndex((model) => model.id === selectedModelId));
  const model = brandModels[index];
  const hasMultipleModels = brandModels.length > 1;
  const inCompare = compareIds.includes(model.id);

  function changeModel(direction) {
    const next = (index + direction + brandModels.length) % brandModels.length;
    setSelectedModelId(brandModels[next].id);
  }

  const specs = [
    { label: 'Engine power', value: model.power, Icon: Gauge },
    { label: 'Operating weight', value: model.weight, Icon: Truck },
    { label: 'Bucket capacity', value: model.bucket, Icon: Package },
  ];

  return (
    <section
      className={`brand-showcase model-click-surface${reverse ? ' brand-showcase--reverse' : ''}`}
      aria-labelledby={`showcase-${brand.id}`}
    >
      <figure className="brand-showcase__product-image">
        <img src={model.image} alt={`Illustration of the ${model.type.toLowerCase()} machine class`} loading="lazy" decoding="async" />
      </figure>

      <div className="brand-showcase__product">
        <div className="brand-showcase__body">
          {brand.logo && (
            <img className="brand-showcase__logo" src={brand.logo} alt="" loading="lazy" decoding="async" />
          )}
          <h3 className="brand-showcase__brand" id={`showcase-${brand.id}`} tabIndex={-1}>{brand.name}</h3>

          <div aria-live="polite" aria-atomic="true">
            <p className="brand-showcase__position">{index + 1} of {brandModels.length} models</p>
            <h4>{model.model}</h4>
            <p className="brand-showcase__type">{model.type} · {modelPrice(model)}</p>
          </div>

          <dl className="brand-showcase__specs">
            {specs.map(({ label, value, Icon }) => (
              <div key={label}>
                <dt><Icon size={15} aria-hidden="true" />{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="brand-showcase__footer">
            <div className="brand-showcase__actions">
              <a className="btn btn-primary model-click-target" href={modelUrl(model)} aria-label={`View ${model.brandName} ${model.model} details`}>
                View details <ArrowRight size={16} aria-hidden="true" />
              </a>
              <button
                type="button"
                className="brand-showcase__compare"
                aria-pressed={inCompare}
                onClick={() => onCompare(model)}
              >
                {inCompare && <Check size={15} aria-hidden="true" />}
                {inCompare ? 'Added to compare' : 'Compare'}
              </button>
            </div>
            <div className="brand-showcase__step">
              <button type="button" onClick={() => changeModel(-1)} disabled={!hasMultipleModels} aria-label={`Previous ${brand.name} model`}>
                <ChevronLeft size={19} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => changeModel(1)} disabled={!hasMultipleModels} aria-label={`Next ${brand.name} model`}>
                <ChevronRight size={19} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeBrandShowcases({ brands, models, showAll, compareIds, onCompare }) {
  const [expanded, setExpanded] = useState(false);
  const additionalBrandsId = useId();
  const additionalBrands = useRef(null);
  const toggle = useRef(null);
  const focusAfterToggle = useRef(false);
  const groups = brands.map((brand) => ({
    brand,
    brandModels: models.filter((model) => model.brand === brand.id),
  })).filter(({ brandModels }) => brandModels.length > 0);
  const featured = showAll ? groups : groups.slice(0, 3);
  const remaining = groups.slice(featured.length);

  useEffect(() => {
    if (!focusAfterToggle.current) return;
    focusAfterToggle.current = false;
    const target = expanded ? additionalBrands.current?.querySelector('h3') : toggle.current;
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ block: 'nearest' });
  }, [expanded]);

  const renderShowcase = ({ brand, brandModels }, index) => (
    <BrandShowcase
      key={brand.id}
      brand={brand}
      brandModels={brandModels}
      reverse={index % 2 === 1}
      compareIds={compareIds}
      onCompare={onCompare}
    />
  );

  return (
    <div className="brand-showcase-list">
      {featured.map(renderShowcase)}
      {remaining.length > 0 && (
        <>
          <div id={additionalBrandsId} ref={additionalBrands} hidden={!expanded}>
            <div className="brand-showcase-list">
              {remaining.map((group, index) => renderShowcase(group, featured.length + index))}
            </div>
          </div>
          <button
            type="button"
            className="brand-showcase-more"
            ref={toggle}
            aria-controls={additionalBrandsId}
            aria-expanded={expanded}
            onClick={() => {
              focusAfterToggle.current = true;
              setExpanded((open) => !open);
            }}
          >
            {expanded ? 'Show fewer brands' : `See more brands (${remaining.length})`}
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}
