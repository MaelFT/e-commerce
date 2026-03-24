export interface User {
  id: number
  name: string
  email: string
  role: 'user' | 'admin'
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface ValidationErrors {
  [field: string]: string[]
}

export interface ApiError {
  message: string
  errors?: ValidationErrors
}
