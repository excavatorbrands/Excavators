import { brands } from './data.js';

export default function BrandLogoRail({ className = '', id }) {
  return (
    <section className={`brand-logo-strip ${className}`} id={id} aria-label="Excavator brands">
      <div className="brand-logo-viewport">
        <div className="brand-logo-track">
          {[0, 1].map((copy) => (
            <div className="brand-logo-group" key={copy} aria-hidden={copy === 1}>
              {brands.map((brand) => (
                <a
                  className="brand-logo-link"
                  href={`/brands?brand=${brand.id}`}
                  key={brand.id}
                  tabIndex={copy === 1 ? -1 : undefined}
                  aria-label={copy === 1 ? undefined : `Explore ${brand.name} excavators`}
                >
                  <img src={brand.logo} alt={copy === 1 ? '' : `${brand.name} logo`} />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
