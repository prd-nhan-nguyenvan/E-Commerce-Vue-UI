<template>
  <div class="container my-5">
    <h1 class="h3 text-center mb-4">Order History</h1>
    <div class="container">
      <div v-for="order in orders" :key="order.id" class="card mb-4 shadow-sm">
        <div class="card-header bg-primary text-white">
          <div class="d-flex justify-content-between">
            <div>Order ID: {{ order.id }}</div>
            <div>Order Status: {{ order.status }}</div>
            <div>Order Address: {{ order.address }}</div>
            <div>Order Date: {{ formatDate(order.created_at) }}</div>
          </div>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5 class="card-title">Items: {{ order.items.length }}</h5>
              <ul class="list-group list-group-flush">
                <Product
                  v-for="item in order.items"
                  :key="item.product"
                  :quantity="item.quantity"
                  :product_id="item.product"
                  :price="item.price_at_purchase ?? '0.00'"
                  class="list-group-item"
                />
              </ul>
            </div>
            <div class="text-end">
              <h5 class="card-title">Total: ${{ order.total_price }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Product from '@/components/products/ProductInOrder.vue'

import { onMounted, computed } from 'vue'
import { useOrderStore } from '@/stores'
import { formatDate } from '@/helpers'

const orderStore = useOrderStore()

const orders = computed(() => orderStore.orders)

onMounted(() => {
  orderStore.fetchOrders()
})
</script>

<style scoped></style>
