# Beauty of Joseon - Product Import Guide

## Overview

This guide explains how to import the 35 Beauty of Joseon products from Noon.com UAE with pricing calculations.

## Pricing Formula

```
AED Price = (Original Noon Price × 1.35) + 20 AED Shipping

Examples:
- Product at 100 AED → (100 × 1.35) + 20 = 155 AED
- Product at 250 AED → (250 × 1.35) + 20 = 357.50 AED
- Product at 50 AED → (50 × 1.35) + 20 = 87.50 AED
```

**Important:** The 20 AED shipping is added in the cart checkout, NOT in individual product price. So product prices in database should be: `Original Price × 1.35`

## Source Data

**URL:** https://www.noon.com/uae-en/~beautyofjoseon/

**Products to Import:** All 35 items visible on the page

**Data to Collect per Product:**
- Product name/title
- SKU (unique identifier)
- Original price (from Noon.com)
- Product description
- Images (URL or download)
- Rating (5-star)
- Rating count
- In stock status
- Specifications/features
- Highlights

## Method 1: Manual Import (Quick Start)

### For Testing/Launch

1. **Edit app/src/routes/shop.tsx**

Replace the PRODUCTS array with 35 products in this format:

```typescript
const PRODUCTS = [
  {
    id: "1",
    sku: "BOJ-GINSENG-OIL",
    title: "Ginseng Dark Spot Care Oil",
    description: "Premium ginseng oil for dark spot reduction",
    price: 67.5, // Original 50 AED × 1.35
    original_price: 50,
    image_url: "https://noon-images.s3.ae/product-1.jpg",
    images: ["https://noon-images.s3.ae/product-1.jpg"],
    rating: 4.5,
    rating_count: 245,
    brand: "Beauty of Joseon",
    in_stock: true,
    specifications: ["Cruelty-free", "Dermatologist tested"],
    highlights: ["Reduces dark spots", "Improves skin tone", "Lightweight formula"]
  },
  // ... add 34 more products
];
```

2. **Download Images**

```bash
# Create directory
mkdir -p app/public/products

# Add product images to this directory
# Or link to external Noon.com image URLs
```

3. **Deploy**

```bash
git add .
git commit -m "Add 35 Beauty of Joseon products"
git push
# Vercel auto-deploys
```

## Method 2: D1 Database Import (Recommended Long-term)

### Setup D1 Database

1. **In Vercel Dashboard:**
   - Go to Storage → Create Database
   - Select D1 (SQLite)
   - Name: `beautyofjoseon-db`
   - Create

2. **Update wrangler.toml:**

```toml
[[d1_databases]]
binding = "DB"
database_name = "beautyofjoseon-db"
database_id = "YOUR_DATABASE_ID"
```

3. **Create Schema:**

```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sku TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  original_price REAL,
  image_url TEXT,
  images TEXT,
  rating REAL,
  rating_count INTEGER,
  brand TEXT,
  in_stock BOOLEAN DEFAULT 1,
  specifications TEXT,
  highlights TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stripe_session_id TEXT UNIQUE,
  customer_email TEXT NOT NULL,
  total_aed REAL NOT NULL,
  items TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'pending'
);
```

4. **Insert Products:**

```sql
INSERT INTO products (sku, title, description, price, original_price, image_url, rating, rating_count, brand, in_stock, specifications, highlights)
VALUES 
('BOJ-GINSENG-OIL', 'Ginseng Dark Spot Care Oil', 'Premium ginseng oil', 67.5, 50, 'https://...', 4.5, 245, 'Beauty of Joseon', 1, '["Cruelty-free"]', '["Reduces dark spots"]'),
-- ... add 34 more products
;
```

## Method 3: Automated CSV Import Script

### Using Node.js Script

1. **Create CSV with product data:**

```csv
SKU,Title,Description,Price,OriginalPrice,ImageURL,Rating,RatingCount,Brand,InStock
BOJ-GINSENG-OIL,Ginseng Oil,Description here,67.5,50,https://url.jpg,4.5,245,Beauty of Joseon,1
```

2. **Create import script:**

```typescript
// scripts/import-products.ts
import fs from 'fs';
import csv from 'csv-parser';

const products = [];

fs.createReadStream('products.csv')
  .pipe(csv())
  .on('data', (row) => {
    products.push({
      sku: row.SKU,
      title: row.Title,
      description: row.Description,
      price: parseFloat(row.Price),
      original_price: parseFloat(row.OriginalPrice),
      image_url: row.ImageURL,
      rating: parseFloat(row.Rating),
      rating_count: parseInt(row.RatingCount),
      brand: row.Brand,
      in_stock: row.InStock === '1',
    });
  })
  .on('end', async () => {
    // Insert into database
    console.log(`Imported ${products.length} products`);
  });
```

3. **Run script:**

```bash
npx ts-node scripts/import-products.ts
```

## Product Data Template

For each of the 35 products, you need:

```json
{
  "sku": "BOJ-UNIQUE-ID",
  "title": "Product Name",
  "description": "Short description of product",
  "price": 67.5,
  "original_price": 50,
  "image_url": "https://example.com/image.jpg",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "rating": 4.5,
  "rating_count": 245,
  "brand": "Beauty of Joseon",
  "in_stock": true,
  "specifications": [
    "Cruelty-free",
    "Dermatologist tested",
    "Vegan"
  ],
  "highlights": [
    "Key benefit 1",
    "Key benefit 2",
    "Key benefit 3"
  ]
}
```

## Important Notes

1. **Pricing:** Calculate FINAL PRICE = (Original × 1.35), NOT including shipping
   - Shipping (20 AED) is added in cart checkout
   - Database should store: Original × 1.35

2. **Images:**
   - Use Noon.com images directly (hotlink) OR download
   - Optimize to WebP format if downloading
   - Target <100KB per image for PageSpeed

3. **SKU Naming Convention:**
   - Use: BOJ-PRODUCT-TYPE (e.g., BOJ-GINSENG-OIL)
   - Must be unique
   - Lowercase with hyphens

4. **Ratings:**
   - Copy 5-star rating from Noon.com
   - Copy review count

5. **In Stock:**
   - Set to true for available products
   - Set to false for out-of-stock

## Verification Checklist

After importing products:

- [ ] All 35 products appear in /shop page
- [ ] Product images load correctly
- [ ] Prices display in AED
- [ ] Add to cart works for each product
- [ ] Cart calculates total with 20 AED shipping
- [ ] Checkout process completes
- [ ] Database queries return correct products
- [ ] Product ratings display
- [ ] In-stock status correct

## Troubleshooting

**Images Not Displaying:**
```
Solution: Use full HTTPS URLs from Noon.com
Example: https://noon-images.s3.ae/product.jpg
```

**Prices Incorrect:**
```
Check: (Original × 1.35) format
Wrong: 100 × 1.35 × 20 = 2,700
Right: (100 × 1.35) = 135, then +20 in cart
```

**Duplicate SKU Error:**
```
Solution: Ensure each SKU is unique
Action: Add -variant suffix if needed (BOJ-OIL-1, BOJ-OIL-2)
```

## Next Steps

1. Choose import method (Manual/D1/Script)
2. Gather product data from Noon.com
3. Calculate prices using formula
4. Import products
5. Test shop page loads all 35 products
6. Verify checkout calculates shipping correctly
7. Deploy to production
