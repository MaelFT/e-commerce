export interface User {
  id: number
  name: string
  email: string
  role: 'user' | 'admin'
  email_verified_at: string | null
  created_at: string
  updated_at: string
  shipping_address:     string | null
  shipping_city:        string | null
  shipping_postal_code: string | null
  shipping_country:     string | null
  shipping_phone:       string | null
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

export interface Product {
  id: number
  name: string
  slug: string
  price: number
  category: string
  image: string
  rating: number
  reviews_count: number
  description: string
  features: string[]
  is_new: boolean
  stock: number
  created_at: string
  updated_at: string
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface UpdateProfileCredentials {
  name?: string
  email?: string
  current_password?: string
  password?: string
  password_confirmation?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface OrderItem {
  id: number
  product_id: number
  product_name: string
  unit_price: number
  quantity: number
}

export interface Order {
  id: number
  order_number: string
  user_id: number
  stripe_session_id: string
  status: string
  subtotal: number
  shipping: number
  total: number
  shipping_address: string | null
  shipping_city: string | null
  shipping_postal_code: string | null
  shipping_country: string | null
  items: OrderItem[]
  created_at: string
  updated_at: string
}
