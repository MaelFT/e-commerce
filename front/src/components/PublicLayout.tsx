import type { ReactNode } from 'react'
import Header from './Header'

interface PublicLayoutProps {
  children: ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans flex flex-col selection:bg-black selection:text-white">
      <Header />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
    </div>
  )
}
