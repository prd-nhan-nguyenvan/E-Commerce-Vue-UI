<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseFooter from '@/components/BaseFooter.vue'

import { onMounted, ref } from 'vue'
import { useAuthStore } from './stores'

const isShowSideBar = ref(true)
const authStore = useAuthStore()

const handleSidebar = (showSideBar) => {
  isShowSideBar.value = showSideBar
}

onMounted(async () => {
  await authStore.initializeAuth()
})
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <BaseHeader @show-sidebar="handleSidebar" />

    <div class="flex-grow-1 main">
      <router-view />
    </div>
    <BaseFooter :showSideBar="isShowSideBar" />
  </div>
</template>

<style scoped>
.main {
  padding: 20px;
}
</style>
