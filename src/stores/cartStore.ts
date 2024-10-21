import type { Product } from '@/services'
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
    addToCart(item: EnhancedProduct) {
      const existingItem = this.items.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...item, quantity: 1 })
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
