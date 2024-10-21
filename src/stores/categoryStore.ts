import {
  addNewCategory,
  deleteCategory,
  getAllCategories,
  updateCategory
} from '@/services/product.service'
import type { Category } from './../services/api'
import { defineStore } from 'pinia'

interface CategoryList {
  categories: Category[]
  loading: boolean
  error: string | null
}

export const useCategoryStore = defineStore('category', {
  state: (): CategoryList => ({
    categories: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchCategories() {
      this.loading = true
      this.error = null

      try {
        const response = await getAllCategories()
        this.categories = response
      } catch (error) {
        this.error = 'Failed to load categories'
        console.error('Error fetching categories:', error)
      } finally {
        this.loading = false
      }
    },

    async addCategory(newCategory: Category) {
      this.loading = true
      this.error = null

      try {
        const response = await addNewCategory(newCategory)
        this.categories.push(response)
      } catch (error) {
        this.error = 'Failed to add category'
        console.error('Error adding category:', error)
      } finally {
        this.loading = false
      }
    },

    async updateCategory(updatedCategory: Category) {
      this.loading = true
      this.error = null
      if (!updatedCategory.id) return
      try {
        const response = await updateCategory(updatedCategory.id, updatedCategory)
        const index = this.categories.findIndex((category) => category.id === updatedCategory.id)
        if (index !== -1) {
          this.categories.splice(index, 1, response)
        }
      } catch (error) {
        this.error = 'Failed to update category'
        console.error('Error updating category:', error)
      } finally {
        this.loading = false
      }
    },

    async deleteCategory(categoryId: number) {
      this.loading = true
      this.error = null

      try {
        await deleteCategory(categoryId)
        this.categories = this.categories.filter((category) => category.id !== categoryId)
      } catch (error) {
        this.error = 'Failed to delete category'
        console.error('Error deleting category:', error)
      } finally {
        this.loading = false
      }
    },

    resetState() {
      this.categories = []
      this.loading = false
      this.error = null
    }
  }
})
