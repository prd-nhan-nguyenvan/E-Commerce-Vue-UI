<template>
  <main class="container py-4">
    <!-- Heading and Add Button -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="mb-0">Categories</h1>
      <button @click="addCategory" class="btn btn-primary">Add Category</button>
    </div>

    <!-- Loading Spinner -->
    <div v-show="loading" class="d-flex justify-content-center my-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-show="error" class="alert alert-danger text-center" role="alert">
      {{ error }}
    </div>

    <!-- Categories Table -->
    <div v-if="categories">
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
          <tr v-for="(category, index) in categories" :key="category.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ category.name }}</td>
            <td>{{ category.slug }}</td>
            <td>
              <button @click="editCategory(category)" class="btn btn-sm btn-warning me-2">
                Edit
              </button>
              <button @click="deleteCategory(category.id)" class="btn btn-sm btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'
const categoryStore = useCategoryStore()
const { fetchCategories, addCategory, editCategory, deleteCategory, categories, loading, error } =
  categoryStore

console.log(categories)

onMounted(() => {
  console.log(loading)
  fetchCategories()
})
</script>
