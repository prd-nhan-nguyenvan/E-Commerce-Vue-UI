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
            <td>
              <div v-if="!category.isEditing">
                {{ category.name }}
                <button @click="editFieldCategory(category)" class="btn btn-sm btn-warning ms-2">
                  Edit
                </button>
              </div>
              <div v-else>
                <input
                  type="text"
                  v-model="category.name"
                  class="form-control"
                  @keyup.enter="updateCategory(category)"
                  @blur="finishEditing(category)"
                />
                <button @click="updateCategory(category)" class="btn btn-success btn-sm mt-2">
                  Save
                </button>
                <button @click="finishEditing(category)" class="btn btn-secondary btn-sm mt-2">
                  Cancel
                </button>
              </div>
            </td>
            <td>{{ category.slug }}</td>
            <td>
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
const { fetchCategories, deleteCategory } = categoryStore

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

const editFieldCategory = (category) => {
  category.isEditing = true // Set the category to editing mode
}
const finishEditing = (category) => {
  category.isEditing = false // Exit editing mode without saving
}
const updateCategory = async (category) => {
  if (!category.name) {
    alert('Please provide a name for the category')
    return
  }

  await categoryStore.updateCategory(category) // Assuming you have an updateCategory method
  category.isEditing = false // Exit editing mode after saving
}
onMounted(() => {
  fetchCategories()
})
</script>
