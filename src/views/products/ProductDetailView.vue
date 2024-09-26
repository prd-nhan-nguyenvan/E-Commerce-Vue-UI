<template>
  <div v-if="product">
    <h2>{{ product.name }}</h2>
    <img :src="product.image" alt="Product Image" />
    <p>{{ product.description }}</p>
    <p><strong>Price:</strong> ${{ product.price }}</p>
    <p><strong>Stock:</strong> {{ product.stock }} items available</p>
  </div>
  <div v-else-if="error">
    <p>{{ error }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProduct } from '@/services/product.service.ts'
const route = useRoute()
const product = ref(null)
const error = ref(null)

const fetchProductDetail = async (slug: string) => {
  try {
    const response = await getProduct(slug)
    product.value = response
  } catch (err) {
    error.value = 'Failed to load product details'
  }
}

onMounted(() => {
  const productSlug = route.params.slug
  fetchProductDetail(productSlug)
})
</script>
