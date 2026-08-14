import { createFileRoute } from '@tanstack/react-router'

function Success() {
  const { session_id } = Route.useSearch()

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <div className="text-center">
        <div className="text-6xl mb-4">✓</div>
        <h1 className="text-4xl font-bold text-joseon-700 mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-4">Thank you for your purchase.</p>
        {session_id && (
          <p className="text-sm text-gray-500">Session ID: {session_id}</p>
        )}
        <div className="mt-8">
          <a
            href="/shop"
            className="inline-block bg-joseon-700 hover:bg-joseon-800 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/success')({
  component: Success,
  validateSearch: (search: Record<string, any>) => ({
    session_id: search.session_id || '',
  }),
})
