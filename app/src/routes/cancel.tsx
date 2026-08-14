import { createFileRoute } from '@tanstack/react-router'

function Cancel() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <div className="text-center">
        <div className="text-6xl mb-4">✕</div>
        <h1 className="text-4xl font-bold text-red-600 mb-4">Order Cancelled</h1>
        <p className="text-gray-600 mb-8">Your payment was not completed. Your cart is still saved.</p>
        <div className="space-x-4">
          <a
            href="/cart"
            className="inline-block bg-joseon-700 hover:bg-joseon-800 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Return to Cart
          </a>
          <a
            href="/shop"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/cancel')({
  component: Cancel,
})
