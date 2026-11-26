import { MapPin } from 'lucide-react';
import './location-link.css';

const location = 'Tarnol, Islamabad';
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location}, Pakistan`)}`;

export default function LocationLink({ showMapLabel = false }) {
  return (
    <a className={showMapLabel ? 'location-link location-link--panel' : 'location-link'} href={mapsUrl}>
      <MapPin size={showMapLabel ? 19 : 14} aria-hidden="true" />
      <span>
        {location}
        {showMapLabel && <small>View on Google Maps</small>}
      </span>
    </a>
  );
}
