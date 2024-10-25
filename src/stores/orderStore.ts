import { defineStore } from 'pinia'

import { ADMIN_STAFF_ROLE } from '@/helpers'
import { OrderConverter } from '@/helpers/enhancedOrderHelper'
import {
  adminChangeOrderStatus as updateOrderStatusService,
  fetchAllOrders as fetchOrdersService,
  getOrderById as getOrderByIdService
} from '@/services/order.service'

import { useAuthStore } from './authStore'

import type { OrderStatus } from '@/services/order.service'

import type { OrderState } from './types'
export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    orders: [],
    selectedOrder: null,
    loading: false,
    error: null,
    count: 0,
    next: null,
    previous: null
  }),
  actions: {
    async fetchOrders(limit: number = 10, offset: number = 0) {
      try {
        const authStore = useAuthStore()
        const role = authStore.user?.role
        const isStaff: boolean = role ? ADMIN_STAFF_ROLE.indexOf(role) != -1 : false
        const response = await fetchOrdersService({ offset, limit }, isStaff)
        this.orders = response.results.map((order) => OrderConverter(order))
        this.count = response.count
        this.next = response.next
        this.previous = response.previous
        return this.orders
      } catch (error) {
        console.error('Failed to fetch orders:', error)
        throw new Error('Failed to fetch orders')
      }
    },
    async goToPage(page: number, limit: number) {
      const offset = (page - 1) * limit
      return this.fetchOrders(offset, limit)
    },
    async loadNextPage() {
      if (this.next) {
        const limit = 10
        this.goToPage(Number(this.next), limit)
      }
    },
    async loadPreviousPage() {
      if (this.previous) {
        const limit = 10
        this.goToPage(Number(this.previous), limit)
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
    },
    async getOrderByID(orderId: number) {
      const tempt = this.orders.find((order) => order.id === orderId)
      if (tempt) {
        this.selectedOrder = tempt
        return tempt
      } else {
        try {
          const response = await getOrderByIdService(orderId)
          this.selectedOrder = OrderConverter(response)
          return this.selectedOrder
        } catch (error) {
          console.error('Failed to fetch order by id:', error)
          throw new Error('Failed to fetch order by id')
        }
      }
    }
  }
})
