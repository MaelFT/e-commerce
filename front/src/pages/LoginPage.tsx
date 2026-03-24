import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../components/AuthLayout'
import type { LoginCredentials, ValidationErrors } from '../types'

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
    <AuthLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Bon retour</h2>
        <p className="text-gray-500 text-sm">Connectez-vous à votre espace Amazone</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="vous@exemple.com"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500 transition-all"
          />
          {errors.email && <p className="text-red-400 text-xs">{errors.email[0]}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500 transition-all"
          />
          {errors.password && <p className="text-red-400 text-xs">{errors.password[0]}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 text-white font-semibold py-3 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)' }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Connexion…
            </span>
          ) : 'Se connecter'}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-white/8">
        <p className="text-center text-sm text-gray-500">
          Pas encore de compte ?{' '}
          <Link to="/register" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">
            Créer un compte
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
