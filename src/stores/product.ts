import type { Product } from '@/services/api'
import {
  addNewProduct,
  getAllProducts,
  getProductById as apiGetProductById,
  updateProduct as apiUpdateProduct
} from '@/services/product.service'
import { defineStore } from 'pinia'

interface ProductList {
  products: Product[]
  selectedProduct: Product | null
  loading: boolean
  error: string | null
}

export const useProductStore = defineStore('product', {
  state: (): ProductList => ({
    products: [],
    selectedProduct: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null

      try {
        const response = await getAllProducts()
        console.log('API response:', response) // Log the API response
        this.products = response
      } catch (error) {
        this.error = 'Failed to load products'
        console.error('Error fetching products:', error)
      } finally {
        this.loading = false
        console.log('Loading state:', this.loading) // Log the loading state
      }
    },
    async addProduct(product: Product) {
      this.loading = true
      this.error = null

      try {
        const response = await addNewProduct(product)
        this.products.push(response)
      } catch (error) {
        this.error = 'Failed to add product'
        console.error('Failed to add product', { error })
      } finally {
        this.loading = false
      }
    },
    async getProductById(productId: number) {
      this.loading = true
      this.error = null

      try {
        const response = await apiGetProductById(productId) // Assuming this API call exists
        this.selectedProduct = response
        return response
      } catch (error) {
        this.error = 'Failed to load product'
        console.error('Error fetching product:', error)
      } finally {
        this.loading = false
      }
    },
    async updateProduct(product: Product) {
      this.loading = true
      this.error = null

      try {
        const response = await apiUpdateProduct(product)
        // Update the local products array
        const index = this.products.findIndex((p) => p.id === response.id)
        if (index !== -1) {
          this.products[index] = response
        }
        this.selectedProduct = response // Update the selected product
      } catch (error) {
        this.error = 'Failed to update product'
        console.error('Error updating product:', error)
      } finally {
        this.loading = false
      }
    },
    // Reset the state
    resetState() {
      this.products = []
      this.selectedProduct = null
      this.loading = false
      this.error = null
    }
  }
})
