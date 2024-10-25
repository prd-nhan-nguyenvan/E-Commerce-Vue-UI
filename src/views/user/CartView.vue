<!-- Example: src/views/CartView.vue -->
<template>
  <div class="container my-5">
    <Cart>
      <!-- Checkout button -->
      <div class="d-flex justify-content-end">
        <router-link class="btn btn-primary d-flex align-items-center" :to="{ name: 'checkout' }">
          <span class="material-icons"> shopping_cart_checkout </span>
          Checkout</router-link
        >
      </div>
    </Cart>
  </div>
</template>

<script setup lang="ts">
import Cart from '@/components/cart/Cart.vue'
</script>
