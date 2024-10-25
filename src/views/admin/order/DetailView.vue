<template>
  <div class="card mb-4 shadow-sm">
    <div class="card-header bg-primary text-white">
      <div class="d-flex justify-content-between">
        <div><strong>Order ID:</strong> {{ order?.id }}</div>
        <div><strong>Status:</strong> {{ order?.status }}</div>
        <div><strong>Address:</strong> {{ order?.address }}</div>
        <div><strong>Date:</strong> {{ formatDate(order?.created_at ?? '') }}</div>
      </div>
    </div>
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h5 class="card-title">Items ({{ order?.items.length }}):</h5>
          <ul class="list-group list-group-flush">
            <Product
              v-for="item in order?.items"
              :key="item.product"
              :quantity="item.quantity"
              :product_id="item.product"
              :price="item.price_at_purchase ?? '0.00'"
              class="list-group-item"
            />
          </ul>
        </div>
        <div class="text-end">
          <h5 class="card-title">Total: ${{ order?.total_price }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Product from '@/components/products/ProductInOrder.vue'

import { computed, onMounted } from 'vue'

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'

import { formatDate } from '@/helpers'

const route = useRoute()
const orderStore = useOrderStore()
const loading = ref(false)

const order = computed(() => orderStore.selectedOrder)

const fetchOrder = async (id: number) => {
  loading.value = true

  try {
    await orderStore.getOrderByID(id)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
  loading.value = false
}

onMounted(async () => {
  await fetchOrder(parseInt(route.params.id as string))
})

watch(
  () => route.params.id,
  (newId) => {
    fetchOrder(parseInt(newId as string))
  }
)
</script>
