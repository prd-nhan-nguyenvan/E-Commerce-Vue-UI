<template>
  <div class="not-found container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 text-center">
        <h1 class="display-4">Oops - Page Not Found</h1>
        <p class="lead">Looks like you're trying to find a plant in a forest of code.</p>
        <router-link to="/" class="btn btn-primary">Go back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFoundView'
})
</script>

<style scoped>
.not-found {
  background-image: url('https://inzonedesign.com/wp-content/uploads/2021/02/blog-404-funny-error-pages.jpg');
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
</style>
