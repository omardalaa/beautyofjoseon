import { createFileRoute } from '@tanstack/react-router'
import { useCart } from '~/lib/CartContext'

function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-4xl font-bold mb-8">Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600 text-lg">Your cart is empty</p>
              <a href="/shop" className="text-joseon-700 hover:text-joseon-800 mt-4 inline-block">
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.sku} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-joseon-700 font-bold">{item.price.toFixed(2)} AED each</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.sku)}
                        className="ml-auto text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-semibold">
                    {(item.price * item.quantity).toFixed(2)} AED
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-joseon-50 rounded-lg p-6 sticky top-4">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{(total - 20).toFixed(2)} AED</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping (UAE):</span>
                <span>20.00 AED</span>
              </div>
              <div className="border-t border-joseon-200 pt-3 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{total.toFixed(2)} AED</span>
              </div>
            </div>
            <button
              disabled={items.length === 0}
              className="w-full bg-joseon-700 hover:bg-joseon-800 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
            >
              Checkout with Stripe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/cart')({
  component: Cart,
})
