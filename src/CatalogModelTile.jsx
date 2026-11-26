import { ArrowRight } from 'lucide-react';
import { modelPrice, modelUrl } from './catalogLinks.js';

export default function CatalogModelTile({ model, showManufacturer = false }) {
  return (
    <a className="brand-detail-card" href={modelUrl(model)}>
      <img src={model.image} alt="" loading="lazy" decoding="async" />
      <div className="brand-detail-card__body">
        <p>{model.type}</p>
        <h3>{showManufacturer ? `${model.brandName} ` : ''}{model.model}</h3>
        <div><span>{modelPrice(model)}</span><ArrowRight size={17} aria-hidden="true" /></div>
      </div>
    </a>
  );
}
