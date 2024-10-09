<template>
  <div class="container my-5">
    <div class="row justify-content-center align-items-stretch">
      <div class="col-lg-4 d-flex">
        <PictureName
          :isEditing="isEditing"
          :isEnableEditing="isEnableEditing"
          :editProfile="editProfile"
          @startEditing="startEditing"
          @saveChanges="saveChanges"
          @cancelChange="cancelEdit"
        />
      </div>
      <div class="col-lg-8 d-flex">
        <div class="card mb-4 flex-fill">
          <div class="card-body">
            <div class="row align-items-center mb-3">
              <h4 class="col">User Information</h4>
              <router-link class="btn btn-primary col-auto me-3" :to="{ name: 'changePassword' }">
                Change Password
              </router-link>
              <button
                class="btn btn-primary col-auto me-3"
                @click="toggleEdit"
                :class="{ 'btn-secondary': isEnableEditing }"
              >
                <i class="material-icons">{{ isEnableEditing ? 'edit_off' : 'edit' }}</i>
              </button>
            </div>
            <hr />
            <BasicInfo
              :editProfile="editProfile"
              :isEditing="isEditing"
              :isEnableEditing="isEnableEditing"
              @startEditing="startEditing"
            />
          </div>
        </div>
      </div>
      <EditButtons
        :isEditingActive="isEditingActive"
        @saveChanges="saveChanges"
        @cancelEdit="cancelEdit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PictureName from '@/components/profile/PictureName.vue'
import EditButtons from '@/components/profile/EditButtons.vue'
import BasicInfo from '@/components/profile/BasicInfo.vue'

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

const isEditingActive = computed(() => Object.values(isEditing).some((status) => status))

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
