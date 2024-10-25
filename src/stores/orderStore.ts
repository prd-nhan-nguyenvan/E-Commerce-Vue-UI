import { defineStore } from 'pinia'

import { OrderConverter } from '@/helpers/enhancedOrderHelper'
import {
  adminChangeOrderStatus as updateOrderStatusService,
  fetchAllOrders as fetchOrdersService
} from '@/services/order.service'

import type { OrderStatus } from '@/services/order.service'

import type { OrderState } from './types'

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    orders: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchOrders() {
      try {
        const response = await fetchOrdersService()
        this.orders = response.results.map((order) => OrderConverter(order))

        return this.orders
      } catch (error) {
        console.error('Failed to fetch orders:', error)
        throw new Error('Failed to fetch orders')
      }
    },
    async updateOrderStatus(orderId: string, status: OrderStatus) {
      try {
        const response = await updateOrderStatusService(orderId, status)
        return response
      } catch (error) {
        console.error('Failed to change order status:', error)
        throw new Error('Failed to change order status')
      }
    }
  }
})
