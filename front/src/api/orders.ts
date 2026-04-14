import client from './client'
import type { Order, PaginatedResponse } from '../types'

export const ordersApi = {
  list: (): Promise<PaginatedResponse<Order>> =>
    client.get<PaginatedResponse<Order>>('/orders').then(r => r.data),

  get: (id: number): Promise<Order> =>
    client.get<Order>(`/orders/${id}`).then(r => r.data),
}
