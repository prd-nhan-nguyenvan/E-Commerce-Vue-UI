<template>
  <div
    class="p-5 text-center bg-image rounded-3"
    style="background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp'); height: 400px"
  >
    <div class="mask" style="background-color: rgba(0, 0, 0, 0.6)">
      <div class="d-flex justify-content-center align-items-center h-100">
        <div class="text-white">
          <h1 class="mb-3">Welcome to My Shop</h1>
          <h4 class="mb-3">Find the Best Products Here</h4>

          <div class="d-flex mt-3 mb-2">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search for products"
              aria-label="Search"
              v-model="searchText"
              @keydown.enter="search"
              @input="handleInput"
            />
            <button class="btn btn-outline-light btn-lg" @click="search">Search</button>
          </div>
          <div class="suggestion-box" v-if="suggestionText.length">
            <ul class="list-group mt-2">
              <li
                class="list-group-item list-group-item-action"
                v-for="text in suggestionText"
                :key="text"
                @click="searchText = text"
              >
                {{ text }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getSuggestions } from '@/services/search.service'

const searchText = ref('')

const suggestionText = ref<string[]>([])

let timeout: number | undefined
const handleInput = () => {
  // Clear previous timeout
  if (timeout) clearTimeout(timeout)

  // Set a new timeout for 300ms
  timeout = setTimeout(async () => {
    const res = await getSuggestions(searchText.value)

    if (res) {
      suggestionText.value = res.suggestions
      return
    }
  }, 300)
}

const emit = defineEmits(['search'])
const search = () => {
  emit('search', searchText.value)
}
</script>
