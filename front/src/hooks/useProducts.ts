import { useState, useEffect } from 'react'
import { productsApi, type ProductFilters } from '../api/products'
import type { Product } from '../types'

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: string | null
}

export function useProducts(filters: ProductFilters = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading]   = useState<boolean>(true)
  const [error, setError]       = useState<string | null>(null)

  const key = JSON.stringify(filters)

  useEffect(() => {
    setLoading(true)
    setError(null)

    const stableFilters = JSON.parse(key) as ProductFilters

    productsApi
      .list(stableFilters)
      .then((res) => {
        // Laravel pagination shape: { data: Product[], ... }
        // If the API/proxy returns an unexpected payload, avoid crashing the UI.
        const maybeData: unknown = (res as { data?: unknown } | null | undefined)?.data
        if (Array.isArray(maybeData)) {
          setProducts(maybeData as Product[])
          return
        }
        setProducts([])
        setError('Réponse API invalide lors du chargement des produits.')
      })
      .catch(() => {
        setProducts([])
        setError('Impossible de charger les produits.')
      })
      .finally(() => setLoading(false))
  }, [key])

  return { products, loading, error }
}
