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

// Model examples are not connected to an inventory feed; availability remains unverified.
const catalog = [
  ['hyundai','Hyundai','HX17A','Mini crawler'],
  ['hyundai','Hyundai','HX55ACR','Mini crawler'],
  ['hyundai','Hyundai','HX140A L','Medium crawler'],
  ['hyundai','Hyundai','HX220L','Medium crawler'],
  ['hyundai','Hyundai','HX380L','Large crawler'],
  ['hyundai','Hyundai','HX520L','Mining / heavy crawler'],

  ['doosan','Doosan','DX55R','Mini crawler'],
  ['doosan','Doosan','DX140LC','Medium crawler'],
  ['doosan','Doosan','DX225LC','Medium crawler'],
  ['doosan','Doosan','DX300LC','Large crawler'],
  ['doosan','Doosan','DX530LC','Mining / heavy crawler'],

  ['volvo','Volvo','EC60E','Mini crawler'],
  ['volvo','Volvo','ECR145E','Medium crawler'],
  ['volvo','Volvo','EC220E','Medium crawler'],
  ['volvo','Volvo','EC300E','Large crawler'],
  ['volvo','Volvo','EC480E','Large crawler'],

  ['hitachi','Hitachi','ZX55U-6','Mini crawler'],
  ['hitachi','Hitachi','ZX130-7','Medium crawler'],
  ['hitachi','Hitachi','ZX210LC-7','Medium crawler'],
  ['hitachi','Hitachi','ZX350LC-7','Large crawler'],
  ['hitachi','Hitachi','ZX490LCH-7','Large crawler'],

  ['cat','Caterpillar','306 CR','Mini crawler'],
  ['cat','Caterpillar','315','Medium crawler'],
  ['cat','Caterpillar','320','Medium crawler'],
  ['cat','Caterpillar','336','Large crawler'],
  ['cat','Caterpillar','395','Mining / heavy crawler'],

  ['fiatallis','Fiatallis','FB100.2','Medium excavator'],
  ['fiatallis','Fiatallis','FB200.2','Medium excavator'],
  ['fiatallis','Fiatallis','EX215','Medium crawler'],
  ['fiatallis','Fiatallis','EX285','Large crawler'],

  ['komatsu','Komatsu','PC55MR-5','Mini crawler'],
  ['komatsu','Komatsu','PC130-11','Medium crawler'],
  ['komatsu','Komatsu','PC210LC-11','Medium crawler'],
  ['komatsu','Komatsu','PC360LC-11','Large crawler'],
  ['komatsu','Komatsu','PC490LC-11','Large crawler'],

  ['sany','SANY','SY60C','Mini crawler'],
  ['sany','SANY','SY135C','Medium crawler'],
  ['sany','SANY','SY215C','Medium crawler'],
  ['sany','SANY','SY365C','Large crawler'],
  ['sany','SANY','SY500H','Mining / heavy crawler'],
];

export const models = catalog.map(([brand, brandName, model, type], index) => ({
  id: `${brand}-${model.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  brand, brandName, model, type, availability: 'unverified',
  power: 'Verify configuration',
  weight: 'Verify configuration',
  bucket: 'Verify configuration',
  image: `/images/model-${brand}.webp`,
  note: `Catalog listing for ${brandName} ${model}. Confirm local configuration, specifications and stock before publication.`,
  sourceOrder: index + 1,
}));

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
