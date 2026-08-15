import { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

// Sample products to seed (if database is empty)
const sampleProducts = [
  {
    name: 'Essential Essence Toner',
    description: 'Hydrating essence toner with traditional Joseon ingredients',
    price_aed: 89.99,
    original_noon_price: 66.66,
    image_url: 'https://via.placeholder.com/300x300?text=Essence+Toner',
    rating: 4.8,
    rating_count: 245,
    in_stock: true,
    stock_count: 50,
    brand: 'Beauty of Joseon',
    category: 'Toners'
  },
  {
    name: 'Snow Brightening Cream',
    description: 'Whitening cream for radiant, glowing skin',
    price_aed: 129.99,
    original_noon_price: 96.29,
    image_url: 'https://via.placeholder.com/300x300?text=Snow+Cream',
    rating: 4.7,
    rating_count: 189,
    in_stock: true,
    stock_count: 40,
    brand: 'Beauty of Joseon',
    category: 'Moisturizers'
  },
  {
    name: 'Ginseng Deep Serum',
    description: 'Anti-aging serum with ginseng extract',
    price_aed: 149.99,
    original_noon_price: 111.11,
    image_url: 'https://via.placeholder.com/300x300?text=Ginseng+Serum',
    rating: 4.9,
    rating_count: 312,
    in_stock: true,
    stock_count: 35,
    brand: 'Beauty of Joseon',
    category: 'Serums'
  },
  {
    name: 'Pearl Radiance Mask',
    description: 'Brightening sheet mask with pearl powder',
    price_aed: 59.99,
    original_noon_price: 44.44,
    image_url: 'https://via.placeholder.com/300x300?text=Pearl+Mask',
    rating: 4.6,
    rating_count: 156,
    in_stock: true,
    stock_count: 60,
    brand: 'Beauty of Joseon',
    category: 'Masks'
  }
]

// Vercel serverless function handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Extract the pathname from the request URL
  const pathname = new URL(req.url || '/', `http://${req.headers.host}`).pathname

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Handle API routes
  if (pathname.startsWith('/api/')) {
    // API seed endpoint - seed products to database
    if (pathname === '/api/seed') {
      if (!supabase) {
        return res.status(500).json({
          error: 'Supabase not configured',
          message: 'SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required'
        })
      }

      try {
        // Check if products table exists and has data
        const { data: existingProducts, error: fetchError } = await supabase
          .from('products')
          .select('id')
          .limit(1)

        if (fetchError && fetchError.code !== 'PGRST116') {
          // Table doesn't exist or other error - try to insert anyway
          console.log('Fetching products error:', fetchError)
        }

        if (existingProducts && existingProducts.length > 0) {
          return res.status(200).json({
            message: 'Products already seeded',
            count: existingProducts.length
          })
        }

        // Seed the products
        const { data, error } = await supabase
          .from('products')
          .insert(sampleProducts)
          .select()

        if (error) {
          return res.status(500).json({
            error: 'Failed to seed products',
            details: error.message
          })
        }

        return res.status(200).json({
          message: 'Products seeded successfully',
          count: data?.length || 0,
          products: data
        })
      } catch (error: any) {
        return res.status(500).json({
          error: 'Error seeding products',
          message: error.message
        })
      }
    }

    // Generic API response
    return res.status(200).json({
      message: 'Beauty of Joseon API',
      path: pathname,
      method: req.method,
    })
  }

  // Handle page routes - return HTML
  const renderPage = (title: string, content: string) => {
    return `<!DOCTYPE html>
<html>
  <head>
    <title>${title} - Beauty of Joseon</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
      header { background: #f8f8f8; padding: 20px; border-bottom: 1px solid #ddd; }
      nav { display: flex; gap: 20px; margin-bottom: 20px; }
      nav a { text-decoration: none; color: #0066cc; }
      nav a:hover { text-decoration: underline; }
      main { max-width: 1000px; margin: 0 auto; padding: 20px; }
      footer { background: #f8f8f8; padding: 20px; margin-top: 40px; border-top: 1px solid #ddd; text-align: center; color: #666; }
    </style>
  </head>
  <body>
    <header>
      <h1>💄 Beauty of Joseon</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/cart">Cart</a>
      </nav>
    </header>
    <main>
      ${content}
    </main>
    <footer>
      <p>&copy; 2024 Beauty of Joseon. Premium Korean Skincare.</p>
    </footer>
  </body>
</html>`
  }

  // Route to appropriate page
  switch (pathname) {
    case '/':
      return res.status(200).setHeader('Content-Type', 'text/html').send(
        renderPage('Home', `
          <h2>Welcome to Beauty of Joseon</h2>
          <p>Discover the timeless beauty secrets of Joseon era skincare.</p>
          <p><a href="/shop" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #0066cc; color: white; text-decoration: none; border-radius: 4px;">Shop Now</a></p>
        `)
      )

    case '/shop':
      try {
        if (!supabase) {
          // Fallback to sample products if Supabase not configured
          const productsList = sampleProducts
            .map(p => `
              <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 4px;">
                <h4>${p.name}</h4>
                <p>${p.description}</p>
                <p><strong>Price:</strong> ${p.price_aed} AED</p>
                <p><strong>Rating:</strong> ${p.rating} ⭐ (${p.rating_count} reviews)</p>
                <button style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">Add to Cart</button>
              </div>
            `)
            .join('')

          return res.status(200).setHeader('Content-Type', 'text/html').send(
            renderPage('Shop', `
              <h2>Our Products</h2>
              <p>Handcrafted Korean skincare products using traditional Joseon recipes.</p>
              <div style="margin-top: 20px;">${productsList}</div>
            `)
          )
        }

        // Fetch products from Supabase
        const { data: products, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching products:', error)
          // Fallback to sample products on error
          const fallbackList = sampleProducts
            .map(p => `<li>${p.name} - ${p.price_aed} AED</li>`)
            .join('')

          return res.status(200).setHeader('Content-Type', 'text/html').send(
            renderPage('Shop', `
              <h2>Our Products</h2>
              <p>Handcrafted Korean skincare products using traditional Joseon recipes.</p>
              <ul style="margin-top: 20px;">${fallbackList}</ul>
            `)
          )
        }

        // Build product HTML from database
        const productsList = (products && products.length > 0 ? products : sampleProducts)
          .map((p: any) => `
            <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 4px;">
              <h4>${p.name}</h4>
              <p>${p.description}</p>
              <p><strong>Price:</strong> ${p.price_aed} AED</p>
              <p><strong>Rating:</strong> ${p.rating} ⭐ (${p.rating_count} reviews)</p>
              <p><strong>Stock:</strong> ${p.in_stock ? 'In Stock' : 'Out of Stock'}</p>
              <button style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">Add to Cart</button>
            </div>
          `)
          .join('')

        return res.status(200).setHeader('Content-Type', 'text/html').send(
          renderPage('Shop', `
            <h2>Our Products</h2>
            <p>Handcrafted Korean skincare products using traditional Joseon recipes.</p>
            <div style="margin-top: 20px;">${productsList}</div>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">Total products: ${products?.length || sampleProducts.length}</p>
          `)
        )
      } catch (error: any) {
        console.error('Error rendering shop:', error)
        return res.status(500).setHeader('Content-Type', 'text/html').send(
          renderPage('Shop', `
            <h2>Error</h2>
            <p>Failed to load products: ${error.message}</p>
          `)
        )
      }

    case '/cart':
      return res.status(200).setHeader('Content-Type', 'text/html').send(
        renderPage('Shopping Cart', `
          <h2>Your Cart</h2>
          <p>Your shopping cart is currently empty.</p>
          <p><a href="/shop" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #0066cc; color: white; text-decoration: none; border-radius: 4px;">Continue Shopping</a></p>
        `)
      )

    default:
      return res.status(404).setHeader('Content-Type', 'text/html').send(
        renderPage('Not Found', `
          <h2>404 - Page Not Found</h2>
          <p>The page you're looking for doesn't exist.</p>
          <p><a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #0066cc; color: white; text-decoration: none; border-radius: 4px;">Back to Home</a></p>
        `)
      )
  }
}
