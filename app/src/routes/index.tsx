import { createFileRoute } from '@tanstack/react-router'

function Home() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-joseon-900 mb-4">
            Beauty of Joseon
          </h1>
          <p className="text-xl text-gray-600">
            Premium Korean Skincare - Delivered to Your Doorstep in UAE
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-joseon-50 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-2">35+ Premium Products</h3>
            <p className="text-gray-600">Carefully curated Korean skincare essentials</p>
          </div>
          <div className="bg-joseon-50 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-xl font-bold mb-2">100% Authentic</h3>
            <p className="text-gray-600">Directly sourced from official distributors</p>
          </div>
          <div className="bg-joseon-50 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold mb-2">Fast Delivery in UAE</h3>
            <p className="text-gray-600">Quick shipping with flat 20 AED fee</p>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/shop"
            className="inline-block bg-joseon-700 hover:bg-joseon-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
})
