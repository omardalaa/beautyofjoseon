import { VercelRequest, VercelResponse } from '@vercel/node'

// Vercel serverless function handler
export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Handle OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // API routes
  if (req.url?.startsWith('/api/')) {
    res.status(200).json({
      message: 'Beauty of Joseon API',
      path: req.url,
      method: req.method,
    })
    return
  }

  // Default response for other routes
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Beauty of Joseon</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 40px; }
          h1 { color: #333; }
          p { color: #666; line-height: 1.6; }
          .routes { background: #f5f5f5; padding: 15px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>✨ Beauty of Joseon</h1>
        <p>Premium Korean Skincare Ecommerce Platform</p>
        <div class="routes">
          <h2>Available Routes:</h2>
          <ul>
            <li>GET / - Homepage</li>
            <li>GET /shop - Shop products</li>
            <li>GET /cart - Shopping cart</li>
            <li>POST /api/seed - Seed products database</li>
          </ul>
        </div>
        <p>Server is running successfully on Vercel!</p>
      </body>
    </html>
  `)
}
