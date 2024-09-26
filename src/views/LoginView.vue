<template>
  <div class="account">
    <h1 class="account__title">Login</h1>
    <div class="account__form">
      <form @submit.prevent="handleLogin">
        <input type="email" class="txt" placeholder="Email" v-model="email" />
        <input type="password" class="txt" placeholder="Password" v-model="password" />
        <div class="error" v-if="error">
          {{ error }}
        </div>
        <button type="submit" :disabled="loading" class="btn btn--brand w--100">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { login, logout } from '@/services/auth.service'
import { useRouter } from 'vue-router' // Import useRouter for navigation

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false) // Loading state
const router = useRouter() // Get the router instance

const handleLogin = async () => {
  error.value = '' // Clear any previous error
  loading.value = true // Set loading to true

  try {
    const tokens = await login({
      email: email.value,
      password: password.value
    })
    console.log('Tokens:', tokens)

    // Redirect to the desired page on successful login
    router.push('/dashboard') // Change to your actual route
    email.value = '' // Clear email input
    password.value = '' // Clear password input
  } catch (err) {
    error.value = err.message // Display the error message
  } finally {
    loading.value = false // Reset loading state
  }
}

onMounted(logout)
</script>
<style scoped>
/* General layout */
.account {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  height: 100%;
}

/* Form container */
.account__form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Input fields */
.txt {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border 0.2s;
}

.txt:focus {
  border-color: #007bff;
  outline: none;
}

.error {
  color: red;
  margin-top: -5px;
  margin-bottom: 10px;
  text-align: center;
}
</style>
