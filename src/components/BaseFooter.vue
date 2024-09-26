<template>
  <footer class="footer">
    <span class="scroll__top" @click="goTop" v-show="showScrollTop"></span>

    <div class="footer__main">
      <div class="container">
        <div class="footer__hr"></div>
      </div>
      <div class="footer__team">
        Design with &#x02665; by
        <a href="" class="footer__copy">Nhan Nguyen </a>
        © 2024
      </div>
    </div>
    <div class="overlay" :class="{ 'overlay--is-active': showSideBar }"></div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps('showSideBar')
const showScrollTop = ref(false)
const scrollTimeout = ref(null)

const handleScroll = () => {
  if (scrollTimeout.value) return

  console.log('user scrolled')

  scrollTimeout.value = setTimeout(() => {
    showScrollTop.value = window.scrollY > 200

    clearTimeout(scrollTimeout)
    scrollTimeout.value = 0
  }, 150)
}
const goTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  document.addEventListener('scroll', handleScroll)
})
</script>

<style></style>
