<template>
  <div class="container py-5">
    <div v-if="product">
      <div class="row">
        <div class="col-lg-6">
          <img v-if="product.image" :src="product.image" alt="Product Image" />
        </div>
        <div class="col-lg-6">
          <h2 class="fw-bold">Product Title</h2>
          <p class="text-muted">Product Category</p>
          <h3 class="my-4">$99.99</h3>
          <p class="mb-4">
            This is a detailed description of the product. It provides all necessary information
            about the features, benefits, and specifications of the product.
          </p>

          <div class="d-flex gap-3 mb-4">
            <input type="number" class="form-control" value="1" style="max-width: 80px" />
            <button class="btn btn-primary" type="button">Add to Cart</button>
          </div>
          <div>
            <button class="btn btn-outline-secondary btn-sm" type="button">Add to Wishlist</button>
            <button class="btn btn-outline-secondary btn-sm" type="button">Compare</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProductBySlug } from '@/services/product.service'
import { useProductStore } from '@/stores/product'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const productStore = useProductStore()
const route = useRoute()

const product = computed(() => productStore.selectedProduct)

onMounted(async () => {
  try {
    const slug = route.params.slug
    if (slug) {
      await productStore.getProductBySlug(slug)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>
