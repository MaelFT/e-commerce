import { Outlet, Link, useLocation } from "react-router";
import { Search, ShoppingBag, User, Heart, Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans flex flex-col selection:bg-black selection:text-white">
      {/* Top Banner */}
      <div className="bg-black text-white text-xs py-2 px-4 text-center tracking-wide font-medium">
        Free shipping on all premium orders. <Link to="/products" className="underline underline-offset-2 ml-1">Shop Now</Link>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#FDFDFD]/80 backdrop-blur-md border-b border-zinc-200/50 transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 -ml-2 text-zinc-600 hover:text-black transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tight shrink-0 flex items-center gap-1.5">
            <span className="w-6 h-6 bg-black text-white rounded-md flex items-center justify-center text-xs">A</span>
            Amazone
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-500">
            <Link to="/products" className="hover:text-black transition-colors py-2">Store</Link>
            <Link to="/products?category=audio" className="hover:text-black transition-colors py-2">Audio</Link>
            <Link to="/products?category=pc" className="hover:text-black transition-colors py-2">Computing</Link>
            <Link to="/products?category=accessories" className="hover:text-black transition-colors py-2">Accessories</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2 sm:gap-4 text-zinc-600">
            <Link to="/search" className="p-2 hover:text-black hover:bg-zinc-100 rounded-full transition-all">
              <Search className="w-5 h-5" />
            </Link>
            <Link to="/compare" className="hidden sm:flex p-2 hover:text-black hover:bg-zinc-100 rounded-full transition-all" title="Compare">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="hidden sm:flex p-2 hover:text-black hover:bg-zinc-100 rounded-full transition-all">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/wishlist" className="hidden sm:flex p-2 hover:text-black hover:bg-zinc-100 rounded-full transition-all">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="p-2 hover:text-black hover:bg-zinc-100 rounded-full transition-all relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">2</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
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
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-1.5" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="w-6 h-6 bg-black text-white rounded-md flex items-center justify-center text-xs">A</span>
                  Amazone
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-zinc-500 hover:text-black bg-zinc-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="flex flex-col gap-4 text-lg font-medium">
                <Link to="/products" className="py-2 border-b border-zinc-100" onClick={() => setIsMobileMenuOpen(false)}>Store</Link>
                <Link to="/products?category=audio" className="py-2 border-b border-zinc-100" onClick={() => setIsMobileMenuOpen(false)}>Audio</Link>
                <Link to="/products?category=pc" className="py-2 border-b border-zinc-100" onClick={() => setIsMobileMenuOpen(false)}>Computing</Link>
                <Link to="/products?category=accessories" className="py-2 border-b border-zinc-100" onClick={() => setIsMobileMenuOpen(false)}>Accessories</Link>
              </nav>

              <div className="mt-auto flex flex-col gap-4 pt-8">
                <Link to="/account" className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="w-5 h-5" /> Account
                </Link>
                <Link to="/wishlist" className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>
                  <Heart className="w-5 h-5" /> Wishlist
                </Link>
                <Link to="/compare" className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>
                  <ArrowRight className="w-5 h-5" /> Compare
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-zinc-50 border-t border-zinc-200 mt-auto pt-16 pb-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="text-xl font-bold tracking-tight mb-4 flex items-center gap-1.5">
                <span className="w-6 h-6 bg-black text-white rounded-md flex items-center justify-center text-xs">A</span>
                Amazone
              </Link>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mt-4">
                Premium minimalist tech for modern creators. Designed for simplicity, built for performance.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm mb-4 text-black uppercase tracking-wider">Shop</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li><Link to="/products?category=new" className="hover:text-black transition-colors">New Arrivals</Link></li>
                <li><Link to="/products?category=audio" className="hover:text-black transition-colors">Audio</Link></li>
                <li><Link to="/products?category=pc" className="hover:text-black transition-colors">Computing</Link></li>
                <li><Link to="/products?category=accessories" className="hover:text-black transition-colors">Accessories</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm mb-4 text-black uppercase tracking-wider">Support</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li><Link to="/faq" className="hover:text-black transition-colors">FAQ</Link></li>
                <li><Link to="/shipping" className="hover:text-black transition-colors">Shipping & Returns</Link></li>
                <li><Link to="/warranty" className="hover:text-black transition-colors">Warranty</Link></li>
                <li><Link to="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm mb-4 text-black uppercase tracking-wider">Stay Connected</h4>
              <p className="text-zinc-500 text-sm mb-4">Subscribe for exclusive offers and new releases.</p>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                />
                <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors">
                  Join
                </button>
              </form>
            </div>
          </div>
          
          <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400">
            <p>&copy; {new Date().getFullYear()} Amazone. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-zinc-600 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-zinc-600 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
