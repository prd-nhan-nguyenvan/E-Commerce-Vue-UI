<template>
  <div>
    <h1>Products</h1>
    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-item">
        <img :src="product.imageLink" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>
          <strong>{{ product.price | currency }}</strong>
        </p>
        <router-link :to="`/products/${product.slug}`">
          <h2>{{ product.name }}</h2>
        </router-link>
        <button @click="addToCart(product)">Add to Cart</button>
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

<style scoped>
/* Simple styling for grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.product-item {
  border: 1px solid #ddd;
  padding: 1rem;
  text-align: center;
}

.product-item img {
  max-width: 100%;
  height: auto;
}
</style>
