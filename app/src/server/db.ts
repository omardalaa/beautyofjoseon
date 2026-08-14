export interface Product {
  id: string
  sku: string
  title: string
  description: string
  price_aed: number
  original_price_aed: number
  image_url: string
  images: string[]
  rating: number
  rating_count: number
  brand: string
  in_stock: boolean
  specifications: Record<string, string>
  highlights: string[]
}

export interface Order {
  id: string
  stripe_session_id: string
  customer_email: string
  total_aed: number
  items: Array<{ sku: string; quantity: number }>
  created_at: string
  status: 'pending' | 'completed' | 'cancelled'
}

// Database will use D1 (SQLite)
// SQL schema:
/*
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
  in_stock BOOLEAN,
  specifications JSON,
  highlights JSON,
  created_at DATETIME
);

CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  stripe_session_id TEXT UNIQUE,
  customer_email TEXT,
  total_aed REAL,
  items JSON,
  created_at DATETIME,
  status TEXT
);
*/
