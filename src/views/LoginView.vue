<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h1 class="text-center mb-4">Login</h1>

            <form @submit.prevent="handleLogin">
              <!-- Email Input -->
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  placeholder="Enter your email"
                  v-model="email"
                  required
                />
              </div>

              <!-- Password Input -->
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="Enter your password"
                  v-model="password"
                  required
                />
              </div>

              <!-- Error Message -->
              <div v-if="error" class="alert alert-danger text-center" role="alert">
                {{ error }}
              </div>

              <!-- Submit Button -->
              <button type="submit" :disabled="loading" class="btn btn-primary w-100">
                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span v-if="loading">Logging in...</span>
                <span v-else>Login</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { login, logout } from '@/services/auth.service'
import { getUserProfile } from '@/services/user.service'
import { useUserStore } from '@/stores/user'

import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false) // Loading state
const router = useRouter() // Get the router instance
const userStore = useUserStore() // Use Pinia store

const handleLogin = async () => {
  error.value = '' // Clear any previous error
  loading.value = true // Set loading to true

  try {
    const tokens = await login({
      email: email.value,
      password: password.value
    })
    try {
      const userProfile = await getUserProfile()
      userStore.setUser(userProfile)
    } catch (error) {
      throw new Error(error)
    }

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
