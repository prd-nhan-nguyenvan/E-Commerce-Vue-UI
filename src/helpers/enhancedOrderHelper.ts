import type { Order as BaseOrder } from '@/services'
import type { Order } from '@/stores/types'

export const OrderConverter = (order: BaseOrder): Order => {
  return {
    id: order.id ?? 0,
    user: order.user ?? 0,
    status: order.status ?? 'pd',
    total_price: order.total_price ?? '0',
    address: order.address ?? '',
    items: order.items ?? [],
    created_at: order.created_at ?? '',
    updated_at: order.updated_at ?? ''
  }
}
