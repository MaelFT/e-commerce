import client from './client'
import type { PaginatedResponse, Product } from '../types'

const BASE = '/products'

export interface ProductFilters {
  category?: string
  search?: string
  new?: boolean
  per_page?: number
  page?: number
}

export const productsApi = {
  list: (filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> =>
    client.get<PaginatedResponse<Product>>(BASE, { params: filters }).then(r => r.data),

  get: (id: number): Promise<Product> =>
    client.get<Product>(`${BASE}/${id}`).then(r => r.data),
}
