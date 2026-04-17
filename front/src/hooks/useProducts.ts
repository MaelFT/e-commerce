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

    productsApi
      .list(filters)
      .then((res) => {
        const maybeData = (res as any)?.data
        if (Array.isArray(maybeData)) {
          setProducts(maybeData)
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
