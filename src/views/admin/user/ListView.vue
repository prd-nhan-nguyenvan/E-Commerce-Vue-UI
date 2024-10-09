<template>
  <main class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="mb-0">Users</h1>
    </div>

    <div v-if="loading" class="d-flex justify-content-center my-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-show="error" class="alert alert-danger text-center" role="alert">
      {{ error }}
    </div>

    <!-- Users Table -->
    <div v-if="!loading && users.length" class="table-responsive">
      <table class="table table-hover">
        <thead class="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col" class="text-nowrap">Email</th>
            <th scope="col" class="text-nowrap">Username</th>
            <th scope="col" class="text-nowrap">Role</th>
            <th scope="col" class="text-nowrap">Active</th>
            <th scope="col" class="text-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ user.email }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.is_active ? 'Yes' : 'No' }}</td>
            <td>
              <div class="d-flex">
                <button class="btn btn-sm btn-secondary me-2">
                  <i class="material-icons">visibility</i>
                </button>
                <button class="btn btn-sm btn-danger">
                  <i class="material-icons">block</i>
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
import { useUserStore } from '@/stores'
import { onMounted, computed } from 'vue'

const userStore = useUserStore()
const { fetchUsers } = userStore

const users = computed(() => userStore.users)
const loading = computed(() => userStore.loading)
const error = computed(() => userStore.error)

onMounted(() => {
  fetchUsers()
})
</script>
