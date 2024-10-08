<template>
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
          @keydown.enter="$emit('saveChanges')"
          @keydown.esc="$emit('cancelChange')"
        />
        <h5 v-if="!isEditing.name">{{ profile?.last_name }}</h5>
        <input
          v-else
          type="text"
          v-model="editProfile.last_name"
          class="form-control"
          placeholder="Last Name"
          @keydown.enter="$emit('saveChanges')"
          @keydown.esc="$emit('cancelChange')"
        />
        <button
          v-if="!isEditing.name && isEnableEditing"
          class="btn btn-link"
          @click="$emit('startEditing', 'name')"
        >
          <i class="material-icons">edit</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores'
interface Props {
  isEditing: { name: boolean }
  isEnableEditing: boolean
  editProfile: { first_name: string; last_name: string }
}
defineProps<Props>()

const authStore = useAuthStore()
const profile = computed(() => authStore.user)
</script>
