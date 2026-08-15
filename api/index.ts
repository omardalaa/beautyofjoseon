import { VercelRequest, VercelResponse } from '@vercel/node'
import { Router } from '@tanstack/react-router'
import { routeTree } from '../app/src/routeTree.gen'

// Create router from auto-generated file-based route tree
const router = new Router({ routeTree })

// Vercel serverless function handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Route the request using TanStack Router
    const matchedRoute = router.matchRoute({
      pathname: req.url || '/',
    })

    if (!matchedRoute) {
      res.status(404).json({ error: 'Not Found' })
      return
    }

    // Return success response
    res.status(200).json({
      message: 'Beauty of Joseon Server',
      path: req.url,
      matched: true,
    })
  } catch (error) {
    console.error('Router error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
