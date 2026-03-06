import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../components/AuthLayout'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate     = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)
    try {
      await register(form)
      navigate('/')
    } catch (err) {
      setErrors(err.errors ?? { name: [err.message ?? 'Une erreur est survenue.'] })
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { name: 'name',                  label: 'Nom complet',          type: 'text',     placeholder: 'Jean Dupont' },
    { name: 'email',                 label: 'E-mail',               type: 'email',    placeholder: 'vous@exemple.com' },
    { name: 'password',              label: 'Mot de passe',         type: 'password', placeholder: 'Minimum 8 caractères' },
    { name: 'password_confirmation', label: 'Confirmer le mot de passe', type: 'password', placeholder: '••••••••' },
  ]

  return (
    <AuthLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Créer un compte</h2>
        <p className="text-gray-500 text-sm">Rejoignez des milliers d'acheteurs sur Amazone</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500 focus:bg-white/8 transition-all"
            />
            {errors[field.name] && (
              <p className="text-red-400 text-xs">{errors[field.name][0]}</p>
            )}
          </div>
        ))}

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
              Création…
            </span>
          ) : (
            'Créer mon compte'
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-white/8">
        <p className="text-center text-sm text-gray-500">
          Déjà un compte ?{' '}
          <Link
            to="/login"
            className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
