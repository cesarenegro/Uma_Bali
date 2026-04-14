const fs = require('fs');
const path = require('path');

const RAW_JSON = path.join(__dirname, 'products.json');
const IMG_BASE_DIR = path.join(__dirname, '..', 'IMG FFE Uma Bali');
const HERO_DIR = path.join(__dirname, '..', 'HERO');
const OUT_PRODUCTS = path.join(__dirname, '..', 'frontend', 'src', 'data', 'products.json');
const OUT_CATEGORIES = path.join(__dirname, '..', 'frontend', 'src', 'data', 'categories.json');
const OUT_IMG_DIR = path.join(__dirname, '..', 'frontend', 'public', 'images', 'products');
const OUT_HERO_DIR = path.join(__dirname, '..', 'frontend', 'public', 'images', 'hero');

if (!fs.existsSync(OUT_IMG_DIR)) fs.mkdirSync(OUT_IMG_DIR, { recursive: true });
if (!fs.existsSync(OUT_HERO_DIR)) fs.mkdirSync(OUT_HERO_DIR, { recursive: true });
if (!fs.existsSync(path.dirname(OUT_PRODUCTS))) fs.mkdirSync(path.dirname(OUT_PRODUCTS), { recursive: true });

// Copy Hero Images
const heroFiles = fs.readdirSync(HERO_DIR);
heroFiles.forEach(f => {
  if (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.webp')) {
    const safeName = f.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    fs.copyFileSync(path.join(HERO_DIR, f), path.join(OUT_HERO_DIR, safeName));
  }
});

// Map physical files in IMG_BASE_DIR
const categoryFolders = fs.readdirSync(IMG_BASE_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

const physicalImagesMap = {}; // Maps "Source Filename" to Absolute Path
categoryFolders.forEach(folder => {
  const folderPath = path.join(IMG_BASE_DIR, folder);
  const files = fs.readdirSync(folderPath);
  files.forEach(f => {
    physicalImagesMap[f] = path.join(folderPath, f);
  });
});

const sanitize = (str) => String(str).trim();

// Map Excel categories to our UI categories
const mapCategory = (cat) => {
  const c = sanitize(cat).toLowerCase();
  if (c.includes('cabinet') || c.includes('storage')) return 'cabinets';
  if (c === 'sofa chairs') return 'sofa chairs';
  if (c === 'chairs') return 'chairs';
  if (c.includes('coffee') || c.includes('coffeetable')) return 'coffeetable';
  if (c === 'sofa') return 'sofa';
  if (c === 'sunbeds') return 'sunbeds';
  if (c.includes('table') && !c.includes('coffee')) return 'tables';
  return 'uncategorized';
};

const rawData = JSON.parse(fs.readFileSync(RAW_JSON, 'utf-8'));

const products = [];
rawData.forEach((item, index) => {
  const id = sanitize(item['Item Code']);
  const name = sanitize(item['Item Name']);
  const categoryRaw = sanitize(item['Category']);
  const uiCategory = mapCategory(categoryRaw);
  const shortDesc = sanitize(item['Description']);
  
  const width = Number(item['Width (cm)']) || 0;
  const depth = Number(item['Depth / Length (cm)']) || 0;
  const height = Number(item['Height (cm)']) || 0;
  const rawDim = sanitize(item['Dimensions W/L/H (cm)']);
  
  const materialStr = sanitize(item['Material']);
  const upholsterStr = sanitize(item['Upholstering']);
  const vol = Number(item['Volume (m³)']);
  const weight = Number(item['Weight Est. (kg)']);
  
  const sourceFilename = sanitize(item['Source Filename']);
  
  // Extended Description generation
  const longDesc = `Experience the ultimate in outdoor luxury with the ${name}. ${shortDesc}. Crafted from premium ${materialStr.toLowerCase()}${upholsterStr !== 'None' ? ' and paired with ' + upholsterStr.toLowerCase() : ''}, this piece represents the pinnacle of Balinese craftsmanship and modern minimalist design. Every detail is meticulously created to withstand the elements while providing unparalleled comfort and style to your outdoor living spaces. Our artisanal approach ensures that each ${uiCategory === 'sofa chairs' ? 'chair' : uiCategory === 'coffeetable' ? 'table' : 'piece'} brings a unique, organic feel right to your home.`;
  
  let images = [];
  if (sourceFilename && physicalImagesMap[sourceFilename]) {
    const srcPath = physicalImagesMap[sourceFilename];
    const safeName = sourceFilename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const destPath = path.join(OUT_IMG_DIR, safeName);
    fs.copyFileSync(srcPath, destPath);
    images.push(`/images/products/${safeName}`);
  } else {
    console.warn(`WARNING: Image not found for ${sourceFilename} (Product ${id})`);
    // Provide a fallback placeholder
    images.push(`https://placehold.co/600x600/f5f5f5/a3a3a3?text=${encodeURIComponent(name)}`);
  }

  products.push({
    id,
    name,
    description: shortDesc,
    longDescription: longDesc,
    category: uiCategory, // use the unified UI category
    price: 0, // Mock price to satisfy type
    images,
    dimensions: {
      width,
      depth,
      height,
      rawString: rawDim
    },
    materials: [materialStr],
    upholstery: upholsterStr === 'None' ? undefined : upholsterStr,
    weight,
    volume: vol,
    inStock: true,
    isCustomizable: true
  });
});

// Post-processing to assign "top items" to a few prominent products
const categoriesSet = new Set(products.map(p => p.category));
// add top items category metadata
const CATEGORIES = [
  ...Array.from(categoriesSet).filter(c => c !== 'uncategorized'),
  "top items"
].map(c => ({
  id: c,
  name: c.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
  // We'll map cover images randomly or deterministically from products in the category
  image: ''
}));

// Find cover images
CATEGORIES.forEach(cat => {
  if (cat.id === 'top items') {
    cat.image = '/images/hero/Lounge_Poo_Classic.png'; // Will use a hero image
  } else {
    const categoryProducts = products.filter(p => p.category === cat.id);
    if (categoryProducts.length > 0 && categoryProducts[0].images[0]) {
      cat.image = categoryProducts[0].images[0];
    } else {
      cat.image = 'https://placehold.co/600x400/ebebeb/a3a3a3?text=Category';
    }
  }
});

// Select top items deterministically (e.g., first item of each category)
const topItemIds = [];
CATEGORIES.forEach(cat => {
  if (cat.id !== 'top items') {
    const prod = products.find(p => p.category === cat.id);
    if (prod) topItemIds.push(prod.id);
  }
});

// Update products to include top items tag
products.forEach(p => {
  if (topItemIds.includes(p.id)) {
    // We don't change its internal array (since it belongs to a primary category)
    // But we need to handle how the frontend identifies "top items".
    // Let's add a "tags" array.
    p.tags = ['top-item'];
  } else {
    p.tags = [];
  }
});


fs.writeFileSync(OUT_PRODUCTS, JSON.stringify(products, null, 2));
fs.writeFileSync(OUT_CATEGORIES, JSON.stringify(CATEGORIES, null, 2));

console.log('Successfully processed data!');
