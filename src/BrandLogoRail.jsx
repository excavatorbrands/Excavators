import { useId, useState } from 'react';
import { brands } from './data.js';
import { brandUrl } from './catalogLinks.js';

export default function BrandLogoRail({ className = '', id }) {
  const viewportId = useId();
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  return (
    <section className={`brand-logo-strip ${className} ${paused ? "brand-logo-strip-paused" : ""}`} id={id} aria-label="Excavator brands">
      <div className="container brand-logo-toolbar">
        <span>Browse by manufacturer</span>
      </div>
      <div className="brand-logo-viewport" id={viewportId}>
        <div className="brand-logo-track">
          {[0, 1].map((copy) => (
            <div className="brand-logo-group" key={copy} aria-hidden={copy === 1}>
              {brands.map((brand) => (
                <a
                  className="brand-logo-link"
                  href={brandUrl(brand)}
                  key={brand.id}
                  tabIndex={copy === 1 ? -1 : undefined}
                  aria-label={copy === 1 ? undefined : `Explore ${brand.name} excavators`}
                >
                  <img src={brand.logo} alt="" decoding="async" />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
