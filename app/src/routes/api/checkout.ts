import { createServerFn } from '@tanstack/start'
import { createCheckoutSession } from '~/server/stripe'

export const checkoutAction = createServerFn('POST /api/checkout', async (data: any) => {
  try {
    const session = await createCheckoutSession(data.items)
    return { url: session.url, sessionId: session.id }
  } catch (error) {
    console.error('Checkout error:', error)
    throw new Error('Failed to create checkout session')
  }
})
