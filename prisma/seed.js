require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/akshaya-associates';

const products = [
  // Lab Equipment
  {
    name: 'Digital Analytical Balance',
    description: 'High precision digital balance with 0.1mg readability',
    price: 45000,
    image: '/api/placeholder/400/300',
    category: 'lab-equipment',
    inStock: true,
  },
  {
    name: 'Microscope - Binocular',
    description: 'Professional grade binocular microscope with LED illumination',
    price: 35000,
    image: '/api/placeholder/400/300',
    category: 'lab-equipment',
    inStock: true,
  },
  {
    name: 'Autoclave - Table Top',
    description: 'Steam sterilizer for laboratory use',
    price: 55000,
    image: '/api/placeholder/400/300',
    category: 'lab-equipment',
    inStock: true,
  },
  {
    name: 'Centrifuge Machine',
    description: 'High-speed centrifuge with timer and speed control',
    price: 65000,
    image: '/api/placeholder/400/300',
    category: 'lab-equipment',
    inStock: true,
  },
  {
    name: 'Water Distillation Unit',
    description: 'Double distillation unit for pure water',
    price: 25000,
    image: '/api/placeholder/400/300',
    category: 'lab-equipment',
    inStock: true,
  },
  {
    name: 'Hot Air Oven',
    description: 'Laboratory hot air oven with digital temperature control',
    price: 18000,
    image: '/api/placeholder/400/300',
    category: 'lab-equipment',
    inStock: true,
  },
  // Chemicals
  {
    name: 'Hydrochloric Acid (HCl) - 1L',
    description: 'Analytical grade concentrated hydrochloric acid',
    price: 850,
    image: '/api/placeholder/400/300',
    category: 'chemicals',
    inStock: true,
  },
  {
    name: 'Sulfuric Acid (H2SO4) - 1L',
    description: 'Analytical grade concentrated sulfuric acid',
    price: 750,
    image: '/api/placeholder/400/300',
    category: 'chemicals',
    inStock: true,
  },
  {
    name: 'Sodium Hydroxide (NaOH) - 500g',
    description: 'Laboratory grade sodium hydroxide pellets',
    price: 450,
    image: '/api/placeholder/400/300',
    category: 'chemicals',
    inStock: true,
  },
  {
    name: 'Ethanol - 99.9% - 1L',
    description: 'Absolute ethanol for laboratory use',
    price: 1200,
    image: '/api/placeholder/400/300',
    category: 'chemicals',
    inStock: true,
  },
  {
    name: 'Distilled Water - 20L',
    description: 'Double distilled water for experiments',
    price: 350,
    image: '/api/placeholder/400/300',
    category: 'chemicals',
    inStock: true,
  },
  {
    name: 'Buffer Solutions Set',
    description: 'Set of pH buffer solutions (pH 4, 7, 10)',
    price: 1800,
    image: '/api/placeholder/400/300',
    category: 'chemicals',
    inStock: true,
  },
  // Glassware
  {
    name: 'Beaker Set - Borosilicate',
    description: 'Set of 5 beakers (50ml to 1000ml)',
    price: 2800,
    image: '/api/placeholder/400/300',
    category: 'glassware',
    inStock: true,
  },
  {
    name: 'Flask Set - Borosilicate',
    description: 'Set of 5 Erlenmeyer flasks (100ml to 1000ml)',
    price: 3200,
    image: '/api/placeholder/400/300',
    category: 'glassware',
    inStock: true,
  },
  {
    name: 'Pipette Set - Volumetric',
    description: 'Set of 5 volumetric pipettes (1ml to 25ml)',
    price: 4500,
    image: '/api/placeholder/400/300',
    category: 'glassware',
    inStock: true,
  },
  {
    name: 'Test Tubes Set',
    description: 'Set of 50 borosilicate test tubes with rack',
    price: 1800,
    image: '/api/placeholder/400/300',
    category: 'glassware',
    inStock: true,
  },
  {
    name: 'Burette - 50ml',
    description: 'Class A borosilicate burette with PTFE stopcock',
    price: 2800,
    image: '/api/placeholder/400/300',
    category: 'glassware',
    inStock: true,
  },
  {
    name: 'Condenser - Liebig',
    description: 'Borosilicate Liebig condenser for distillation',
    price: 3500,
    image: '/api/placeholder/400/300',
    category: 'glassware',
    inStock: true,
  },
  // Surgicals
  {
    name: 'Surgical Scissors - Straight',
    description: 'Premium stainless steel surgical scissors',
    price: 1200,
    image: '/api/placeholder/400/300',
    category: 'surgicals',
    inStock: true,
  },
  {
    name: 'Forceps - Tissue',
    description: 'Surgical forceps for tissue handling',
    price: 950,
    image: '/api/placeholder/400/300',
    category: 'surgicals',
    inStock: true,
  },
  {
    name: 'Scalpel Handle & Blades',
    description: 'Surgical scalpel with replaceable blades',
    price: 650,
    image: '/api/placeholder/400/300',
    category: 'surgicals',
    inStock: true,
  },
  {
    name: 'Surgical Needle Holder',
    description: 'Locking needle holder for suturing',
    price: 1800,
    image: '/api/placeholder/400/300',
    category: 'surgicals',
    inStock: true,
  },
  {
    name: 'Hemostat - Mosquito',
    description: 'Curved hemostat for clamping vessels',
    price: 1100,
    image: '/api/placeholder/400/300',
    category: 'surgicals',
    inStock: true,
  },
  {
    name: 'Surgical Dressing Set',
    description: 'Complete surgical dressing tray',
    price: 2500,
    image: '/api/placeholder/400/300',
    category: 'surgicals',
    inStock: true,
  },
  // Hospital Wares
  {
    name: 'Surgical Gloves - Box of 100',
    description: 'Powder-free latex surgical gloves',
    price: 1800,
    image: '/api/placeholder/400/300',
    category: 'hospital-wares',
    inStock: true,
  },
  {
    name: 'Syringes - Disposable',
    description: 'Box of 100 disposable syringes (5ml)',
    price: 1200,
    image: '/api/placeholder/400/300',
    category: 'hospital-wares',
    inStock: true,
  },
  {
    name: 'IV Drip Set',
    description: 'Complete IV administration set',
    price: 450,
    image: '/api/placeholder/400/300',
    category: 'hospital-wares',
    inStock: true,
  },
  {
    name: 'Bedpan - Stainless Steel',
    description: 'Hospital-grade stainless steel bedpan',
    price: 2800,
    image: '/api/placeholder/400/300',
    category: 'hospital-wares',
    inStock: true,
  },
  {
    name: 'Thermometer - Digital',
    description: 'Clinical digital thermometer',
    price: 650,
    image: '/api/placeholder/400/300',
    category: 'hospital-wares',
    inStock: true,
  },
  {
    name: 'Stethoscope - Professional',
    description: 'Dual-head stethoscope for medical professionals',
    price: 3500,
    image: '/api/placeholder/400/300',
    category: 'hospital-wares',
    inStock: true,
  },
];

async function main() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Import Product model
    // Need to use dynamic import or require with proper path
    const mongoose = require('mongoose');
    const ProductSchema = new mongoose.Schema({
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      category: { type: String, required: true },
      inStock: { type: Boolean, default: true },
    }, { timestamps: true });
    
    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

    console.log('Clearing existing products...');
    await Product.deleteMany({});

    console.log('Seeding products...');
    await Product.insertMany(products);

    console.log(`✅ Seeded ${products.length} products successfully!`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

main();
