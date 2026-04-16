import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import PublicLayout from '../components/PublicLayout'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useProducts } from '../hooks/useProducts'

export default function WishlistPage() {
  const { products, loading } = useProducts({ per_page: 200 })
  const { addToCart } = useCart()
  const { ids, remove, clear } = useWishlist()

  const wishlistItems = products.filter((p) => ids.has(p.id))

  return (
    <PublicLayout>
      <div className="flex-grow bg-[#FDFDFD]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-2">Mes likes</h1>
              <p className="text-zinc-500">
                {loading ? 'Chargement…' : `${wishlistItems.length} article${wishlistItems.length > 1 ? 's' : ''}`}
              </p>
            </div>
            {wishlistItems.length > 0 && (
              <button
                onClick={clear}
                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-xl hover:border-black hover:text-black transition-colors w-fit"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Tout supprimer
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
            </div>
          ) : wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-zinc-300" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Aucun like pour le moment</h3>
              <p className="text-zinc-500 max-w-md mb-6">
                Like des produits pour les retrouver facilement plus tard.
              </p>
              <Link
                to="/products"
                className="px-6 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                Explorer les produits
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {wishlistItems.map((product) => (
                <div key={product.id} className="group flex flex-col relative">
                  <button
                    onClick={() => remove(product.id)}
                    className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-500 hover:text-red-500 hover:bg-white transition-colors shadow-sm"
                    aria-label="Retirer des likes"
                    title="Retirer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <Link
                    to={`/product/${product.id}`}
                    className="relative aspect-[4/5] bg-zinc-100 rounded-2xl overflow-hidden mb-4 block"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>

                  <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <Link
                        to={`/product/${product.id}`}
                        className="text-sm font-medium text-black hover:text-zinc-600 transition-colors line-clamp-1"
                      >
                        {product.name}
                      </Link>
                      <span className="text-sm font-medium text-black ml-4 shrink-0">{product.price} €</span>
                    </div>
                    <p className="text-xs text-zinc-500 mb-4">{product.category}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-auto w-full py-3 border border-black text-black text-sm font-medium rounded-xl hover:bg-black hover:text-white transition-colors flex items-center justify-center"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" /> Ajouter au panier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}
