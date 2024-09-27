<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <router-link to="home" class="nav-brand">
          <img src="/src/assets/img/weblogo.png" alt="" width="30" height="24" />
        </router-link>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="home">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="login">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const isBasketDropDown = ref(true)
const isAccountDropDown = ref(false)

const showDropDownBasket = () => {
  isAccountDropDown.value = false
  isBasketDropDown.value = !isBasketDropDown.value
}
const showDropDownAccount = () => {
  isBasketDropDown.value = false
  isAccountDropDown.value = !isAccountDropDown.value
}
</script>
