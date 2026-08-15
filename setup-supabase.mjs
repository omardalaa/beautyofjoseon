#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zqugpjsppgnmbbnvzvdq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_5trtCcCsQWcqXP5IxIOqXA_pNQ6LmNu';

const sql = `
-- Beauty of Joseon Supabase PostgreSQL Schema
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
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

CREATE TABLE orders (
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

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON products
  FOR SELECT USING (true);

CREATE POLICY "Users can read own orders" ON orders
  FOR SELECT USING (auth.uid() IS NOT NULL);
`;

async function setupDatabase() {
  try {
    console.log('🔌 Connecting to Supabase...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    console.log('📝 Creating tables and indexes...');
    const { data, error } = await supabase.rpc('exec_sql', { query: sql });

    if (error) {
      // Try alternative approach using direct SQL endpoint
      console.log('⚠️  RPC method failed, trying alternative approach...');

      // Try using the SQL query function if available
      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ query: sql }),
      });

      if (!response.ok) {
        console.log('ℹ️  Note: Direct SQL execution may require a management API token.');
        console.log('✅ Please execute the SQL schema manually in Supabase SQL Editor:');
        console.log('   https://supabase.com/dashboard/project/zqugpjsppgnmbbnvzvdq/sql/new');
        console.log('\n📋 SQL Schema:');
        console.log(sql);
        return;
      }

      console.log('✅ Tables created successfully!');
    } else {
      console.log('✅ Tables created successfully!');
    }

    // Verify tables exist
    console.log('\n🔍 Verifying tables...');
    const { data: tables, error: tablesError } = await supabase
      .from('products')
      .select('id')
      .limit(0);

    if (!tablesError) {
      console.log('✅ Products table is accessible');
    } else {
      console.log('⚠️  Products table check failed:', tablesError.message);
    }

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id')
      .limit(0);

    if (!ordersError) {
      console.log('✅ Orders table is accessible');
    } else {
      console.log('⚠️  Orders table check failed:', ordersError.message);
    }

    console.log('\n📌 Next steps:');
    console.log('1. Add environment variables to Vercel:');
    console.log('   - SUPABASE_URL: https://zqugpjsppgnmbbnvzvdq.supabase.co');
    console.log('   - SUPABASE_ANON_KEY: sb_publishable_5trtCcCsQWcqXP5IxIOqXA_pNQ6LmNu');
    console.log('2. Enable Data API in Supabase for products and orders tables');
    console.log('3. Run: npm run seed');

  } catch (err) {
    console.error('❌ Error:', err.message);
    console.log('\n📋 Please manually execute this SQL in Supabase SQL Editor:');
    console.log('   https://supabase.com/dashboard/project/zqugpjsppgnmbbnvzvdq/sql/new');
    console.log('\n' + sql);
  }
}

setupDatabase();
