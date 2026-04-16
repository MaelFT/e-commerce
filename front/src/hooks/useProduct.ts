import { useState, useEffect } from 'react'
import { productsApi } from '../api/products'
import type { Product } from '../types'

interface UseProductReturn {
  product: Product | null
  loading: boolean
  error: string | null
}

export function useProduct(id: number | null): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    setLoading(true)
    setError(null)

    productsApi
      .get(id)
      .then(setProduct)
      .catch(() => setError('Impossible de charger le produit.'))
      .finally(() => setLoading(false))
  }, [id])

  return { product, loading, error }
}
