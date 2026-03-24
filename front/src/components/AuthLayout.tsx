import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

const features = [
  { icon: '⚡', text: 'Livraison express en 24h' },
  { icon: '🔒', text: 'Paiements 100% sécurisés' },
  { icon: '↩️', text: 'Retours gratuits 30 jours' },
]

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">

      {/* Panneau gauche — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden bg-[#07070f]">

        <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-700/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[100px]" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-4xl"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)' }}
          >
            🛒
          </div>

          <h1 className="text-4xl font-black text-white tracking-tight mb-3">
            Amazone
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            La marketplace nouvelle génération.<br />
            Rapide, sécurisée, et taillée pour vous.
          </p>

          <div className="mt-10 flex flex-col gap-3 w-full">
            {features.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-left"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panneau droit — formulaire */}
      <div className="flex-1 flex flex-col bg-[#0c0c16]">

        <div className="lg:hidden flex items-center gap-3 px-6 pt-8 pb-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)' }}
          >
            🛒
          </div>
          <span className="font-black text-white text-xl tracking-tight">Amazone</span>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            {children}
          </div>
        </div>
      </div>

    </div>
  )
}
