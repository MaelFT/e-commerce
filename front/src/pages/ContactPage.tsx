import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Clock, Send, CheckCircle, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import PublicLayout from '../components/PublicLayout'
import { contactApi } from '../api/contact'

interface Form {
  name: string
  email: string
  subject: string
  message: string
}

const SUBJECTS = [
  'Question sur une commande',
  'Retour / remboursement',
  'Problème technique',
  'Partenariat',
  'Autre',
]

const INFO = [
  {
    icon: Mail,
    label: 'E-mail',
    value: 'contact@amazone.fr',
    sub: 'Réponse sous 24h ouvrées',
  },
  {
    icon: MapPin,
    label: 'Adresse',
    value: 'Paris, France',
    sub: 'Siège social',
  },
  {
    icon: Clock,
    label: 'Horaires',
    value: 'Lun – Ven, 9h – 18h',
    sub: 'Heure de Paris (CET)',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState<Form>({
    name: '',
    email: '',
    subject: SUBJECTS[0],
    message: '',
  })
  const [loading,   setLoading]   = useState(false)
  const [success,   setSuccess]   = useState(false)
  const [error,     setError]     = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<Form>>({})

  const set = (key: keyof Form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [key]: e.target.value }))
    setFieldErrors(prev => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setFieldErrors({})
    setLoading(true)

    try {
      await contactApi.send(form)
      setSuccess(true)
      setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' })
    } catch (err: any) {
      const data = err?.response?.data
      if (data?.errors) {
        const mapped: Partial<Form> = {}
        for (const [k, v] of Object.entries(data.errors)) {
          mapped[k as keyof Form] = (v as string[])[0]
        }
        setFieldErrors(mapped)
      } else {
        setError(data?.message ?? 'Une erreur est survenue. Veuillez réessayer.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <PublicLayout>
      <div className="flex-grow bg-[#FDFDFD]">

        {/* Hero */}
        <div className="border-b border-zinc-200 py-16 md:py-24">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-4">Support</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black mb-4">Contactez-nous</h1>
            <p className="text-zinc-500 text-lg max-w-xl">
              Une question, un problème ou juste envie de discuter ?
              Notre équipe vous répond rapidement.
            </p>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

            {/* Infos de contact */}
            <div className="w-full lg:w-2/5 space-y-8">
              {INFO.map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-base font-medium text-black">{value}</p>
                    <p className="text-sm text-zinc-500 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}

              <div className="mt-12 p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
                <p className="text-sm font-semibold text-black mb-2">Délai de réponse moyen</p>
                <p className="text-4xl font-bold text-black tracking-tight">
                  &lt; 24h
                </p>
                <p className="text-sm text-zinc-500 mt-1">En jours ouvrés</p>
              </div>
            </div>

            {/* Formulaire */}
            <div className="w-full lg:w-3/5">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center text-center py-20"
                  >
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-black mb-2">Message envoyé !</h2>
                    <p className="text-zinc-500 max-w-sm mb-8">
                      Merci pour votre message. Notre équipe vous répondra dans les meilleurs délais.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-6 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Nom complet <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={set('name')}
                          placeholder="Jean Dupont"
                          className={`w-full px-4 py-3.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-1 transition-all ${
                            fieldErrors.name
                              ? 'border-red-400 focus:ring-red-400'
                              : 'border-zinc-300 focus:ring-black focus:border-black'
                          }`}
                        />
                        {fieldErrors.name && (
                          <p className="text-xs text-red-500 mt-1.5">{fieldErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Adresse e-mail <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={set('email')}
                          placeholder="jean@exemple.fr"
                          className={`w-full px-4 py-3.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-1 transition-all ${
                            fieldErrors.email
                              ? 'border-red-400 focus:ring-red-400'
                              : 'border-zinc-300 focus:ring-black focus:border-black'
                          }`}
                        />
                        {fieldErrors.email && (
                          <p className="text-xs text-red-500 mt-1.5">{fieldErrors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Sujet <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={form.subject}
                        onChange={set('subject')}
                        className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all appearance-none"
                      >
                        {SUBJECTS.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={form.message}
                        onChange={set('message')}
                        rows={6}
                        placeholder="Décrivez votre demande en détail…"
                        className={`w-full px-4 py-3.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-1 transition-all resize-none ${
                          fieldErrors.message
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-zinc-300 focus:ring-black focus:border-black'
                        }`}
                      />
                      <div className="flex justify-between items-center mt-1.5">
                        {fieldErrors.message ? (
                          <p className="text-xs text-red-500">{fieldErrors.message}</p>
                        ) : (
                          <span />
                        )}
                        <p className="text-xs text-zinc-400 text-right">
                          {form.message.length} / 2000
                        </p>
                      </div>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-14 bg-black text-white text-base font-medium rounded-xl hover:bg-zinc-800 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Envoyer le message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
