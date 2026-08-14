import { createFileRoute } from '@tanstack/react-router'
import { useCart } from '~/lib/CartContext'

const PRODUCTS = [
  {
    id: '1',
    sku: 'boj-cleanse-001',
    name: 'Ginseng Cleansing Oil',
    description: 'Traditional Korean ginseng cleansing oil for deep pore cleansing',
    price: 96.48,
    image: 'https://via.placeholder.com/300x300?text=Ginseng+Oil',
  },
  {
    id: '2',
    sku: 'boj-toner-001',
    name: 'Hwasal Essence Toner',
    description: 'Essence toner with Hwasang extract for revitalized skin',
    price: 118.80,
    image: 'https://via.placeholder.com/300x300?text=Essence+Toner',
  },
  {
    id: '3',
    sku: 'boj-serum-001',
    name: 'Red Bean Nourishing Serum',
    description: 'Nourishing serum with red bean peptides',
    price: 145.35,
    image: 'https://via.placeholder.com/300x300?text=Bean+Serum',
  },
]

function Shop() {
  const { addItem } = useCart()

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    addItem({
      sku: product.sku,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
    alert(`${product.name} added to cart!`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-4xl font-bold mb-2">Our Products</h2>
      <p className="text-gray-600 mb-8">Premium Korean skincare formulations</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover bg-gray-200"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-joseon-700">{product.price.toFixed(2)} AED</span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-joseon-700 hover:bg-joseon-800 text-white px-4 py-2 rounded-lg transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/shop')({
  component: Shop,
})
