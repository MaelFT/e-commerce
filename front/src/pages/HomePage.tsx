import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Heart, Star } from 'lucide-react'
import { motion } from 'motion/react'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import PublicLayout from '../components/PublicLayout'
import { useWishlist } from '../context/WishlistContext'

export default function HomePage() {
  const { products, loading } = useProducts({ per_page: 12 })
  const { addToCart } = useCart()
  const { has, toggle } = useWishlist()

  const safeProducts = products ?? []
  const featuredProduct = safeProducts[0] ?? null
  const bestSellers     = safeProducts.slice(1, 5)
  const bgProduct       = safeProducts[5] ?? null

  const categories = [
    { name: 'Audio',       image: safeProducts.find(p => p.category === 'Audio')?.image       ?? '', span: 'md:col-span-1' },
    { name: 'Ordinateurs', image: safeProducts.find(p => p.category === 'Ordinateurs')?.image ?? '', span: 'md:col-span-2 md:row-span-2' },
    { name: 'Accessoires', image: safeProducts.find(p => p.category === 'Accessoires')?.image ?? '', span: 'md:col-span-1' },
  ]

  if (loading) {
    return (
      <PublicLayout>
        <div className="flex-grow flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div className="flex flex-col w-full">

        {/* Hero */}
        <section className="relative w-full h-[85vh] min-h-[600px] flex items-center bg-zinc-100 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={featuredProduct?.image}
              alt="Hero Product"
              className="w-full h-full object-cover object-center opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 via-zinc-100/80 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="max-w-xl"
            >
              {featuredProduct?.is_new && (
                <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-black uppercase bg-white/80 backdrop-blur-sm rounded-full">
                  Nouveauté
                </div>
              )}

              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-6 leading-[1.1]">
                {featuredProduct?.name.split(' ')[0]}{' '}
                <br />
                <span className="text-zinc-500 font-light">
                  {featuredProduct?.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-zinc-600 mb-8 max-w-md font-light">
                {featuredProduct?.description.slice(0, 120)}…
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/product/${featuredProduct?.id}`}
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white bg-black rounded-xl hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Acheter — {featuredProduct?.price} €
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-black bg-white rounded-xl hover:bg-zinc-100 transition-all shadow-sm border border-zinc-200"
                >
                  Explorer la collection
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Catégories */}
        <section className="py-24 bg-[#FDFDFD]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Catégories</h2>
              <Link
                to="/products"
                className="group flex items-center text-sm font-medium text-zinc-500 hover:text-black transition-colors"
              >
                Voir tout <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.filter(c => c.image).map((category, idx) => (
                <Link
                  key={idx}
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className={`relative group block rounded-2xl overflow-hidden bg-zinc-100 ${category.span} min-h-[300px]`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute bottom-6 left-6 flex items-center justify-between right-6">
                    <h3 className="text-2xl font-semibold text-white tracking-tight">{category.name}</h3>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Meilleures ventes */}
        <section className="py-24 bg-white border-t border-zinc-100">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-2">Meilleures ventes</h2>
                <p className="text-zinc-500 font-light">Les produits dont tout le monde parle.</p>
              </div>
              <Link
                to="/products"
                className="group hidden sm:flex items-center text-sm font-medium text-zinc-500 hover:text-black transition-colors"
              >
                Tout voir <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {bestSellers.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/5] bg-zinc-100 rounded-2xl overflow-hidden mb-4">
                    {product.is_new && (
                      <div className="absolute top-4 left-4 z-10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-black uppercase bg-white rounded-md">
                        Nouveau
                      </div>
                    )}
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product.id) }}
                      className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-700 hover:text-black hover:bg-white transition-colors shadow-sm"
                      aria-label={has(product.id) ? 'Retirer des likes' : 'Ajouter aux likes'}
                      title={has(product.id) ? 'Retirer des likes' : 'Ajouter aux likes'}
                    >
                      <Heart className={has(product.id) ? 'w-4 h-4 fill-black text-black' : 'w-4 h-4'} />
                    </button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product) }}
                        className="w-full py-3 bg-black/90 backdrop-blur-sm text-white text-sm font-medium rounded-xl hover:bg-black transition-colors"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-base font-medium text-black group-hover:text-zinc-600 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <span className="text-base font-medium text-black ml-4">{product.price} €</span>
                    </div>
                    <p className="text-sm text-zinc-500 mb-2">{product.category}</p>
                    <div className="flex items-center mt-auto">
                      <div className="flex items-center text-zinc-900">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-medium ml-1.5">{product.rating}</span>
                      </div>
                      <span className="text-xs text-zinc-400 ml-1.5">({product.reviews_count})</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-32 bg-zinc-900 text-white overflow-hidden relative">
          {bgProduct && (
            <div className="absolute inset-0 z-0 opacity-20">
              <img
                src={bgProduct.image}
                alt="Background"
                className="w-full h-full object-cover grayscale mix-blend-overlay"
              />
            </div>
          )}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
              Un design qui parle.
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Nous croyons que la technologie doit vous libérer, pas vous distraire. Notre collection est méticuleusement sélectionnée pour ceux qui exigent un minimalisme extrême, une qualité premium et des performances inégalées.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-black bg-white rounded-xl hover:bg-zinc-200 transition-colors"
            >
              Notre philosophie
            </Link>
          </div>
        </section>

      </div>
    </PublicLayout>
  )
}
