import { createRequestHandler } from '@tanstack/start'
import { router } from '~/router'

export const handler = createRequestHandler({
  router,
})

export default handler
