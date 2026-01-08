// Use dynamic import to work around Prisma client resolution issues
const { PrismaClient } = await import('../node_modules/.prisma/client/index.js');
import { config } from 'dotenv';

// Load environment variables from project root
config();

const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';

const prisma = new PrismaClient({
  datasourceUrl: databaseUrl,
});

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
  console.log('Seeding database...');

  // Clear existing products
  await prisma.product.deleteMany();
  
  // Create products
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
