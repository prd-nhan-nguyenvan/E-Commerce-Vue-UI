import { api } from '.'

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
