import { useEffect, useRef, useState } from 'react';
import { brands, categories, models } from './data.js';
import './quarry-panorama.css';

const modelCount = (machineClass) =>
  models.filter((model) => model.type.toLowerCase().startsWith(machineClass)).length;

const statistics = [
  { id: 'models', label: 'Models in the catalog', total: models.length },
  { id: 'brands', label: 'Manufacturers', total: brands.length },
  { id: 'categories', label: 'Equipment categories', total: categories.length },
  { id: 'mini', label: 'Mini models', total: modelCount('mini') },
  { id: 'medium', label: 'Medium models', total: modelCount('medium') },
  { id: 'large', label: 'Large models', total: modelCount('large') },
  { id: 'mining', label: 'Mining models', total: modelCount('mining') },
];

const totals = statistics.map(({ total }) => total);
const cycleDuration = 5000;
const countDuration = 1400;
const staggerDelay = 70;

export default function QuarryPanorama() {
  const sectionRef = useRef(null);
  const [figures, setFigures] = useState(totals);

  useEffect(() => {
    const section = sectionRef.current;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isInView = false;
    let frameId;
    let cycleStart;
    let previous = totals;

    function showFigures(next) {
      if (next.every((figure, index) => figure === previous[index])) return;
      previous = next;
      setFigures(next);
    }

    function animate(now) {
      cycleStart ??= now;
      const elapsed = (now - cycleStart) % cycleDuration;
      const figures = totals.map((total, index) => {
        const progress = Math.max(0, Math.min(1, (elapsed - index * staggerDelay) / countDuration));
        return Math.round(total * (1 - (1 - progress) ** 3));
      });
      showFigures(figures);
      frameId = window.requestAnimationFrame(animate);
    }

    function syncAnimation() {
      window.cancelAnimationFrame(frameId);
      cycleStart = undefined;
      if (isInView && !motionPreference.matches && !document.hidden) {
        frameId = window.requestAnimationFrame(animate);
      } else {
        showFigures(totals);
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;
      syncAnimation();
    });

    observer.observe(section);
    motionPreference.addEventListener('change', syncAnimation);
    document.addEventListener('visibilitychange', syncAnimation);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
      motionPreference.removeEventListener('change', syncAnimation);
      document.removeEventListener('visibilitychange', syncAnimation);
    };
  }, []);

  return (
    <section className="quarry-panorama" ref={sectionRef} aria-labelledby="quarry-panorama-title">
      <div className="container quarry-panorama__inner">
        <h2 id="quarry-panorama-title">Iron Crest in numbers</h2>
        <dl className="quarry-panorama__stats">
          {statistics.map(({ id, label, total }, index) => (
            <div className={`quarry-panorama__stat quarry-panorama__stat--${id}`} key={id}>
              <dt>{label}</dt>
              <dd>
                <span aria-hidden="true">{figures[index]}</span>
                <span className="quarry-panorama__plus" aria-hidden="true">+</span>
                <span className="quarry-panorama__sr-only">{total}+</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}