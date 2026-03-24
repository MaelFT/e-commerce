import type { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types'

const BASE = '/api/auth'

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token')

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })

  const data: T = await res.json()

  if (!res.ok) throw data

  return data
}

export const authApi = {
  register: (body: RegisterCredentials): Promise<AuthResponse> =>
    request(`${BASE}/register`, { method: 'POST', body: JSON.stringify(body) }),

  login: (body: LoginCredentials): Promise<AuthResponse> =>
    request(`${BASE}/login`, { method: 'POST', body: JSON.stringify(body) }),

  logout: (): Promise<{ message: string }> =>
    request(`${BASE}/logout`, { method: 'POST' }),

  me: (): Promise<User> =>
    request(`${BASE}/me`),
}
