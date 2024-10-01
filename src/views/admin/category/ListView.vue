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
            placeholder="Name"
          />

          <label for="categoryDescription" class="form-label">Category Description</label>
          <input
            type="text"
            id="categoryDescription"
            v-model="newCategory.description"
            class="form-control"
            placeholder="Description"
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
              </div>
              <div v-else>
                <input
                  type="text"
                  v-model="category.name"
                  class="form-control"
                  @keyup.enter="updateCategory(category)"
                />
              </div>
            </td>
            <td>
              <div v-if="!category.isEditing">
                {{ category.description }}
              </div>

              <div v-else>
                <input
                  type="text"
                  v-model="category.description"
                  class="form-control"
                  @keyup.enter="updateCategory(category)"
                />
              </div>
            </td>
            <td>
              <div v-if="!category.isEditing" class="d-flex">
                <button @click="editFieldCategory(category)" class="btn btn-sm btn-warning me-2">
                  Edit
                </button>

                <button @click="deleteCategory(category.id)" class="btn btn-sm btn-danger">
                  Delete
                </button>
              </div>
              <div v-else class="d-flex justify-content-start mt-2">
                <button @click="updateCategory(category)" class="btn btn-success btn-sm me-2">
                  Save
                </button>
                <button @click="finishEditing(category)" class="btn btn-secondary btn-sm">
                  Cancel
                </button>
              </div>
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
import Swal from 'sweetalert2'

const categoryStore = useCategoryStore()
const { fetchCategories } = categoryStore

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
  if (!newCategory.value.name || !newCategory.value.description) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill out all fields!'
    })
    return
  }

  await categoryStore.addCategory(newCategory.value)

  Swal.fire({
    icon: 'success',
    title: 'Category Added',
    text: 'The new category has been added successfully!',
    timer: 2000
  })

  resetForm()
  showForm.value = false
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

const deleteCategory = async (categoryId: number) => {
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
      await categoryStore.deleteCategory(categoryId)
      Swal.fire({
        title: 'Deleted!',
        text: 'The category has been deleted.',
        icon: 'success',
        timer: 2000
      })
    }
  })
}

onMounted(() => {
  fetchCategories()
})
</script>
