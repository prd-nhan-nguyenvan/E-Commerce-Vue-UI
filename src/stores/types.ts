import type { UserList, UserDetail, Order as BaseOrder, OrderItem } from '@/services'
import type { Category } from '@/services'
import type { EnhancedProduct } from '@/services/product.service'
import type { UserProfile } from '@/services'

export interface ProductListState {
  products: EnhancedProduct[]
  count: number
  next: string | null | undefined
  previous: string | null | undefined
  selectedProduct: EnhancedProduct | null
  selectedCategory: string | null
  similarProducts: EnhancedProduct[]
  loading: boolean
  error: string | null
}

export interface Order extends BaseOrder {
  id: number
  user: number
  status: 'pd' | 'sb' | 'pr' | 'de' | 'cp' | 'df' | 'cn'
  total_price: string
  address: string
  created_at: string
  updated_at: string
  items: OrderItem[]
}

export interface CartItem extends EnhancedProduct {
  quantity: number
}

export interface UserPagingList {
  users: UserList[]
  selectedUser: UserDetail | null
  count: number
  next: string | null | undefined
  previous: string | null | undefined
  loading: boolean
  error: string | null
}

export interface authState {
  user: UserProfile | null
  token: string | null
  loading: boolean
  error: string | null
}

export interface CategoryState {
  categories: Category[]
  error: string | null
  isInitialFetch: boolean
  loading: boolean
}

export interface OrderState {
  orders: Order[]
  selectedOrder: Order | null
  loading: boolean
  error: string | null
  count: number
  next: string | null | undefined
  previous: string | null | undefined
}
