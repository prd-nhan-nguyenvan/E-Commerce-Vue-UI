import { api } from '.'
import type { Category } from './api'

// Fetch all products
export const getAllProducts = async () => {
  try {
    const response = await api.products.productsProductsList()
    return response.data // Return the product data
  } catch (error) {
    console.error('Failed to fetch products:', error)
    throw error
  }
}

export const getProduct = async (slug: string) => {
  try {
    const response = await api.products.productsProductsSlugRead(slug)
    return response.data
  } catch (error) {
    console.error({ error })
    throw error
  }
}

export const getAllCategories = async () => {
  try {
    const response = await api.products.productsCategoriesList()
    return response.data
  } catch (error) {
    console.error({ error })
    throw error
  }
}

export const addNewCategory = async (category: Category) => {
  try {
    const response = await api.products.productsCategoriesCreate(category)
    return response.data
  } catch (error) {
    console.error({ error })
    throw error
  }
}

export const updateCategory = async (categoryId: number, category: Category) => {
  try {
    console.log({ category })
    const response = await api.products.productsCategoriesUpdate(categoryId, category)

    return response.data
  } catch (error) {
    console.error({ error })
    throw error
  }
}

export const deleteCategory = async (categoryId: number) => {
  try {
    const response = await api.products.productsCategoriesDelete(categoryId)
    return response.data
  } catch (error) {
    console.error({ error })
    throw error
  }
}
