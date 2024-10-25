<template>
  <div class="container mt-5">
    <div class="row mb-4 justify-content-between">
      <div class="col-md-4">
        <h1 class="h3">Order</h1>
      </div>
    </div>

    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="!loading && orders.length" class="table-responsive">
      <!-- Dropdown to select records per page -->
      <div class="form-floating w-25 float-end mt-3">
        <select
          v-model="recordPerPage"
          @change="handleRecordsChange"
          id="recordsPerPage"
          class="form-select rounded"
          aria-label="Records per page"
        >
          <option v-for="option in recordsOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <label for="recordsPerPage">Records per page:</label>
      </div>
      <table class="table table-striped table-hover">
        <thead class="table-dark">
          <tr>
            <th scope="col" class="text-nowrap">#</th>
            <th scope="col" class="text-nowrap">User</th>
            <th scope="col" class="text-nowrap">Status</th>
            <th scope="col" class="text-nowrap">Total Price</th>
            <th scope="col" class="text-nowrap">Address</th>
            <th scope="col" class="text-nowrap">Items</th>
            <th scope="col" class="text-nowrap">Created At</th>
            <th scope="col" class="text-nowrap">Updated At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="order.id">
            <td>{{ index + 1 }}</td>
            <td>{{ order.user }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.total_price }}</td>
            <td>{{ order.address }}</td>
            <td>{{ order.items.length }}</td>
            <td>{{ order.created_at }}</td>
            <td>{{ order.updated_at }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination Controls -->
      <div class="container my-4">
        <nav aria-label="Page navigation" v-if="!loading && totalPages > 1">
          <ul class="pagination justify-content-center">
            <!-- Previous Button -->
            <li class="page-item" :class="{ disabled: !previous }" @click="loadPreviousPage">
              <span class="page-link" aria-hidden="true">
                <i class="material-icons">arrow_back</i>
              </span>
            </li>
            <li
              v-if="currentPage > 5"
              :class="['page-item', { active: currentPage === 1 }]"
              @click="goToPage(1)"
            >
              <span class="page-link">{{ 1 }}</span>
            </li>
            <li v-if="currentPage > 5" class="page-item disabled">
              <span class="page-link">...</span>
            </li>
            <!-- Page Numbers -->
            <li
              v-for="page in totalPages"
              :key="page"
              :class="['page-item', { active: currentPage === page }]"
              @click="goToPage(page)"
            >
              <span class="page-link" v-if="Math.abs(page - currentPage) < 5">{{ page }}</span>
            </li>

            <li v-if="currentPage < totalPages - 4" class="page-item disabled">
              <span class="page-link">...</span>
            </li>

            <li
              v-if="currentPage < totalPages - 4"
              :class="['page-item', { active: currentPage === totalPages }]"
              @click="goToPage(totalPages)"
            >
              <span class="page-link">{{ totalPages }}</span>
            </li>

            <li class="page-item" :class="{ disabled: !next }" @click="loadNextPage">
              <span class="page-link" aria-hidden="true">
                <i class="material-icons">arrow_forward</i>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div v-if="!loading && !orders.length" class="alert alert-info">No orders available.</div>
  </div>
</template>
<script setup lang="ts">
import { useOrderStore } from '@/stores'
import { computed, onMounted, ref } from 'vue'
import Swal from 'sweetalert2'

const orderStore = useOrderStore()

const recordsOptions = [5, 10, 20, 50]

const currentPage = ref(1)
const recordPerPage = ref(recordsOptions[2])

const orders = computed(() => orderStore.orders)
const loading = computed(() => orderStore.loading)
const previous = computed(() => orderStore.previous)
const next = computed(() => orderStore.next)
const error = computed(() => orderStore.error)
const totalPages = computed(() => Math.ceil(orderStore.count / recordPerPage.value))

const goToPage = async (page: number) => {
  currentPage.value = page
  const offset = (page - 1) * recordPerPage.value
  await orderStore.fetchOrders(recordPerPage.value, offset)
}

const loadNextPage = () => {
  if (next.value) {
    orderStore.loadNextPage()
    currentPage.value += 1
  }
}

const loadPreviousPage = () => {
  if (previous.value) {
    orderStore.loadPreviousPage()
    currentPage.value -= 1
  }
}
const handleRecordsChange = () => {
  currentPage.value = 1
  orderStore.fetchOrders(recordPerPage.value)
}
onMounted(() => {
  orderStore.fetchOrders(recordPerPage.value)
})
</script>
