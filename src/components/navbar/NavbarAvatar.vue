<template>
  <div v-if="!first_name" class="nav-item">
    <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
  </div>
  <div v-else class="avatar bg-info text-white d-flex align-items-center justify-content-center">
    <span>{{ first_name.charAt(0).toUpperCase() }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const first_name = computed(() => authStore.user?.first_name)
</script>

<style scoped>
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}
</style>
