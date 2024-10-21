import type { Product } from '@/services'
import { defineStore } from 'pinia'

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as Array<CartItem>
  }),
  actions: {
    addToCart(item: Product) {
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
    cartItems: (state) => state.items
  }
})
