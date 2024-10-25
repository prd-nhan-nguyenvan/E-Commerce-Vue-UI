import type { Order } from '.'
import { api } from './'

export enum OrderStatus {
  PENDING = 'pd',
  SUBMITTED = 'sb',
  PROCESSING = 'pr',
  DELIVERED = 'de',
  COMPLETED = 'cp',
  DELIVERY_FAILED = 'df',
  CANCELED = 'cn'
}

export const placeOrder = async (orderData: Order) => {
  try {
    const response = await api.orders.ordersCreate(orderData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed to add to carts:', error)
    throw new Error('Failed to add to carts')
  }
}

export const fetchAllOrders = async (
  query: { limit?: number; offset?: number } = { limit: 10, offset: 0 },
  isStaff = false
) => {
  try {
    const response = isStaff
      ? await api.orders.ordersAdminListsList(query)
      : await api.orders.ordersList(query)
    return response.data
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    throw new Error('Failed to fetch orders')
  }
}

export const adminChangeOrderStatus = async (
  orderId: string,
  status: OrderStatus,
  isStaff = false
) => {
  try {
    const response = isStaff
      ? await api.orders.ordersAdminListsUpdateStatusCreate(orderId, { status })
      : await api.orders.ordersUpdateStatusCreate(orderId, { status })
    return response.data
  } catch (error) {
    console.error('Failed to change order status:', error)
    throw new Error('Failed to change order status')
  }
}

export const getOrderById = async (orderId: number) => {
  try {
    const response = await api.orders.ordersAdminListsRead(orderId)
    return response.data
  } catch (error) {
    console.error('Failed to fetch order:', error)
    throw new Error('Failed to fetch order')
  }
}
