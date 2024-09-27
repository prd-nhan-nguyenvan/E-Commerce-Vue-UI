<template>
  <main class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="mb-0">Categories</h1>
      <button @click="toggleForm" class="btn btn-primary">
        {{ showForm ? 'Cancel' : 'Add Category' }}
      </button>
    </div>

    <div v-if="showForm" class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Add New Category</h5>
        <div class="mb-3">
          <label for="categoryName" class="form-label">Category Name</label>
          <input
            type="text"
            id="categoryName"
            v-model="newCategory.name"
            class="form-control"
            placeholder="Enter category name"
          />
        </div>

        <button @click="saveCategory" class="btn btn-success">Save</button>
      </div>
    </div>
    <!-- Loading Spinner -->
    <div v-if="loading" class="d-flex justify-content-center my-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-show="error" class="alert alert-danger text-center" role="alert">
      {{ error }}
    </div>

    <!-- Categories Table -->
    <div v-if="!loading && categories.length">
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
import { onMounted, computed, ref } from 'vue'
import type { Category } from '@/services/api'

const categoryStore = useCategoryStore()
const { fetchCategories, addCategory, editCategory, deleteCategory } = categoryStore

const categories = computed(() => categoryStore.categories)
const loading = computed(() => categoryStore.loading)
const error = computed(() => categoryStore.error)

const showForm = ref(false)
const newCategory = ref<Category>({ name: '', slug: '' })

const toggleForm = () => {
  showForm.value = !showForm.value
  if (!showForm.value) {
    resetForm() // Reset form data when hiding the form
  }
}

const resetForm = () => {
  newCategory.value = { name: '', description: '' }
}

const saveCategory = async () => {
  if (!newCategory.value.name) {
    alert('Please fill out all fields')
    return
  }

  await categoryStore.addCategory(newCategory.value)
  resetForm() // Clear form after submission
  showForm.value = false // Hide form after saving
}

onMounted(() => {
  fetchCategories()
})
</script>
