<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h1 class="text-center mb-4">Change Password</h1>
            <!-- Display warning message -->
            <div v-if="message" class="alert alert-warning text-center" role="alert">
              {{ message }}
            </div>

            <!-- Login Form -->
            <form @submit.prevent="handleChangePassword">
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

              <div class="mb-3">
                <label for="new-password" class="form-label">New Password</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="Enter your new password"
                  v-model="newPassword"
                  required
                />
              </div>

              <!-- Error Message -->
              <div v-if="error" class="alert alert-danger text-center" role="alert">
                {{ error }}
              </div>

              <!-- Submit Button -->
              <div class="row justify-content-center px-5">
                <router-link class="btn btn-secondary col me-2" :to="{ name: 'profile' }"
                  >Cancel</router-link
                >
                <button type="submit" :disabled="loading" class="btn btn-primary col">
                  <span
                    v-if="loading"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span v-if="loading">Changing...</span>
                  <span v-else>Change</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSystemMessageStore } from '@/stores'
import { useRouter } from 'vue-router'
import type { ChangePassword } from '@/services'
import { changePassword } from '@/services/user.service'
import Swal from 'sweetalert2'

const router = useRouter()
const systemMessageStore = useSystemMessageStore()

const loading = ref(false)
const error = ref('')
const message = computed(() => systemMessageStore.message)

const newPassword = ref('')
const password = ref('')

const handleChangePassword = async () => {
  loading.value = true
  error.value = ''
  try {
    const changePasswordData: ChangePassword = {
      old_password: password.value,
      new_password: newPassword.value
    }
    await changePassword(changePasswordData)

    await Swal.fire({
      title: 'Success!',
      text: 'Change password success! Please log in again.',
      icon: 'success',
      confirmButtonText: 'OK'
    })
    router.push({ name: 'login' })
  } catch (err: any) {
    if (err) {
      if (err.old_password) {
        error.value = 'Old password is not correct.'
      } else if (err.new_password) {
        if (err.new_password[0].includes('too short'))
          error.value = 'Password must be at least 8 characters long!'
        if (err.new_password[0].includes('common')) error.value = 'Password is too common!'
      }
    }
  } finally {
    loading.value = false
  }
}
</script>
<style scoped>
.account {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  height: 100%;
}

.account__form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

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
