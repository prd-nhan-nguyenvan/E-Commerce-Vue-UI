import type { Order } from '.'
import { api } from './'

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

export const fetchOrders = async () => {
  try {
    const response = await api.orders.ordersList()
    return response.data
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    throw new Error('Failed to fetch orders')
  }
}
