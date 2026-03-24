import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

interface Stat {
  label: string
  value: string
  sub: string
}

interface NavItem {
  icon: string
  label: string
  active: boolean
}

const navItems: NavItem[] = [
  { icon: '🏠', label: 'Tableau de bord', active: true },
  { icon: '📦', label: 'Mes commandes',   active: false },
  { icon: '❤️',  label: 'Favoris',         active: false },
  { icon: '⚙️', label: 'Paramètres',      active: false },
]

const stats: Stat[] = [
  { label: 'Commandes',  value: '0', sub: 'Total' },
  { label: 'En attente', value: '0', sub: 'À traiter' },
  { label: 'Livrées',    value: '0', sub: 'Terminées' },
  { label: 'Panier',     value: '0', sub: 'Articles' },
]

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate         = useNavigate()

  const handleLogout = async (): Promise<void> => {
    await logout()
    navigate('/login')
  }

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-[#0c0c16] text-white flex">

      {/* Sidebar */}
      <aside className="hidden lg:flex w-60 flex-col bg-[#07070f] border-r border-white/8 px-4 py-6 shrink-0">
        <div className="flex items-center gap-3 px-2 mb-8">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)' }}
          >
            🛒
          </div>
          <span className="font-black text-white text-lg tracking-tight">Amazone</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                item.active
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
        >
          <span>↩</span>
          Déconnexion
        </button>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-auto">

        <header className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center text-xs"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)' }}
            >
              🛒
            </div>
            <span className="font-black text-white tracking-tight">Amazone</span>
          </div>
          <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-red-400 transition-colors">
            Déconnexion
          </button>
        </header>

        <main className="flex-1 p-6 lg:p-8 max-w-5xl w-full">

          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-gray-500 text-sm mb-1">Tableau de bord</p>
              <h1 className="text-2xl font-bold text-white">
                Bonjour, {user?.name?.split(' ')[0]} 👋
              </h1>
            </div>

            {user?.role === 'admin' && (
              <a
                href="http://localhost:8000/admin"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border transition-colors"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed22, #0ea5e922)',
                  borderColor: '#7c3aed55',
                  color: '#a78bfa',
                }}
              >
                <span>⚙️</span>
                Panneau admin
              </a>
            )}
          </div>

          <div
            className="rounded-2xl p-px mb-6"
            style={{ background: 'linear-gradient(135deg, #7c3aed40, #0ea5e940)' }}
          >
            <div className="rounded-2xl bg-[#0f0f1e] px-6 py-5 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)' }}
              >
                {initials}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-white truncate">{user?.name}</p>
                <p className="text-gray-400 text-sm truncate">{user?.email}</p>
              </div>
              <span className="ml-auto shrink-0 text-xs bg-green-500/15 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full">
                Actif
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/4 border border-white/8 rounded-xl p-5 hover:bg-white/6 transition-colors"
              >
                <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-gray-300">{stat.label}</p>
                <p className="text-xs text-gray-600 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  )
}
