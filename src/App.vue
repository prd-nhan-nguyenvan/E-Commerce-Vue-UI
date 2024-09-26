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
  <BaseHeader @show-sidebar="handleSidebar" />
  <div class="main">
    <router-view />
  </div>
  <BaseFooter :showSideBar="isShowSideBar" />
</template>
