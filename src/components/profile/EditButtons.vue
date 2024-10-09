<template>
  <div v-if="isEditingActive" class="text-center mt-3">
    <button class="btn btn-success me-2" @click="$emit('saveChanges')">Save Changes</button>
    <button class="btn btn-secondary" @click="$emit('cancelEdit')">Cancel</button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isEditingActive: boolean
}

defineProps<Props>()
</script>
