<template>
  <div class="container mt-4">
    <h2>Your Cart</h2>

    <p v-if="cartItems.length === 0" class="text-center text-muted">Your cart is empty.</p>

    <table v-else class="table mb-3">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItems" :key="item.id">
          <td>
            <router-link
              :to="{ name: 'productDetail', params: { slug: item.slug } }"
              class="text-decoration-none text-dark"
            >
              <span class="fw-bold">{{ item.name }}</span> <br />
              <!-- Product thumbnail -->
              <img
                :src="item.image ?? ''"
                :alt="item.name"
                class="img-fluid"
                style="max-width: 100px"
              />
            </router-link>
          </td>
          <td>{{ formatCurrency(item.price) }}</td>
          <td>
            <div class="input-group input-group-sm" style="width: 120px">
              <button class="btn btn-outline-secondary" @click="decreaseQuantity(item)">-</button>
              <input type="text" class="form-control text-center" :value="item.quantity" disabled />
              <button class="btn btn-outline-secondary" @click="increaseQuantity(item)">+</button>
            </div>
          </td>
          <td>
            <button class="btn btn-sm btn-danger" @click="removeFromCart(item.id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="cartItems.length > 0" class="fw-bold text-end">
      Subtotal ({{ countItems }} items): {{ formatCurrency(String(cartTotal)) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores'
import type { CartItem } from '@/stores/types'
import { computed } from 'vue'

import { formatCurrency } from '@/helpers'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.cartItems)
const cartTotal = computed(() => cartStore.cartTotal)
const countItems = computed(() => cartStore.countItems)

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
