<template>
  <header class="header header--bg">
    <div class="header__shape">
      <div class="header__shape-inner"></div>
    </div>
    <div class="container">
      <div class="navbar">
        <div class="navbar__row">
          <div class="header__logo">
            <router-link :to="{ name: 'home' }" class="header__logo-img"></router-link>
          </div>
          <div class="navbar__items" :class="{ 'navbar__items--is-active': showSideBar }">
            <ul class="navbar__ul">
              <li class="navbar__item">
                <router-link :to="{ name: 'home' }" class="navbar__link navbar__link--is-active"
                  >Home</router-link
                >
              </li>
              <li class="navbar__item">
                <router-link :to="{ name: 'login' }" class="navbar__link navbar__link--is-active"
                  >Login</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
