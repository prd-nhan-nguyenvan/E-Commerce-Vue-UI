import { defineStore } from 'pinia'

import { OrderConverter } from '@/helpers/enhancedOrderHelper'
import { fetchOrders as fetchOrdersService } from '@/services/order.service'

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
      } catch (error) {
        console.error('Failed to fetch orders:', error)
        throw new Error('Failed to fetch orders')
      }
    }
  }
})
