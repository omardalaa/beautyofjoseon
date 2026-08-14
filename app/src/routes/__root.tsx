import { RootRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import { CartProvider } from '~/lib/CartContext'
import '../index.css'

function Root() {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-white">
        <header className="bg-gradient-to-r from-joseon-700 to-joseon-800 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Beauty of Joseon</h1>
              <nav className="flex gap-8">
                <a href="/" className="hover:text-joseon-100 transition">Home</a>
                <a href="/shop" className="hover:text-joseon-100 transition">Shop</a>
                <a href="/cart" className="hover:text-joseon-100 transition">Cart</a>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <footer className="bg-joseon-900 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p>&copy; 2026 Beauty of Joseon. All rights reserved.</p>
              <p className="text-joseon-300 mt-2">Premium Korean Skincare Delivered to UAE</p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  )
}

export const Route = new RootRoute({
  component: Root,
})
