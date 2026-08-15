import { VercelRequest, VercelResponse } from '@vercel/node'

// Main handler for Vercel serverless function
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // API routes
  if (req.url?.startsWith('/api/')) {
    // Return a basic API response
    res.status(200).json({ message: 'API endpoint', path: req.url })
    return
  }

  // Homepage
  res.status(200).html(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Beauty of Joseon</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <h1>Beauty of Joseon - Ecommerce</h1>
        <p>Server is running. Routes: /, /shop, /cart, /api/seed</p>
      </body>
    </html>
  `)
}
