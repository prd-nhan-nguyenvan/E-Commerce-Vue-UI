<template>
  <div>
    <h2>Category Management</h2>

    <div v-if="categories">
      <div v-for="(category, index) in categories" :key="index">
        {{ category.name }}
      </div>
    </div>
    <div v-else>There is no category in database!</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllCategories } from '@/services/product.service.ts'

const categories = ref([])

const fetchCategory = async () => {
  try {
    const result = await getAllCategories()
    categories.value = result
  } catch (error) {
    console.error('Error fetching category:', error)
  }
}

onMounted(fetchCategory)
</script>
