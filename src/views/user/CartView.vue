<!-- Example: src/views/CartView.vue -->
<template>
  <div class="container my-5">
    <Cart />
    <!-- Checkout button -->
    <router-link class="btn btn-primary" :to="{ name: 'checkout' }">Checkout</router-link>
  </div>
</template>

<script setup lang="ts">
import Cart from '@/components/cart/Cart.vue'
</script>
