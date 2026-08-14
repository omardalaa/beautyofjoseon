import { RootRoute, Router } from '@tanstack/react-router'
import Root from './routes/__root'
import Index from './routes/index'
import Shop from './routes/shop'
import Cart from './routes/cart'

const rootRoute = new RootRoute({
  component: Root,
})

const indexRoute = new RootRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})

const shopRoute = new RootRoute({
  getParentRoute: () => rootRoute,
  path: '/shop',
  component: Shop,
})

const cartRoute = new RootRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: Cart,
})

const routeTree = rootRoute.addChildren([indexRoute, shopRoute, cartRoute])

export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
