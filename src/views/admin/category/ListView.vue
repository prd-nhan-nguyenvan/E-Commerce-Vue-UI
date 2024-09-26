<template>
  <div>
    <h2>Category Management</h2>

    <div v-if="categories">
      <div class="mdc-data-table">
        <table class="mdc-data-table__table" aria-label="Dessert calories">
          <thead>
            <tr class="mdc-data-table__header-row">
              <th
                class="mdc-data-table__header-cell mdc-data-table__header-cell--with-sort"
                role="columnheader"
                scope="col"
                aria-sort="none"
                data-column-id="dessert"
              >
                <div class="mdc-data-table__header-cell-wrapper">
                  <div class="mdc-data-table__header-cell-label">Name</div>

                  <div
                    class="mdc-data-table__sort-status-label"
                    aria-hidden="true"
                    id="dessert-status-label"
                  ></div>
                </div>
              </th>

              <th
                class="mdc-data-table__header-cell"
                role="columnheader"
                scope="col"
                data-column-id="comments"
              >
                Slug
              </th>
            </tr>
          </thead>
          <tbody class="mdc-data-table__content">
            <tr class="mdc-data-table__row" v-for="(category, index) in categories" :key="index">
              <td class="mdc-data-table__cell">{{ category.name }}</td>
              <td class="mdc-data-table__cell">{{ category.slug }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>There is no category in database!</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllCategories } from '@/services/product.service.ts'

const categories = ref([])

const fetchCategory = async () => {
  try {
    const result = await getAllCategories()
    categories.value = result
  } catch (error) {
    console.error('Error fetching category:', error)
  }
}

onMounted(fetchCategory)
</script>
