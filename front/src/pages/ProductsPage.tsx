import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronDown, Filter, Star, SlidersHorizontal, Check, Search, X } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import PublicLayout from '../components/PublicLayout'

type SortKey = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating'

const CATEGORIES = ['Tous', 'Audio', 'Ordinateurs', 'Accessoires', 'Smartphones', 'Tablettes', 'Écrans']
const MAX_PRICE   = 2500

export default function ProductsPage() {
  const [searchParams] = useSearchParams()
  const categoryParam   = searchParams.get('category')

  const [isFilterOpen,  setIsFilterOpen]  = useState(false)
  const [sortBy,        setSortBy]        = useState<SortKey>('featured')
  const [activeCategory, setActiveCategory] = useState(
    categoryParam
      ? CATEGORIES.find(c => c.toLowerCase() === categoryParam.toLowerCase()) ?? 'Tous'
      : 'Tous'
  )
  const [maxPrice,  setMaxPrice]  = useState(MAX_PRICE)
  const [minRating, setMinRating] = useState(0)

  const { products, loading } = useProducts({ per_page: 100 })

  const filtered = useMemo(() => {
    return products
      .filter(p => activeCategory === 'Tous' || p.category === activeCategory)
      .filter(p => p.price <= maxPrice)
      .filter(p => p.rating >= minRating)
      .sort((a, b) => {
        if (sortBy === 'price-low')  return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        if (sortBy === 'rating')     return b.rating - a.rating
        if (sortBy === 'newest')     return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        return 0
      })
  }, [products, activeCategory, maxPrice, minRating, sortBy])

  const resetFilters = () => {
    setActiveCategory('Tous')
    setMaxPrice(MAX_PRICE)
    setMinRating(0)
  }

  const hasActiveFilters = activeCategory !== 'Tous' || maxPrice < MAX_PRICE || minRating > 0

  return (
    <PublicLayout>
      <div className="flex-grow bg-[#FDFDFD]">

        {/* En-tête de page */}
        <div className="bg-zinc-50 border-b border-zinc-200 py-12">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <nav className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-4">
                  <Link to="/" className="hover:text-black transition-colors">Accueil</Link>
                  <span>/</span>
                  <span className="text-black capitalize">
                    {activeCategory === 'Tous' ? 'Tous les produits' : activeCategory}
                  </span>
                </nav>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
                  {activeCategory === 'Tous' ? 'Tous les produits' : activeCategory}
                </h1>
              </div>

              <div className="flex items-center gap-4">
                {/* Bouton filtres mobile */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="md:hidden flex items-center gap-2 px-4 py-2 text-sm font-medium text-black bg-white border border-zinc-200 rounded-xl shadow-sm"
                >
                  <Filter className="w-4 h-4" />
                  Filtres
                  {hasActiveFilters && (
                    <span className="w-2 h-2 bg-black rounded-full" />
                  )}
                </button>

                {/* Tri */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortKey)}
                    className="appearance-none bg-white border border-zinc-200 rounded-xl px-4 py-2 pr-10 text-sm font-medium text-black shadow-sm focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
                  >
                    <option value="featured">À la une</option>
                    <option value="newest">Nouveautés</option>
                    <option value="price-low">Prix croissant</option>
                    <option value="price-high">Prix décroissant</option>
                    <option value="rating">Mieux notés</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-12">

            {/* Sidebar filtres */}
            <aside className={`w-full md:w-64 shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>

              {/* Fermer filtres sur mobile */}
              <div className="flex items-center justify-between mb-6 md:hidden">
                <p className="text-sm font-semibold text-black">Filtres</p>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X className="w-5 h-5 text-zinc-500" />
                </button>
              </div>

              <div className="sticky top-24 space-y-8">

                {/* Catégories */}
                <div>
                  <h3 className="text-xs font-semibold tracking-wider text-black uppercase mb-4">Catégories</h3>
                  <ul className="space-y-2">
                    {CATEGORIES.map((cat) => (
                      <li key={cat}>
                        <button
                          onClick={() => setActiveCategory(cat)}
                          className={`text-sm w-full text-left flex items-center justify-between py-1 transition-colors ${
                            activeCategory === cat ? 'text-black font-medium' : 'text-zinc-500 hover:text-black'
                          }`}
                        >
                          <span>{cat}</span>
                          {activeCategory === cat && <Check className="w-3.5 h-3.5" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="border-zinc-200" />

                {/* Prix */}
                <div>
                  <h3 className="text-xs font-semibold tracking-wider text-black uppercase mb-4">Prix</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-zinc-500">
                      <span>0 €</span>
                      <span className="font-medium text-black">{maxPrice} €</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={MAX_PRICE}
                      step="50"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      className="w-full accent-black"
                    />
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {[
                        { label: '< 100 €',       fn: () => setMaxPrice(100)  },
                        { label: '< 500 €',       fn: () => setMaxPrice(500)  },
                        { label: '< 1 000 €',     fn: () => setMaxPrice(1000) },
                        { label: '> 1 000 €',     fn: () => setMaxPrice(MAX_PRICE) },
                      ].map(({ label, fn }) => (
                        <button
                          key={label}
                          onClick={fn}
                          className="px-2 py-1.5 text-xs border border-zinc-200 rounded-lg hover:border-black transition-colors"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <hr className="border-zinc-200" />

                {/* Note */}
                <div>
                  <h3 className="text-xs font-semibold tracking-wider text-black uppercase mb-4">Note</h3>
                  <ul className="space-y-3">
                    {[4, 3, 2, 1].map((rating) => (
                      <li key={rating}>
                        <button
                          onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                          className={`text-sm flex items-center gap-3 transition-colors ${
                            minRating === rating ? 'text-black font-medium' : 'text-zinc-500 hover:text-black'
                          }`}
                        >
                          <div className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors shrink-0 ${
                            minRating === rating ? 'bg-black border-black text-white' : 'border-zinc-300'
                          }`}>
                            {minRating === rating && <Check className="w-3 h-3" />}
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-300'}`}
                              />
                            ))}
                            <span className="ml-1 text-xs">& +</span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reset */}
                {hasActiveFilters && (
                  <>
                    <hr className="border-zinc-200" />
                    <button
                      onClick={resetFilters}
                      className="w-full text-sm text-zinc-500 hover:text-black transition-colors flex items-center gap-2"
                    >
                      <X className="w-3.5 h-3.5" />
                      Réinitialiser les filtres
                    </button>
                  </>
                )}

              </div>
            </aside>

            {/* Grille produits */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between text-sm text-zinc-500">
                {loading ? (
                  <p>Chargement…</p>
                ) : (
                  <p>{filtered.length} résultat{filtered.length > 1 ? 's' : ''}</p>
                )}
                <div className="hidden md:flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Affichage filtré</span>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-32">
                  <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-8 h-8 text-zinc-300" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">Aucun produit trouvé</h3>
                  <p className="text-zinc-500 max-w-md text-sm">
                    Essayez d'ajuster vos filtres pour trouver ce que vous cherchez.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-6 px-6 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors"
                  >
                    Effacer les filtres
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                  {filtered.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="group flex flex-col"
                    >
                      <div className="relative aspect-[4/5] bg-zinc-100 rounded-2xl overflow-hidden mb-4">
                        {product.is_new && (
                          <div className="absolute top-4 left-4 z-10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-black uppercase bg-white rounded-md shadow-sm">
                            Nouveau
                          </div>
                        )}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          <button className="w-full py-3 bg-white/90 backdrop-blur-md text-black border border-zinc-200 text-sm font-medium rounded-xl hover:bg-black hover:text-white transition-colors">
                            Voir le produit
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-sm font-medium text-black group-hover:text-zinc-600 transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <span className="text-sm font-medium text-black ml-4 shrink-0">{product.price} €</span>
                        </div>
                        <p className="text-xs text-zinc-500 mb-2">{product.category}</p>
                        <div className="flex items-center mt-auto pt-1">
                          <Star className="w-3.5 h-3.5 fill-current text-zinc-900" />
                          <span className="text-xs font-medium ml-1.5 text-zinc-900">{product.rating}</span>
                          <span className="text-xs text-zinc-400 ml-1.5">({product.reviews_count})</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
