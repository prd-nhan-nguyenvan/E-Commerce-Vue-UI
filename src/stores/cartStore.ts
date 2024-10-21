import type { Product } from '@/services'
import {
  addToCart as addToCartService,
  fetchCart as fetchCartService,
  removeFromCart as removeFromCartService
} from '@/services/cart.service'

import { getProductById } from '@/services/product.service'
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
        const items = response.items ?? []

        // get product details for each item
        const productPromises = items.map((item) => getProductById(item.id as number))

        const products = await Promise.all(productPromises)
        this.items = products.map((product, index) => {
          return {
            ...product,
            id: product.id as number,
            slug: product.slug as string,
            quantity: items[index].quantity ?? 0
          }
        })
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
        await addToCartService(addToCartData)

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
