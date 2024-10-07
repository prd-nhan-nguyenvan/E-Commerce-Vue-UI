<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <!-- Toggler Button for Mobile View -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Brand (Logo) -->
      <div class="collapse navbar-collapse" id="navbarToggler">
        <router-link to="/" class="navbar-brand">
          <img src="/src/assets/img/weblogo.png" alt="Logo" width="30" height="24" loading="lazy" />
        </router-link>

        <!-- Navbar Links and Avatar -->
        <div class="collapse navbar-collapse" id="navbarToggler">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: isActiveRoute('/') }"
                :to="{ name: 'home' }"
                aria-current="page"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: isActiveRoute('/admin/categories') }"
                :to="{ name: 'Categories' }"
                aria-current="page"
                >Category</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: isActiveRoute('/admin/products') }"
                :to="{ name: 'ProductList' }"
                aria-current="page"
                >Product</router-link
              >
            </li>
          </ul>

          <!-- Right Aligned Avatar or Login -->
          <ul class="navbar-nav mb-2 mb-lg-0 ms-auto">
            <li class="nav-item">
              <!-- Show Login if not authenticated -->
              <router-link
                v-if="!first_name"
                class="nav-link"
                :class="{ active: isActiveRoute('/login') }"
                :to="{ name: 'login' }"
                >Login</router-link
              >

              <!-- Show Avatar if authenticated -->
              <div
                v-else
                class="avatar bg-info text-white d-flex align-items-center justify-content-center"
              >
                <span>{{ first_name.charAt(0).toUpperCase() }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const first_name = computed(() => authStore.user?.first_name)
const route = useRoute()

// Function to check active route
const isActiveRoute = (path: string) => route.path === path
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
