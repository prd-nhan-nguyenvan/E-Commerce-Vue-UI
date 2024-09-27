<template>
  <main class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="mb-0">Products</h1>
      <router-link :to="{ name: 'AddProduct' }" class="btn btn-primary"
        >Add New Product
      </router-link>
    </div>
    <div v-if="!loading && products.length">
      <table class="table table-hover">
        <thead class="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Category Name</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="product.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>
              {{ product.name }}
            </td>
            <td>
              {{ product.description }}
            </td>
            <td>
              <div class="d-flex">
                <router-link
                  :to="{ name: 'EditProduct', params: { id: product.id } }"
                  class="btn btn-sm btn-warning me-2"
                  >Edit</router-link
                >
                <button class="btn btn-sm btn-danger">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { computed, onMounted } from 'vue'

const productStore = useProductStore()

const { fetchProducts } = productStore
const products = computed(() => productStore.products)
const loading = computed(() => productStore.loading)
const error = computed(() => productStore.error)

onMounted(() => {
  console.log('Loading products...')
  fetchProducts()
})
</script>
