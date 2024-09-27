<template>
  <div class="container">
    <h1 class="mb-4">Products</h1>
    <div v-for="product in products" :key="product.id" class="card mb-4">
      <!-- Product Image -->
      <img :src="product.image" class="card-img-top" alt="Product Image" />

      <!-- Product Information -->
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">Secondary text</p>
      </div>

      <!-- Actions -->
      <div class="card-footer d-flex justify-content-between">
        <button class="btn btn-primary">Action 1</button>
        <button class="btn btn-secondary">Action 2</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllProducts } from '@/services/product.service'

const products = ref([])

const fetchProducts = async () => {
  try {
    const productData = await getAllProducts()
    products.value = productData
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

onMounted(fetchProducts) // Fetch products when the component is mounted

// Function to handle adding to cart (you can build this later)
const addToCart = (product) => {
  console.log('Adding product to cart:', product)
  // Add cart logic here
}
</script>

<style scoped></style>
