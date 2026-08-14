# Beauty of Joseon - Deployment & Setup Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Vercel CLI
- Stripe Account (for payment processing)

## Environment Setup

1. Create `.env.local` file:
```bash
STRIPE_SECRET_KEY=sk_live_your_secret_key
STRIPE_PUBLIC_KEY=pk_live_your_public_key
VERCEL_URL=https://beautyofjoseon.me
```

2. Install dependencies:
```bash
npm install
```

## Database Setup (D1 - SQLite)

1. Create database tables:
```sql
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  sku TEXT UNIQUE,
  title TEXT,
  description TEXT,
  price_aed REAL,
  original_price_aed REAL,
  image_url TEXT,
  rating REAL,
  rating_count INTEGER,
  brand TEXT,
  in_stock BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  stripe_session_id TEXT UNIQUE,
  customer_email TEXT,
  total_aed REAL,
  items JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'pending'
);
```

2. Seed products (35 products from Noon.com):
```bash
node scripts/seed-products.js
```

## Development

```bash
npm run dev
```

Server starts at http://localhost:3000

## Building

```bash
npm run build
```

## Deployment to Vercel

1. Connect repo to Vercel:
```bash
vercel
```

2. Set environment variables in Vercel dashboard

3. Deploy:
```bash
vercel --prod
```

## Domain Configuration

1. Point beautyofjoseon.me to Vercel nameservers
2. Configure custom domain in Vercel project settings
3. Enable SSL/TLS (automatic with Vercel)

## Stripe Setup

1. Create Stripe account at https://stripe.com
2. Get API keys from Dashboard → API Keys
3. Set webhooks for order confirmations:
   - Endpoint: `https://beautyofjoseon.me/api/webhooks/stripe`
   - Events: `checkout.session.completed`

## PageSpeed Optimization

Current implementation includes:
- Next.js Image optimization
- Code splitting via React Router
- Tailwind CSS with PurgeCSS
- Gzip compression via Cloudflare

To reach 100 score:
1. Optimize all product images to WebP
2. Implement lazy loading for images
3. Add proper cache headers
4. Minimize JavaScript bundle
5. Enable HTTP/2 Server Push

## Product Management

Add/update products via database:
```sql
INSERT INTO products (sku, title, description, price_aed, original_price_aed, image_url, rating, rating_count, brand, in_stock)
VALUES ('sku-123', 'Product Name', 'Description', 96.48, 71.47, 'https://...', 4.5, 100, 'Beauty of Joseon', 1);
```

## Support

For issues:
1. Check Vercel deployment logs
2. Review Stripe webhook logs
3. Check browser console for client-side errors
4. Contact support@beautyofjoseon.me
