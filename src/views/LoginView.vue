<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required aria-label="Email" />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        aria-label="Password"
      />
      <button type="submit" :disabled="loading">Login</button>
      <p v-if="loading">Logging in...</p>
      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/services/auth.service'
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
</script>

<style scoped>
/* Optional: Add some basic styling */
input {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc; /* Disabled state */
}
</style>
