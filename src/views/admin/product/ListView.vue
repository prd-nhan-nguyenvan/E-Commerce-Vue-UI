<template>
  <main class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="mb-0">Products</h1>
      <router-link :to="{ name: 'AddProduct' }" class="btn btn-primary"
        >Add New Product</router-link
      >
    </div>

    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="!loading && products.length">
      <table class="table table-hover">
        <thead class="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Product Name</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="product.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>
              <img
                v-if="product.image"
                :src="product.image"
                alt="Product Image"
                class="img-thumbnail"
                style="max-width: 100px; max-height: 100px"
              />
              <span v-else>No Image</span>
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ getCategoryName(product.category) }}</td>
            <td>{{ formatCurrency(product.price) }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <div class="d-flex">
                <router-link
                  :to="{ name: 'EditProduct', params: { id: product.id } }"
                  class="btn btn-sm btn-warning me-2"
                  >Edit</router-link
                >
                <button @click="deleteProduct(product.id)" class="btn btn-sm btn-danger">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!loading && !products.length" class="alert alert-info">No products available.</div>
  </main>
</template>
<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { useCategoryStore } from '@/stores/category'
import { computed, onMounted } from 'vue'
import Swal from 'sweetalert2'

const productStore = useProductStore()
const categoryStore = useCategoryStore()

const { fetchProducts } = productStore
const { fetchCategories } = categoryStore

const products = computed(() => productStore.products)
const loading = computed(() => productStore.loading)
const error = computed(() => productStore.error)

const getCategoryName = (categoryId: number) => {
  const category = categoryStore.categories.find((c) => c.id === categoryId)
  return category ? category.name : 'Unknown'
}

const formatCurrency = (price: string) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    parseFloat(price)
  )
}

const deleteProduct = async (productId: number) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      // Perform the delete action
      await productStore.deleteProduct(productId)
      Swal.fire({
        title: 'Deleted!',
        text: 'The product has been deleted.',
        icon: 'success',
        timer: 2000
      })
    }
  })
}

onMounted(() => {
  console.log('Loading Products...')
  fetchProducts()

  console.log('Loading Categories...')
  fetchCategories()
})
</script>
