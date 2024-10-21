<!-- src/components/Cart.vue -->
<template>
  <div class="container mt-4">
    <h2>Your Cart</h2>

    <!-- Show message if cart is empty -->
    <p v-if="cartItems.length === 0" class="text-center text-muted">Your cart is empty.</p>

    <!-- Display cart items using list group -->
    <ul v-else class="list-group mb-3">
      <li
        v-for="item in cartItems"
        :key="item.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <!-- Item name and price with quantity control buttons -->
        <div class="d-flex align-items-center">
          <!-- Item details -->
          <router-link
            :to="{ name: 'productDetail', params: { slug: item.slug } }"
            class="text-decoration-none text-dark"
          >
            <div class="me-3">{{ item.name }} - {{ formatCurrency(item.price) }}</div>
          </router-link>
          <!-- Quantity controls -->
          <div class="input-group input-group-sm me-3" style="width: 120px">
            <button class="btn btn-outline-secondary" @click="decreaseQuantity(item)">-</button>
            <input type="text" class="form-control text-center" :value="item.quantity" disabled />
            <button class="btn btn-outline-secondary" @click="increaseQuantity(item)">+</button>
          </div>
        </div>
        <!-- Remove button -->
        <button class="btn btn-sm btn-danger" @click="removeFromCart(item.id)">Remove</button>
      </li>
    </ul>

    <!-- Cart total -->
    <p v-if="cartItems.length > 0" class="fw-bold">
      Total: {{ formatCurrency(String(cartTotal)) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useCartStore, type CartItem } from '@/stores'
import { computed } from 'vue'

import { formatCurrency } from '@/helpers'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.cartItems)
const cartTotal = computed(() => cartStore.cartTotal)

const removeFromCart = (itemId: number) => {
  cartStore.removeFromCart(itemId)
}

const decreaseQuantity = (item: CartItem) => {
  if (item.quantity === 1) {
    return removeFromCart(item.id)
  }
  cartStore.updateQuantity(item.id, item.quantity - 1)
}

const increaseQuantity = (item: CartItem) => {
  cartStore.updateQuantity(item.id, item.quantity + 1)
}
</script>
