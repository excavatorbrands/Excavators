import { useState } from 'react';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Gauge, Package, Truck } from 'lucide-react';
import './home-brand-showcase.css';

function BrandShowcase({ brand, brandModels, reverse, compareIds, onCompare, onDetails }) {
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
      className={`brand-showcase${reverse ? ' brand-showcase--reverse' : ''}`}
      aria-labelledby={`showcase-${brand.id}`}
    >
      <figure className="brand-showcase__product-image">
        <img src={model.image} alt="" loading="lazy" decoding="async" />
        <figcaption>Illustrative equipment image</figcaption>
      </figure>

      <div className="brand-showcase__product">
        <div className="brand-showcase__banner">
          <img className="brand-showcase__banner-image" src={`/images/brand-banners/${brand.id}.webp`} alt="" loading="lazy" decoding="async" />
          <div className="brand-showcase__identity">
            {brand.logo && <img className="brand-showcase__logo" src={brand.logo} alt="" loading="lazy" />}
            <h3 id={`showcase-${brand.id}`}>{brand.name}</h3>
          </div>
        </div>

        <div className="brand-showcase__body">
          <div className="brand-showcase__toolbar">
            <p className="brand-showcase__position">{index + 1} of {brandModels.length} models</p>
            <div className="brand-showcase__step">
              <button type="button" onClick={() => changeModel(-1)} disabled={!hasMultipleModels} aria-label={`Previous ${brand.name} model`}>
                <ChevronLeft size={19} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => changeModel(1)} disabled={!hasMultipleModels} aria-label={`Next ${brand.name} model`}>
                <ChevronRight size={19} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div aria-live="polite" aria-atomic="true">
            <h4>{model.model}</h4>
            <p className="brand-showcase__type">{model.type}</p>
          </div>

          <dl className="brand-showcase__specs">
            {specs.map(({ label, value, Icon }) => (
              <div key={label}>
                <dt><Icon size={15} aria-hidden="true" />{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="brand-showcase__actions">
            <button type="button" className="btn btn-primary" onClick={() => onDetails(model)}>
              View details <ArrowRight size={16} aria-hidden="true" />
            </button>
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
        </div>
      </div>
    </section>
  );
}

export default function HomeBrandShowcases({ brands, models, showAll, compareIds, onCompare, onDetails }) {
  const groups = brands.map((brand) => ({
    brand,
    brandModels: models.filter((model) => model.brand === brand.id),
  })).filter(({ brandModels }) => brandModels.length > 0);
  const featured = showAll ? groups : groups.slice(0, 3);
  const remaining = groups.slice(featured.length);

  const renderShowcase = ({ brand, brandModels }, index) => (
    <BrandShowcase
      key={brand.id}
      brand={brand}
      brandModels={brandModels}
      reverse={index % 2 === 1}
      compareIds={compareIds}
      onCompare={onCompare}
      onDetails={onDetails}
    />
  );

  return (
    <div className="brand-showcase-list">
      {featured.map(renderShowcase)}
      {remaining.length > 0 && (
        <details className="brand-showcase-more">
          <summary>
            <span className="brand-showcase-more__show">See more brands ({remaining.length})</span>
            <span className="brand-showcase-more__hide">Show fewer brands</span>
            <ArrowRight size={17} aria-hidden="true" />
          </summary>
          <div className="brand-showcase-list">
            {remaining.map((group, index) => renderShowcase(group, featured.length + index))}
          </div>
        </details>
      )}
    </div>
  );
}
