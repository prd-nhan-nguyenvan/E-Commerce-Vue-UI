<template>
  <div class="container my-5">
    <div class="row justify-content-center align-items-stretch">
      <div class="col-lg-4 d-flex">
        <div class="card mb-4 text-center flex-fill">
          <div class="card-body">
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
            <div class="d-flex justify-content-center align-items-center">
              <h5 v-if="!isEditing.name">{{ profile?.first_name }}&nbsp;</h5>
              <input
                v-else
                type="text"
                v-model="editProfile.first_name"
                class="form-control me-2"
                placeholder="First Name"
              />
              <h5 v-if="!isEditing.name">{{ profile?.last_name }}</h5>
              <input
                v-else
                type="text"
                v-model="editProfile.last_name"
                class="form-control"
                placeholder="Last Name"
              />
              <button
                v-if="!isEditing.name && isEnableEditing"
                class="btn btn-link"
                @click="startEditing('name')"
              >
                <i class="material-icons">edit</i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8 d-flex">
        <div class="card mb-4 flex-fill">
          <div class="card-body">
            <div class="row align-items-center mb-3">
              <h4 class="col">User Information</h4>
              <button
                class="btn btn-primary col-auto me-3"
                @click="toggleEdit"
                :class="{ 'btn-secondary': isEnableEditing }"
              >
                <i class="material-icons">{{ isEnableEditing ? 'edit_off' : 'edit' }}</i>
              </button>
            </div>
            <hr />
            <div class="mb-2 d-flex align-items-center">
              <strong>Phone: &nbsp;</strong>
              <span v-if="!isEditing.phone">{{
                profile?.phone_number || 'No phone number available'
              }}</span>
              <input
                v-else
                v-model="editProfile.phone_number"
                type="text"
                class="form-control"
                placeholder="Enter phone number"
                style="flex: 1"
                @keydown.enter="saveChanges"
                @keydown.esc="cancelEdit"
              />
              <button
                v-if="!isEditing.phone && isEnableEditing"
                class="btn btn-link"
                @click="startEditing('phone')"
              >
                <i class="material-icons">edit</i>
              </button>
            </div>
            <hr />
            <div class="mb-2 d-flex align-items-center">
              <strong>Address:&nbsp;</strong>
              <span v-if="!isEditing.address">{{
                profile?.address || 'No address available'
              }}</span>
              <input
                v-else
                v-model="editProfile.address"
                type="text"
                class="form-control"
                placeholder="Enter address"
                style="flex: 1"
                @keydown.enter="saveChanges"
                @keydown.esc="cancelEdit"
              />
              <button
                v-if="!isEditing.address && isEnableEditing"
                class="btn btn-link"
                @click="startEditing('address')"
              >
                <i class="material-icons">edit</i>
              </button>
            </div>
            <hr />
            <div class="mb-2">
              <strong>Bio:</strong>
              <button
                v-if="!isEditing.bio && isEnableEditing"
                class="btn btn-link"
                @click="startEditing('bio')"
              >
                <i class="material-icons">edit</i>
              </button>
              <p v-if="!isEditing.bio">{{ profile?.bio || 'No bio available' }}</p>
              <textarea
                v-else
                v-model="editProfile.bio"
                class="form-control"
                rows="3"
                placeholder="Enter bio"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Changes Button -->
      <div
        v-if="isEditing.name || isEditing.phone || isEditing.address || isEditing.bio"
        class="text-center mt-3"
      >
        <button class="btn btn-success me-2" @click="saveChanges">Save Changes</button>
        <button class="btn btn-secondary" @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
const profile = computed(() => authStore.user)

const editProfile = ref({
  first_name: profile.value?.first_name || '',
  last_name: profile.value?.last_name || '',
  phone_number: profile.value?.phone_number || '',
  address: profile.value?.address || '',
  bio: profile.value?.bio || ''
})

watch(profile, (newProfile) => {
  if (newProfile) {
    editProfile.value = {
      first_name: newProfile.first_name || '',
      last_name: newProfile.last_name || '',
      phone_number: newProfile.phone_number || '',
      address: newProfile.address || '',
      bio: newProfile.bio || ''
    }
  }
})

const isEditing = reactive({
  name: false,
  phone: false,
  address: false,
  bio: false
})

const isEnableEditing = ref(false)
const toggleEdit = () => {
  isEnableEditing.value = !isEnableEditing.value
  if (!isEnableEditing.value) {
    resetEditing() // Reset editing when disabling
  }
}

const editableFields = ['name', 'phone', 'address', 'bio'] as const

const startEditing = (field: string) => {
  if (editableFields.includes(field as keyof typeof isEditing)) {
    isEditing[field as keyof typeof isEditing] = true
  }
}

const saveChanges = async () => {
  await authStore.updateProfile(editProfile.value)
  resetEditing()
}

const cancelEdit = () => {
  resetEditing()
}

const resetEditing = () => {
  isEditing.name = false
  isEditing.phone = false
  isEditing.address = false
  isEditing.bio = false

  editProfile.value = {
    first_name: profile.value?.first_name || '',
    last_name: profile.value?.last_name || '',
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
