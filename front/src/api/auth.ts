import client from './client'
import type { AuthResponse, LoginCredentials, RegisterCredentials, UpdateProfileCredentials, User } from '../types'

const BASE = '/auth'

export const authApi = {
  register: (body: RegisterCredentials): Promise<AuthResponse> =>
    client.post<AuthResponse>(`${BASE}/register`, body).then(r => r.data),

  login: (body: LoginCredentials): Promise<AuthResponse> =>
    client.post<AuthResponse>(`${BASE}/login`, body).then(r => r.data),

  logout: (): Promise<{ message: string }> =>
    client.post<{ message: string }>(`${BASE}/logout`).then(r => r.data),

  me: (): Promise<User> =>
    client.get<User>(`${BASE}/me`).then(r => r.data),

  updateProfile: (body: UpdateProfileCredentials): Promise<User> =>
    client.patch<User>(`${BASE}/me`, body).then(r => r.data),
}
