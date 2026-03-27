import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingBag, User, Heart, Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/cart_black.png'

const navLinks = [
  { to: '/products',                    label: 'Boutique' },
  { to: '/products?category=audio',     label: 'Audio' },
  { to: '/products?category=pc',        label: 'Informatique' },
  { to: '/products?category=accessories', label: 'Accessoires' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const location   = useLocation()
  const { user }   = useAuth()
  const accountHref = user ? '/account' : '/login'

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#FDFDFD]/80 backdrop-blur-md border-b border-zinc-200/50 transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Bouton menu mobile */}
          <button
            className="lg:hidden p-2 -ml-2 text-zinc-600 hover:text-black transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tight shrink-0 flex items-center gap-2">
            <img src={logo} alt="Amazone" className="w-11 h-11 object-contain translate-y-1" />
            Amazone
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-500">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-black transition-colors py-2">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icônes */}
          <div className="flex items-center gap-2 sm:gap-4 text-zinc-600">
            <Link to="/search" className="p-2 hover:text-black hover:bg-zinc-100 rounded-full transition-all">
              <Search className="w-5 h-5" />
            </Link>
            <Link to="/compare" className="hidden sm:flex p-2 hover:text-black hover:bg-zinc-100 rounded-full transition-all" title="Comparer">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to={accountHref} className="hidden sm:flex p-2 hover:text-black hover:bg-zinc-100 rounded-full transition-all">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/wishlist" className="hidden sm:flex p-2 hover:text-black hover:bg-zinc-100 rounded-full transition-all">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="p-2 hover:text-black hover:bg-zinc-100 rounded-full transition-all relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Menu mobile overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <Link
                  to="/"
                  className="text-xl font-bold tracking-tight flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img src={logo} alt="Amazone" className="w-9 h-9 object-contain translate-y-0.5" />
                  Amazone
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-zinc-500 hover:text-black bg-zinc-100 rounded-full"
                  aria-label="Fermer le menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 text-lg font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="py-2 border-b border-zinc-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-4 pt-8">
                <Link
                  to={accountHref}
                  className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" /> Mon compte
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart className="w-5 h-5" /> Liste de souhaits
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingBag className="w-5 h-5" /> Panier
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
