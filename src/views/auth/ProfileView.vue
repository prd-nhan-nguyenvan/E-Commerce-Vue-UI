<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="row">
        <div class="col-md-4 text-center">
          <!-- Profile Picture -->
          <img
            v-if="profile?.profile_picture"
            :src="profile?.profile_picture"
            alt="Profile Picture"
            class="rounded-circle mb-3"
            width="150"
            height="150"
          />
          <img
            v-else
            src="https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg"
            alt="Default Profile Picture"
            class="rounded-circle mb-3"
            width="150"
            height="150"
          />
          <h3>{{ profile?.first_name }} {{ profile?.last_name }}</h3>
          <p class="text-muted">{{ profile?.role }}</p>
        </div>

        <div class="col-md-8">
          <!-- User Info -->
          <h4 class="mt-4">User Information</h4>

          <!-- Phone Number -->
          <div class="mb-2">
            <strong>Phone:</strong>
            <span v-if="!isEditing.phone">{{
              profile?.phone_number || 'No phone number available'
            }}</span>
            <input
              v-else
              v-model="editProfile.phone_number"
              type="text"
              class="form-control"
              placeholder="Enter phone number"
            />
            <button v-if="!isEditing.phone" class="btn btn-link" @click="startEditing('phone')">
              Edit
            </button>
          </div>

          <!-- Address -->
          <div class="mb-2">
            <strong>Address:</strong>
            <span v-if="!isEditing.address">{{ profile?.address || 'No address available' }}</span>
            <input
              v-else
              v-model="editProfile.address"
              type="text"
              class="form-control"
              placeholder="Enter address"
            />
            <button v-if="!isEditing.address" class="btn btn-link" @click="startEditing('address')">
              Edit
            </button>
          </div>

          <!-- Bio -->
          <div class="mb-2">
            <strong>Bio:</strong>
            <p v-if="!isEditing.bio">{{ profile?.bio || 'No bio available' }}</p>
            <textarea
              v-else
              v-model="editProfile.bio"
              class="form-control"
              rows="3"
              placeholder="Enter bio"
            ></textarea>
            <button v-if="!isEditing.bio" class="btn btn-link" @click="startEditing('bio')">
              Edit
            </button>
          </div>
        </div>
      </div>

      <!-- Save Changes Button -->
      <div v-if="isEditing.phone || isEditing.address || isEditing.bio" class="text-center mt-3">
        <button class="btn btn-success" @click="saveChanges">Save Changes</button>
        <button class="btn btn-secondary" @click="cancelEdit">Cancel</button>
      </div>

      <!-- Edit Profile Button -->
      <div
        class="text-center mt-4"
        v-if="!isEditing.phone && !isEditing.address && !isEditing.bio"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
const profile = computed(() => authStore.user)

const editProfile = ref({
  phone_number: profile.value?.phone_number || '',
  address: profile.value?.address || '',
  bio: profile.value?.bio || ''
})

watch(profile, (newProfile) => {
  if (newProfile) {
    editProfile.value.phone_number = newProfile.phone_number || ''
    editProfile.value.address = newProfile.address || ''
    editProfile.value.bio = newProfile.bio || ''
  }
})

const isEditing = reactive({
  phone: false,
  address: false,
  bio: false
})

const editableFields = ['phone', 'address', 'bio'] as const

const startEditing = (field: string) => {
  if (editableFields.includes(field as keyof typeof isEditing)) {
    isEditing[field as keyof typeof isEditing] = true
  }
}

const saveChanges = async () => {
  console.log('Calling...')
  await authStore.updateProfile(editProfile.value)
  resetEditing()
  console.log('Finish!!!')
}

const cancelEdit = () => {
  resetEditing()
}

const resetEditing = () => {
  isEditing.phone = false
  isEditing.address = false
  isEditing.bio = false

  editProfile.value = {
    phone_number: profile.value?.phone_number || '',
    address: profile.value?.address || '',
    bio: profile.value?.bio || ''
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
</style>
