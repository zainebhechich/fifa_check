// Database seeding script for Wallah We Can products
// Run this with: node scripts/seed-database.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please check your .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const products = [
  {
    id: "p-01",
    sku: "BX-001",
    name: "Essence Vitale",
    description: "5 flacons d'huiles essentielles de 10ml chacun",
    price: 179.0,
    category: "Coffrets",
    stock: 20,
    image_url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_Essence-Vitale0D@4x.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfRXNzZW5jZS1WaXRhbGUwREA0eC53ZWJwIiwiaWF0IjoxNzU4ODAwMjc4LCJleHAiOjE5MTY0ODAyNzh9.qnJdVa5dL1YDAc0C2kh8ZekOzd5_ihBtGBDqn933qaM",
    slug: "essence-vitale",
    is_active: true
  },
  {
    id: "p-02",
    sku: "BX-002",
    name: "La Savonnière Artisanale",
    description: "Assortiment de 4 savons naturels parfumés",
    price: 82.0,
    category: "Coffrets",
    stock: 20,
    image_url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_La-Savonniere-Artisanale0D@4x.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfTGEtU2F2b25uaWVyZS1BcnRpc2FuYWxlMERANHgud2VicCIsImlhdCI6MTc1ODgwMDE5OSwiZXhwIjoxOTE2NDgwMTk5fQ.ycMtHePZftGezHWL_sqRq9_t1EPO5DgOiHqPEFRlNkI",
    slug: "la-savonniere-artisanale",
    is_active: true
  },
  {
    id: "p-03",
    sku: "BX-003",
    name: "Jardin Floral",
    description: "4 bougies parfumées",
    price: 115.0,
    category: "Coffrets",
    stock: 20,
    image_url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_Jardin-Floral0D@4x.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfSmFyZGluLUZsb3JhbDBEQDR4LndlYnAiLCJpYXQiOjE3NTg4MDAyMTUsImV4cCI6MTkxNjQ4MDIxNX0.z_PsWnv7lQTQLUmvaRq6DestGy7bptSpPGR3DI1FJ5M",
    slug: "jardin-floral",
    is_active: true
  },
  {
    id: "p-04",
    sku: "BX-004",
    name: "L'Or des Fleurs",
    description: "4 pots de miels de 30 g chacun",
    price: 48.0,
    category: "Coffrets",
    stock: 20,
    image_url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_LOr-des-Fleurs0D@4x.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfTE9yLWRlcy1GbGV1cnMwREA0eC53ZWJwIiwiaWF0IjoxNzU4ODAwMTM5LCJleHAiOjE5MTY0ODAxMzl9.0cx3NDsaqRkZO4YL5FG6cb_BVsN2b2aq5YJJsmPF9V0",
    slug: "lor-des-fleurs",
    is_active: true
  },
  {
    id: "p-05",
    sku: "BX-005",
    name: "Nature Gourmande",
    description: "2 bouteilles d'huile d'olive 100 ml\n4 pots de miel variés de 30 g chacun\n1 sachet d'herbes aromatiques sèchées",
    price: 70.0,
    category: "Coffrets",
    stock: 20,
    image_url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_Nature-Gourmande0D@4x.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfTmF0dXJlLUdvdXJtYW5kZTBEQDR4LndlYnAiLCJpYXQiOjE3NTg4MDAxMTksImV4cCI6MTkxNjQ4MDExOX0.5CqWc8PPdpgDUb1ZWvDXm3ooBsv7rqq_OGqR2BoGhiE",
    slug: "nature-gourmande",
    is_active: true
  },
  {
    id: "p-06",
    sku: "BX-006",
    name: "Évasion Bio",
    description: "1 pot de miel 30 g\n1 sachet d'herbes aromatiques séchées\n2 bouteilles d'hydrolat 100 ml\n1 flacon d'huile essentielle de 10 ml",
    price: 86.0,
    category: "Coffrets",
    stock: 20,
    image_url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_Evasion-Bio0D@4x.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfRXZhc2lvbi1CaW8wREA0eC53ZWJwIiwiaWF0IjoxNzU4ODAwMjU4LCJleHAiOjE5MTY0ODAyNTh9.Lyr_oHqlPT4s0XIWhzL6kX5K_hwXn1e9Yks7N-sss1E",
    slug: "evasion-bio",
    is_active: true
  },
  {
    id: "p-07",
    sku: "BX-007",
    name: "Ambiance Nature",
    description: "2 bouteilles d'hydrolat 100 ml\n2 savons naturellement parfumés\n1 bougie parfumée \n1 flacon d'huile essentielle 10 ml\n1 sachet d'herbes aromatiques séchées",
    price: 137.0,
    category: "Coffrets",
    stock: 20,
    image_url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_Ambiance-Nature0D@4x.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfQW1iaWFuY2UtTmF0dXJlMERANHgud2VicCIsImlhdCI6MTc1ODgwMDM1MywiZXhwIjoxOTE2NDgwMzUzfQ.EOuvv_GJZ05UoSHYAmXEa4sJ3Dg9Wb8WkqwNxDbmJ7Q",
    slug: "ambiance-nature",
    is_active: true
  },
  {
    id: "p-08",
    sku: "BX-008",
    name: "Découverte des Senteurs",
    description: "3 flacons d'huiles essentielles\n1 sachet d'herbes aromatiques séchées\n1 bougie parfumée",
    price: 141.0,
    category: "Coffrets",
    stock: 20,
    image_url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_Decouverte-des-Senteurs0D@4x.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfRGVjb3V2ZXJ0ZS1kZXMtU2VudGV1cnMwREA0eC53ZWJwIiwiaWF0IjoxNzU4ODAwMzE1LCJleHAiOjE5MTY0ODAzMTV9.9oCg-6gIDaAjuXN88MfBD4gkc42RTw-5rsj1fiDJ6cM",
    slug: "decouverte-des-senteurs",
    is_active: true
  },
  {
    id: "p-09",
    sku: "BX-009",
    name: "L'artisan",
    description: "1 savon naturellement parfumé\n1 bougie parfumée\n1 sachet d'herbes aromatiques séchées\n1 flacon d'huile essentielle de 10 ml",
    price: 92.0,
    category: "Coffrets",
    stock: 20,
    image_url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_Lartisan0D@4x.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfTGFydGlzYW4wREA0eC53ZWJwIiwiaWF0IjoxNzU4ODAwMTgyLCJleHAiOjE5MTY0ODAxODJ9.f8WaQ0Hv70yhDn44gO349NS_PJHMdYThlbi-WuSaUkA",
    slug: "lartisan",
    is_active: true
  },
  {
    id: "p-10",
    sku: "BX-010",
    name: "Évasion Méditerranéenne",
    description: "2 bouteilles d'huile d'olive 100 ml\n1 flacon d'huile essentielle 10 ml\n1 pot de miel 30 g\n1 sachet d'herbes aromatiques séchées",
    price: 82.0,
    category: "Coffrets",
    stock: 20,
    image_url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/wwc-img/compressed_Evasion-Mediterraneenne0D@4x.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3d2MtaW1nL2NvbXByZXNzZWRfRXZhc2lvbi1NZWRpdGVycmFuZWVubmUwREA0eC53ZWJwIiwiaWF0IjoxNzU4ODAwMjQyLCJleHAiOjE5MTY0ODAyNDJ9.RAVhf1CJ5wPsEQWQJ8n4e3Ens9JH_kDfBILZpaEYls8",
    slug: "evasion-mediterraneenne",
    is_active: true
  }
];

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');
  
  try {
    // Check if products already exist
    const { data: existingProducts, error: checkError } = await supabase
      .from('products')
      .select('id')
      .limit(1);
    
    if (checkError) {
      console.error('❌ Error checking existing products:', checkError);
      return;
    }
    
    if (existingProducts && existingProducts.length > 0) {
      console.log('✅ Products already exist in database');
      return;
    }
    
    // Insert products
    const { data, error } = await supabase
      .from('products')
      .insert(products);
    
    if (error) {
      console.error('❌ Error inserting products:', error);
      return;
    }
    
    console.log('✅ Successfully seeded database with', products.length, 'products');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

seedDatabase();
