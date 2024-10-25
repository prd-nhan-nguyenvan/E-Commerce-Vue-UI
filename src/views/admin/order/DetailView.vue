<template>
  <div class="card mb-4 shadow-sm mt-5">
    <div class="card-header bg-primary text-white">
      <div class="d-flex justify-content-between align-items-center">
        <div><strong>Order ID:</strong> {{ order?.id }}</div>
        <div>
          <strong>Status:</strong>
          <span class="badge" :class="getStatusColor(order?.status as OrderStatus)">
            {{ getOrderStatusLabel(order?.status ?? '') }}
          </span>
        </div>
        <div><strong>Address:</strong> {{ order?.address }}</div>
        <div><strong>Date:</strong> {{ formatDate(order?.created_at ?? '') }}</div>
      </div>
      <div v-if="availableStatuses.length > 0" class="mt-3">
        <div class="input-group">
          <select v-model="newStatus" class="form-select">
            <option v-for="status in availableStatuses" :key="status" :value="status">
              {{ getOrderStatusLabel(status) }}
            </option>
          </select>
          <button @click="changeStatus" class="btn btn-secondary">Change Status</button>
        </div>
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

import { formatDate, getOrderStatusLabel, getStatusColor } from '@/helpers'
import { canChangeStatus, OrderStatus } from '@/services/order.service'
import Swal from 'sweetalert2'

const route = useRoute()
const orderStore = useOrderStore()
const loading = ref(false)

const order = computed(() => orderStore.selectedOrder)
const availableStatuses = computed(() => {
  if (!order.value) return []
  return Object.values(OrderStatus).filter((status) =>
    canChangeStatus(order.value!.status as OrderStatus, status as OrderStatus)
  )
})
const newStatus = ref<OrderStatus>(order.value?.status as OrderStatus)

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

const changeStatus = async () => {
  if (order.value) {
    try {
      orderStore.updateOrderStatus(String(order.value.id), newStatus.value, true)
      Swal.fire('Success', 'Order status changed successfully', 'success')
    } catch (error) {
      console.error('Failed to change order status:', error)
      alert('Failed to change order status')
    }
  }
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
