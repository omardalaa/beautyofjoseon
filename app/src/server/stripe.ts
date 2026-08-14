import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
})

export async function createCheckoutSession(items: Array<{ sku: string; name: string; price: number; quantity: number }>) {
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'aed',
      product_data: {
        name: item.name,
        metadata: { sku: item.sku }
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }))

  // Add shipping
  lineItems.push({
    price_data: {
      currency: 'aed',
      product_data: {
        name: 'Shipping (UAE)',
      },
      unit_amount: 2000, // 20 AED
    },
    quantity: 1,
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.VERCEL_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.VERCEL_URL || 'http://localhost:3000'}/cart`,
    customer_email: '', // Will be set by checkout form
  })

  return session
}

export async function verifySession(sessionId: string) {
  return await stripe.checkout.sessions.retrieve(sessionId)
}
