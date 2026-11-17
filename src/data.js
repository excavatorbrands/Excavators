export const brands = [
  { id: 'hyundai', name: 'Hyundai', sub: 'Construction Equipment', className: 'brand-hyundai' },
  { id: 'doosan', name: 'Doosan', sub: 'Excavators', className: 'brand-doosan' },
  { id: 'volvo', name: 'Volvo', sub: 'Construction Equipment', className: 'brand-volvo' },
  { id: 'hitachi', name: 'Hitachi', sub: 'Construction Machinery', className: 'brand-hitachi' },
  { id: 'cat', name: 'CAT', sub: 'Caterpillar', className: 'brand-cat' },
  { id: 'fiatallis', name: 'Fiatallis', sub: 'Excavators', className: 'brand-fiatallis' },
  { id: 'komatsu', name: 'Komatsu', sub: 'Construction Equipment', className: 'brand-komatsu' },
  { id: 'sany', name: 'SANY', sub: 'Heavy Equipment', className: 'brand-sany' },
];

// Illustrative model examples. Confirm all technical data with the manufacturer before publication.
export const models = [
  { id: 'hyundai-hx220l', brand: 'hyundai', brandName: 'Hyundai', model: 'HX220L', type: 'Medium crawler', power: '129 kW', weight: '22.1 t', bucket: '0.92–1.34 m³', image: '/images/model-hyundai.webp', note: 'Balanced performance for everyday earthmoving.' },
  { id: 'doosan-dx225lc', brand: 'doosan', brandName: 'Doosan', model: 'DX225LC', type: 'Medium crawler', power: '129 kW', weight: '22.5 t', bucket: '0.92–1.28 m³', image: '/images/model-doosan.webp', note: 'A versatile choice for demanding construction work.' },
  { id: 'volvo-ec220e', brand: 'volvo', brandName: 'Volvo', model: 'EC220E', type: 'Medium crawler', power: '129 kW', weight: '22.6 t', bucket: '1.0–1.3 m³', image: '/images/model-volvo.webp', note: 'Designed for efficient, controlled operation.' },
  { id: 'hitachi-zx210lc', brand: 'hitachi', brandName: 'Hitachi', model: 'ZX210LC-7', type: 'Medium crawler', power: '128 kW', weight: '22.1 t', bucket: '0.91–1.29 m³', image: '/images/model-hitachi.webp', note: 'A dependable platform for high-cycle jobs.' },
  { id: 'cat-320gc', brand: 'cat', brandName: 'Caterpillar', model: '320 GC', type: 'Medium crawler', power: '118 kW', weight: '20.4 t', bucket: '0.8–1.2 m³', image: '/images/model-cat.webp', note: 'A practical machine for a wide range of sites.' },
  { id: 'fiatallis-fa220', brand: 'fiatallis', brandName: 'Fiatallis', model: 'FA220', type: 'Medium crawler', power: '129 kW', weight: '22.0 t', bucket: '0.8–1.3 m³', image: '/images/model-fiatallis.webp', note: 'Heavy-duty concept with classic earthmoving character.' },
  { id: 'komatsu-pc210lc', brand: 'komatsu', brandName: 'Komatsu', model: 'PC210LC', type: 'Medium crawler', power: '123 kW', weight: '21.1 t', bucket: '0.8–1.2 m³', image: '/images/model-komatsu.webp', note: 'Built for productivity across varied applications.' },
  { id: 'sany-sy215c', brand: 'sany', brandName: 'SANY', model: 'SY215C', type: 'Medium crawler', power: '118 kW', weight: '21.9 t', bucket: '0.93–1.2 m³', image: '/images/model-sany.webp', note: 'A strong all-rounder for construction and quarry work.' },
];

export const categories = [
  { id: 'mini', title: 'Mini Excavators', range: '1–8 Ton', image: '/images/category-mini.webp', description: 'Compact power for restricted access and smaller jobs.' },
  { id: 'medium', title: 'Medium Excavators', range: '8–25 Ton', image: '/images/category-medium.webp', description: 'Versatile machines for general construction.' },
  { id: 'large', title: 'Large Excavators', range: '25–55 Ton', image: '/images/category-large.webp', description: 'High-capacity machines for heavy earthmoving.' },
  { id: 'mining', title: 'Mining Excavators', range: '55+ Ton', image: '/images/category-mining.webp', description: 'Heavy-duty equipment for demanding quarry sites.' },
  { id: 'special', title: 'Special Applications', range: 'Demolition / Long Reach', image: '/images/category-special.webp', description: 'Purpose-configured machines for specialist work.' },
];

export const industries = [
  { title: 'Construction', image: '/images/industry-construction.webp', icon: 'building' },
  { title: 'Mining & Quarry', image: '/images/industry-quarry.webp', icon: 'mountain' },
  { title: 'Road & Infrastructure', image: '/images/industry-infrastructure.webp', icon: 'road' },
  { title: 'Urban Development', image: '/images/industry-urban.webp', icon: 'city' },
  { title: 'Material Handling', image: '/images/industry-handling.webp', icon: 'layers' },
  { title: 'Demolition', image: '/images/industry-demolition.webp', icon: 'demolition' },
];
