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

// Central catalog. Availability is intentionally a simple field so it can later
// be replaced by a CMS/API/database without changing the page UI.
const catalog = [
  ['hyundai','Hyundai','HX17A','Mini crawler','not-available'],
  ['hyundai','Hyundai','HX55ACR','Mini crawler','available'],
  ['hyundai','Hyundai','HX140A L','Medium crawler','available'],
  ['hyundai','Hyundai','HX220L','Medium crawler','available'],
  ['hyundai','Hyundai','HX380L','Large crawler','not-available'],
  ['hyundai','Hyundai','HX520L','Mining / heavy crawler','not-available'],

  ['doosan','Doosan','DX55R','Mini crawler','available'],
  ['doosan','Doosan','DX140LC','Medium crawler','not-available'],
  ['doosan','Doosan','DX225LC','Medium crawler','available'],
  ['doosan','Doosan','DX300LC','Large crawler','available'],
  ['doosan','Doosan','DX530LC','Mining / heavy crawler','not-available'],

  ['volvo','Volvo','EC60E','Mini crawler','available'],
  ['volvo','Volvo','ECR145E','Medium crawler','available'],
  ['volvo','Volvo','EC220E','Medium crawler','available'],
  ['volvo','Volvo','EC300E','Large crawler','not-available'],
  ['volvo','Volvo','EC480E','Large crawler','available'],

  ['hitachi','Hitachi','ZX55U-6','Mini crawler','not-available'],
  ['hitachi','Hitachi','ZX130-7','Medium crawler','available'],
  ['hitachi','Hitachi','ZX210LC-7','Medium crawler','available'],
  ['hitachi','Hitachi','ZX350LC-7','Large crawler','not-available'],
  ['hitachi','Hitachi','ZX490LCH-7','Large crawler','available'],

  ['cat','Caterpillar','306 CR','Mini crawler','available'],
  ['cat','Caterpillar','315','Medium crawler','available'],
  ['cat','Caterpillar','320','Medium crawler','available'],
  ['cat','Caterpillar','336','Large crawler','not-available'],
  ['cat','Caterpillar','395','Mining / heavy crawler','not-available'],

  ['fiatallis','Fiatallis','FB100.2','Medium excavator','not-available'],
  ['fiatallis','Fiatallis','FB200.2','Medium excavator','not-available'],
  ['fiatallis','Fiatallis','EX215','Medium crawler','available'],
  ['fiatallis','Fiatallis','EX285','Large crawler','not-available'],

  ['komatsu','Komatsu','PC55MR-5','Mini crawler','available'],
  ['komatsu','Komatsu','PC130-11','Medium crawler','available'],
  ['komatsu','Komatsu','PC210LC-11','Medium crawler','available'],
  ['komatsu','Komatsu','PC360LC-11','Large crawler','not-available'],
  ['komatsu','Komatsu','PC490LC-11','Large crawler','available'],

  ['sany','SANY','SY60C','Mini crawler','available'],
  ['sany','SANY','SY135C','Medium crawler','not-available'],
  ['sany','SANY','SY215C','Medium crawler','available'],
  ['sany','SANY','SY365C','Large crawler','available'],
  ['sany','SANY','SY500H','Mining / heavy crawler','not-available'],
];

export const models = catalog.map(([brand, brandName, model, type, availability], index) => ({
  id: `${brand}-${model.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  brand, brandName, model, type, availability,
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
