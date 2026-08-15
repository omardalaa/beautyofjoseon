import { createClient } from '@supabase/supabase-js'

export interface Product {
  id?: string
  sku: string
  title: string
  description: string
  price_aed: number
  original_price_aed: number
  image_url: string
  images?: string[]
  rating: number
  rating_count: number
  brand: string
  in_stock: number
  specifications?: Record<string, string>
  highlights?: string[]
  created_at?: string
}

export interface Order {
  id?: string
  stripe_payment_id: string
  customer_email: string
  customer_name: string
  total_amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  items: Record<string, number>
  created_at?: string
}

let supabaseClient: ReturnType<typeof createClient> | null = null

export async function getDB() {
  if (supabaseClient) {
    return supabaseClient
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase configuration')
    return null
  }

  supabaseClient = createClient(supabaseUrl, supabaseKey)
  return supabaseClient
}

/*
  Database Schema (PostgreSQL):

  CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price_aed DECIMAL(10, 2) NOT NULL,
    original_price_aed DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    images JSONB,
    rating DECIMAL(3, 1),
    rating_count INTEGER DEFAULT 0,
    brand VARCHAR(100),
    in_stock INTEGER DEFAULT 1,
    specifications JSONB,
    highlights JSONB,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    stripe_payment_id VARCHAR(255) UNIQUE NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'AED',
    status VARCHAR(20) DEFAULT 'pending',
    items JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE INDEX idx_products_sku ON products(sku);
  CREATE INDEX idx_products_brand ON products(brand);
  CREATE INDEX idx_orders_stripe_id ON orders(stripe_payment_id);
  CREATE INDEX idx_orders_email ON orders(customer_email);
*/
