import client from './client'

interface CheckoutPayload {
  items: { product_id: number; quantity: number }[]
}

export const checkoutApi = {
  createSession: (payload: CheckoutPayload): Promise<{ url: string }> =>
    client.post<{ url: string }>('/checkout/session', payload).then(r => r.data),
}
