import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, Package, ArrowRight, Loader2 } from 'lucide-react'
import PublicLayout from '../components/PublicLayout'
import { useCart } from '../context/CartContext'
import { checkoutApi } from '../api/checkout'

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams()
  const { clearCart } = useCart()
  const sessionId = searchParams.get('session_id')
  const [confirming, setConfirming] = useState(true)

  useEffect(() => {
    if (!sessionId) {
      setConfirming(false)
      return
    }

    clearCart()

    let attempt = 0
    const maxAttempts = 3
    const delay = 2000

    const tryConfirm = () => {
      attempt++
      checkoutApi.confirmSession(sessionId)
        .then(() => setConfirming(false))
        .catch(() => {
          if (attempt < maxAttempts) {
            setTimeout(tryConfirm, delay)
          } else {
            setConfirming(false)
          }
        })
    }

    tryConfirm()
  }, [sessionId]) // eslint-disable-line react-hooks/exhaustive-deps

  if (confirming) {
    return (
      <PublicLayout>
        <div className="flex-grow flex flex-col items-center justify-center py-32 px-4 text-center">
          <Loader2 className="w-10 h-10 animate-spin text-zinc-400 mb-6" />
          <p className="text-lg font-medium text-zinc-600">Confirmation de votre commande en cours…</p>
        </div>
      </PublicLayout>
    )
  }

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
            to="/account?tab=orders"
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
