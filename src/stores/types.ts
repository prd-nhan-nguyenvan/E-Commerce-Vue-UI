import type { UserList, UserDetail } from '@/services'
import type { EnhancedProduct } from '@/services/product.service'

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
