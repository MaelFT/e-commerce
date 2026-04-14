import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'
import PublicLayout from '../components/PublicLayout'
import { useCart } from '../context/CartContext'

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams()
  const { clearCart } = useCart()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      clearCart()
    }
  }, [sessionId, clearCart])

  return (
    <PublicLayout>
      <div className="flex-grow flex flex-col items-center justify-center py-32 px-4 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4">
          Merci pour votre commande !
        </h1>
        <p className="text-zinc-500 mb-10 max-w-md">
          Votre paiement a été confirmé. Vous recevrez un e-mail de confirmation avec les détails de votre commande.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/account"
            className="px-8 py-4 bg-black text-white text-sm font-medium rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center"
          >
            <Package className="w-4 h-4 mr-2" />
            Voir mes commandes
          </Link>
          <Link
            to="/products"
            className="px-8 py-4 bg-zinc-100 text-black text-sm font-medium rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center"
          >
            Continuer mes achats
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </PublicLayout>
  )
}
