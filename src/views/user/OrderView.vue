<template>
  <div>
    <h1>Order History</h1>
    <ul>
      <li v-for="order in orders" :key="order.id">
        <p>Order ID: {{ order.id }}</p>
        <p>Date: {{ order.created_at }}</p>
        <p>Total: {{ order.total_price }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useOrderStore } from '@/stores'

const orderStore = useOrderStore()

const orders = computed(() => orderStore.orders)

onMounted(() => {
  orderStore.fetchOrders()
})
</script>
