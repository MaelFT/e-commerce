import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { authApi } from '../api/auth'
import type { User, LoginCredentials, RegisterCredentials, AuthResponse, UpdateProfileCredentials } from '../types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<AuthResponse>
  register: (credentials: RegisterCredentials) => Promise<AuthResponse>
  logout: () => Promise<void>
  updateProfile: (credentials: UpdateProfileCredentials) => Promise<User>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      authApi.me()
        .then(setUser)
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const data = await authApi.login(credentials)
    localStorage.setItem('token', data.token)
    setUser(data.user)
    return data
  }

  const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const data = await authApi.register(credentials)
    localStorage.setItem('token', data.token)
    setUser(data.user)
    return data
  }

  const logout = async (): Promise<void> => {
    await authApi.logout()
    localStorage.removeItem('token')
    setUser(null)
  }

  const updateProfile = async (credentials: UpdateProfileCredentials): Promise<User> => {
    const updated = await authApi.updateProfile(credentials)
    setUser(updated)
    return updated
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth doit être utilisé dans un AuthProvider')
  return context
}
