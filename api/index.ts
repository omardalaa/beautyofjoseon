import { VercelRequest, VercelResponse } from '@vercel/node'

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
    // API seed endpoint - return JSON
    if (pathname === '/api/seed') {
      return res.status(200).json({
        message: 'Seed endpoint - ready to seed products',
        method: req.method,
      })
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
      return res.status(200).setHeader('Content-Type', 'text/html').send(
        renderPage('Shop', `
          <h2>Our Products</h2>
          <p>Handcrafted Korean skincare products using traditional Joseon recipes.</p>
          <ul style="margin-top: 20px;">
            <li>Essential Essence Toner</li>
            <li>Snow Brightening Cream</li>
            <li>Ginseng Deep Serum</li>
            <li>Pearl Radiance Mask</li>
          </ul>
        `)
      )

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
