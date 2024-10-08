<template>
  <!-- Phone -->
  <div class="mb-2 d-flex align-items-center">
    <strong>Phone:&nbsp;</strong>
    <span v-if="!isEditing.phone">{{ profile?.phone_number || 'No phone number available' }}</span>
    <input
      v-else
      v-model="editProfile.phone_number"
      type="text"
      class="form-control"
      placeholder="Enter phone number"
      style="flex: 1"
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
  <!-- Address -->
  <div class="mb-2 d-flex align-items-center">
    <strong>Address:&nbsp;</strong>
    <span v-if="!isEditing.address">{{ profile?.address || 'No address available' }}</span>
    <input
      v-else
      v-model="editProfile.address"
      type="text"
      class="form-control"
      placeholder="Enter address"
      style="flex: 1"
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
  <!-- Bio -->
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
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores'
import { computed } from 'vue'

interface Props {
  isEditing: {
    bio: boolean
    address: boolean
    phone: boolean
  }
  isEnableEditing: boolean
  editProfile: {
    first_name: string
    last_name: string
    phone_number: string
    address: string
    bio: string
  }
}

const authStore = useAuthStore()
const profile = computed(() => authStore.user)

defineProps<Props>()
const emit = defineEmits(['startEditing'])

const startEditing = (field: string) => {
  emit('startEditing', field)
}
</script>
