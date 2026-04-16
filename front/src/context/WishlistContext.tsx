import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

interface WishlistContextType {
  ids: Set<number>
  count: number
  has: (productId: number) => boolean
  add: (productId: number) => void
  remove: (productId: number) => void
  toggle: (productId: number) => void
  clear: () => void
}

const STORAGE_KEY = 'wishlist'

const WishlistContext = createContext<WishlistContextType | null>(null)

function loadWishlistIds(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    if (!Array.isArray(parsed)) return []
    return parsed.map((x) => Number(x)).filter((x) => Number.isFinite(x))
  } catch {
    return []
  }
}

function saveWishlistIds(ids: number[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [idList, setIdList] = useState<number[]>(loadWishlistIds)

  useEffect(() => {
    saveWishlistIds(Array.from(new Set(idList)))
  }, [idList])

  const ids = useMemo(() => new Set(idList), [idList])

  const add = useCallback((productId: number) => {
    setIdList((prev: number[]) => (prev.includes(productId) ? prev : [...prev, productId]))
  }, [])

  const remove = useCallback((productId: number) => {
    setIdList((prev: number[]) => prev.filter((id: number) => id !== productId))
  }, [])

  const toggle = useCallback((productId: number) => {
    setIdList((prev: number[]) =>
      prev.includes(productId) ? prev.filter((id: number) => id !== productId) : [...prev, productId]
    )
  }, [])

  const has = useCallback((productId: number) => ids.has(productId), [ids])

  const clear = useCallback(() => setIdList([]), [])

  const value: WishlistContextType = {
    ids,
    count: ids.size,
    has,
    add,
    remove,
    toggle,
    clear,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist(): WishlistContextType {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist doit être utilisé dans un WishlistProvider')
  return ctx
}
