import { api } from '.'
import { type Category, type Product } from './api'

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
    const response = await api.products.productsProductsCreate(productData)

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

export const updateProduct = async (productData) => {
  try {
    if (!productData.id) throw 'Require product id'
    // Create a new FormData instance
    const formData = new FormData()

    // Append product fields to the FormData object
    formData.append('category', productData.category.toString())
    formData.append('name', productData.name)
    formData.append('description', productData.description)
    formData.append('price', productData.price)
    formData.append('sell_price', productData.sell_price)
    formData.append('on_sell', productData.on_sell ? 'true' : 'false')
    formData.append('stock', productData.stock.toString())

    // Check if an image is present and append it to FormData
    if (productData.image) {
      formData.append('image', productData.image)
    }
    const response = await api.products.productsProductsPartialUpdate(productData.id, productData)
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
