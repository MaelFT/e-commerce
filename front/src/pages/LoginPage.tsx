import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import PublicLayout from '../components/PublicLayout'
import type { LoginCredentials, ValidationErrors } from '../types'
import logo from '../assets/cart_black.png'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate  = useNavigate()

  const [form, setForm]       = useState<LoginCredentials>({ email: '', password: '' })
  const [errors, setErrors]   = useState<ValidationErrors>({})
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setErrors({})
    setLoading(true)
    try {
      await login(form)
      navigate('/')
    } catch (err: unknown) {
      const apiErr = err as { errors?: ValidationErrors; message?: string }
      setErrors(apiErr.errors ?? { email: [apiErr.message ?? 'Une erreur est survenue.'] })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PublicLayout>
    <div className="flex-grow flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-3xl p-8 sm:p-12 shadow-sm">

        {/* En-tête */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <img src={logo} alt="Amazone" className="w-24 h-24 object-contain" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-black mb-2">
            Bon retour
          </h1>
          <p className="text-sm text-zinc-500">
            Entrez vos identifiants pour accéder à votre compte.
          </p>
        </div>

        {/* Formulaire */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          <div className="space-y-2">
            <label className="text-xs font-semibold tracking-wider text-black uppercase">
              Adresse e-mail
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="vous@exemple.com"
              required
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-sm transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-xs font-semibold tracking-wider text-black uppercase">
                Mot de passe
              </label>
            </div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-sm transition-colors"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password[0]}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-black text-white text-sm font-medium rounded-xl hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center mt-8"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Connexion…
              </span>
            ) : (
              <>
                Se connecter
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </form>

        {/* Lien inscription */}
        <div className="mt-8 text-center text-sm text-zinc-500">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-black font-medium hover:underline">
            Créer un compte
          </Link>
        </div>

      </div>
    </div>
    </PublicLayout>
  )
}
