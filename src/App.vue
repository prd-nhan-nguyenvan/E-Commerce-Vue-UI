<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseFooter from '@/components/BaseFooter.vue'

import { ref } from 'vue'

const isShowSideBar = ref(true)

const handleSidebar = (showSideBar) => {
  isShowSideBar.value = showSideBar
}
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
  /* Add custom styles for the main content area if needed */
}
</style>
