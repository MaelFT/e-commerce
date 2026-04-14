import client from './client'
import type { Order } from '../types'

interface CheckoutPayload {
  items: { product_id: number; quantity: number }[]
  shipping_address: string
  shipping_city: string
  shipping_postal_code: string
  shipping_country: string
}

export const checkoutApi = {
  createSession: (payload: CheckoutPayload): Promise<{ url: string }> =>
    client.post<{ url: string }>('/checkout/session', payload).then(r => r.data),

  confirmSession: (sessionId: string): Promise<{ order: Order }> =>
    client.post<{ order: Order }>('/checkout/confirm', { session_id: sessionId }).then(r => r.data),
}
