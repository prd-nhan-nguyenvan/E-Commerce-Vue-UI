import { defineStore } from 'pinia'

import {
    addToCart as addToCartService, fetchCart as fetchCartService,
    removeFromCart as removeFromCartService, updateQuantity as updateQuantityService
} from '@/services/cart.service'
import { getProductById } from '@/services/product.service'

<<<<<<< HEAD
=======

import {
  addToCart as addToCartService,
  clearCart as clearCartService,
  fetchCart as fetchCartService,
  removeFromCart as removeFromCartService,
  updateQuantity as updateQuantityService
} from '@/services/cart.service'
import { placeOrder as placeOrderService } from '@/services/order.service'
import { getProductById } from '@/services/product.service'

import type { EnhancedProduct } from '@/services/product.service'
>>>>>>> 6c0f78f (refactor(cart): Separate addToCart functionality into separate files)

import type { EnhancedProduct } from '@/services/product.service'
import type { CartItem } from '@/stores/types'
import type { Order } from '@/services'
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as Array<CartItem>
  }),
  actions: {
    async fetchCart() {
      try {
        const response = await fetchCartService()
        const items = response.items ?? []

        const productPromises = items.map((item) => getProductById(item.product as number))

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
    async removeFromCart(itemId: number) {
      try {
        await removeFromCartService(String(itemId))
        this.items = this.items.filter((item) => item.id !== itemId)
      } catch (error) {
        console.error('Failed to remove from cart:', error)
        throw new Error('Failed to remove from cart')
      }
    },

    async updateQuantity(id: number, quantity: number) {
      try {
        await updateQuantityService(String(id), quantity)
        const item = this.items.find((item) => item.id === id)
        if (item) {
          item.quantity = quantity
        }
      } catch (error) {
        console.error('Failed to update quantity:', error)
        throw new Error('Failed to update quantity')
      }
    },
    async placeOrder(address: string | null) {
      try {
        const orderData: Order = {
          address: address ?? '',
          items: this.items.map((item) => ({
            product: item.id,
            quantity: item.quantity,
            price_at_purchase: item.on_sell ? item.sell_price : item.price
          }))
        }
        await placeOrderService(orderData)
        this.clearCart()
        return true
      } catch (error) {
        console.error('Failed to checkout:', error)
        throw new Error('Failed to checkout')
      }
    },
    async clearCart() {
      this.items = []
      try {
        await clearCartService()
      } catch (error) {
        console.error('Failed to clear cart:', error)
        throw new Error('Failed to clear cart')
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
    cartItems: (state) => state.items,
    itemQuantity: (state) => (id: number) => {
      const item = state.items.find((item) => item.id === id)
      return item?.quantity ?? 0
    }
  }
})
