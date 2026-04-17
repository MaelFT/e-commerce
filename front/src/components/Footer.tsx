import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 mt-auto pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-black text-white grid place-items-center text-xs font-black tracking-tight">
                A
              </span>
              Amazone
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mt-4">
              Premium minimalist tech for modern creators. Designed for simplicity, built for performance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-black uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li>
                <Link to="/products" className="hover:text-black transition-colors">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link to="/products?category=audio" className="hover:text-black transition-colors">
                  Audio
                </Link>
              </li>
              <li>
                <Link to="/products?category=pc" className="hover:text-black transition-colors">
                  Informatique
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="hover:text-black transition-colors">
                  Accessoires
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-black uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li>
                <Link to="/faq" className="hover:text-black transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-black transition-colors">
                  Livraison & retours
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="hover:text-black transition-colors">
                  Garantie
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-black transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-black uppercase tracking-wider">Stay Connected</h4>
            <p className="text-zinc-500 text-sm mb-4">Subscribe for exclusive offers and new releases.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400">
          <p>&copy; {new Date().getFullYear()} Amazone. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-zinc-600 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-zinc-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

