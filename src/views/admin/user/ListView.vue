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
            <td>
              <span class="badge" :class="getBadgeClass(user.role)">
                {{ user.role || 'No role available' }}
              </span>
            </td>
            <td>
              <span class="badge" :class="user.is_active ? 'bg-success' : 'bg-danger'">
                {{ user.is_active ? 'Yes' : 'No' }}
              </span>
            </td>
            <td>
              <div class="d-flex">
                <router-link
                  class="btn btn-sm btn-secondary me-2"
                  :to="{ name: 'userDetail', params: { id: user.id } }"
                >
                  <i class="material-icons">visibility</i>
                </router-link>
                <button class="btn btn-sm btn-danger" @click="handleBlockUser(user)">
                  <i class="material-icons">block</i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      :loading="loading"
      @previous="loadPrevious"
      @next="loadNext"
      @goToPage="goToPage"
    />
  </main>
</template>

<script setup lang="ts">
import Pagination from '@/components/utils/Pagination.vue'

import { useUserStore } from '@/stores'
import { onMounted, computed } from 'vue'
import { getBadgeClass } from '@/helpers'
import type { UserList } from '@/services'
import Swal from 'sweetalert2'
import { usePagination } from '@/composables/usePagination'

const userStore = useUserStore()
const { fetchUsers } = userStore

const users = computed(() => userStore.users)
const loading = computed(() => userStore.loading)
const error = computed(() => userStore.error)

const handleBlockUser = async (user: UserList) => {
  // Show a confirmation dialog
  const confirmation = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Yes, block it!'
  })

  // Proceed if the user confirms the action
  if (confirmation.isConfirmed) {
    try {
      await userStore.blockUser(user) // Attempt to block the user

      // Show success message if blocking is successful
      Swal.fire({
        title: 'Blocked!',
        text: `${user.username} is blocked!`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })
    } catch (error: any) {
      // Show error message if an error occurs during the blocking process
      Swal.fire({
        title: 'Error!',
        text: `Failed to block ${user.username}: ${error.message || 'Please try again later.'}`,
        icon: 'error',
        confirmButtonText: 'Okay'
      })
    }
  }
}

const { goToPage, loadPrevious, loadNext, currentPage, totalPages, setTotalCount } = usePagination(
  userStore.fetchUsers,
  5 // Number of users per page
)

onMounted(async () => {
  await fetchUsers()
  setTotalCount(userStore.count)
})
</script>
