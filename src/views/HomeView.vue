<template>
  <div>
    <h1>Products</h1>
    <div v-for="product in products" :key="product.id" class="mdc-card demo-card">
      <div
        class="mdc-card__media mdc-card__media--16-9"
        :style="{ backgroundImage: `url(${product.image})` }"
      ></div>

      <div class="mdc-card-wrapper__text-section">
        <div class="demo-card__title">Card title</div>
        <div class="demo-card__subhead">Secondary text</div>
      </div>
      <div class="mdc-card__actions">
        <button class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded">
          <span class="mdc-button__label">Action 1</span>
          <div class="mdc-button__ripple"></div>
        </button>
        <button class="mdc-button mdc-card__action mdc-card__action--button mdc-ripple-upgraded">
          <span class="mdc-button__label">Action 2</span>
          <div class="mdc-button__ripple"></div>
        </button>
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
