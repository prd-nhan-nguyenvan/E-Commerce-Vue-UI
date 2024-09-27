import { api } from '.'
import { ContentType, type Category, type Product } from './api'

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

export const addNewProduct = async (productData: Product) => {
  try {
    const response = await api.products.productsProductsCreate(productData, {
      headers: { 'Content-Type': ContentType.FormData }
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getProductById = async (productId: number) => {
  try {
    const response = await api.products.productsProductsRead(productId)
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const updateProduct = async (productData: Product) => {
  try {
    if (!productData.id) throw 'Require product id'

    const response = await api.products.productsProductsUpdate(productData.id, productData)
    return response.data
  } catch (err) {
    console.error(err)
    throw err
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
