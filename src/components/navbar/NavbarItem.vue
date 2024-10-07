<template>
  <li class="nav-item">
    <router-link
      class="nav-link"
      :class="{ active: isActiveRoute(routeName) }"
      :to="{ name: routeName }"
      aria-current="page"
    >
      {{ label }}
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const props = defineProps({
  routeName: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})

const route = useRoute()

const isActiveRoute = (path: string) => route.name === path
</script>
