const products = [
  {
    sku: "boj-ginseng-cleanse-oil-200ml",
    title: "Ginseng Rich Cleansing Oil 200ml",
    description: "Traditional Korean ginseng cleansing oil that removes makeup and impurities",
    original_price_aed: 71.47,
    brand: "Beauty of Joseon",
    rating: 4.5,
    rating_count: 120,
  },
  {
    sku: "boj-essence-toner-150ml",
    title: "Essence Toner with Ginseng 150ml",
    description: "Lightweight essence toner for skin rejuvenation and hydration",
    original_price_aed: 87.98,
    brand: "Beauty of Joseon",
    rating: 4.7,
    rating_count: 95,
  },
  {
    sku: "boj-serum-red-bean-peptide-30ml",
    title: "Red Bean Peptide Nourishing Serum 30ml",
    description: "Concentrated serum with red bean peptides for intense nourishment",
    original_price_aed: 107.66,
    brand: "Beauty of Joseon",
    rating: 4.6,
    rating_count: 88,
  },
  {
    sku: "boj-pore-cleansing-clay-100ml",
    title: "Pore Cleansing Clay Mask 100ml",
    description: "Volcanic pore cleansing clay mask for deep pore detoxification",
    original_price_aed: 65.18,
    brand: "Beauty of Joseon",
    rating: 4.4,
    rating_count: 76,
  },
  {
    sku: "boj-night-cream-rich-50ml",
    title: "Deeply Moisturizing Night Cream 50ml",
    description: "Rich night cream with traditional Korean ingredients for overnight repair",
    original_price_aed: 92.28,
    brand: "Beauty of Joseon",
    rating: 4.8,
    rating_count: 104,
  },
]

console.log("Sample products data ready for database:")
products.forEach(p => {
  const price_aed = Math.round(p.original_price_aed * 1.35 * 100) / 100
  console.log(`${p.sku}: ${price_aed} AED (from ${p.original_price_aed} AED)`)
})

console.log("\nNote: Full 35-product dataset to be populated from Noon.com data")
