import type { Product } from '@/services'
import {
  addToCart as addToCartService,
  fetchCart as fetchCartService,
  removeFromCart as removeFromCartService
} from '@/services/cart.service'
import { defineStore } from 'pinia'

interface EnhancedProduct extends Product {
  id: number
  slug: string
}
export interface CartItem extends EnhancedProduct {
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as Array<CartItem>
  }),
  actions: {
    async fetchCart() {
      try {
        const response = await fetchCartService()
        console.log('Fetched cart:', response)
        this.items = response.map((item: any) => ({
          ...item.product,
          quantity: item.quantity
        }))
      } catch (error) {
        console.error('Failed to fetch cart:', error)
        throw new Error('Failed to fetch cart')
      }
    },
    async addToCart(item: EnhancedProduct) {
      try {
        const addToCartData = {
          product_id: item.id,
          quantity: 1
        }
        const response = await addToCartService(addToCartData)
        console.log('Added to cart:', response)

        const existingItem = this.items.find((cartItem) => cartItem.id === item.id)
        if (existingItem) {
          existingItem.quantity++
        } else {
          this.items.push({ ...item, quantity: 1 })
        }
      } catch (error) {
        console.error('Failed to add to cart:', error)
        throw new Error('Failed to add to cart')
      }
    },
    removeFromCart(itemId: number) {
      this.items = this.items.filter((item) => item.id !== itemId)
    },
    clearCart() {
      this.items = []
    },
    updateQuantity(id: number, quantity: number) {
      const item = this.items.find((item) => item.id === id)
      if (item) {
        item.quantity = quantity
      }
    }
  },
  getters: {
    cartTotal: (state) =>
      state.items.reduce((total, item) => {
        const price = Number(item.on_sell ? item.sell_price : item.price)
        return total + item.quantity * price
      }, 0),
    countItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    cartItems: (state) => state.items
  }
})
