import { api } from '.'
import { ContentType, type Category, type Product } from './api'

export interface ProductBody {
  category: number
  name: string
  slug?: string | undefined
  description: string
  price: string
  sell_price: string
  on_sell?: boolean | undefined
  stock: number
  image?: File | null | undefined
}

// Fetch all products
export const getAllProducts = async (query: { limit?: number; offset?: number }): Promise<any> => {
  try {
    const response = await api.products.productsProductsList(query)
    return response.data
  } catch (error) {
    console.error('Failed to fetch products:', error)
    throw new Error('Failed to fetch products')
  }
}

export const getProductBySlug = async (slug: string) => {
  try {
    const response = await api.products.productsProductsSlugRead(slug)
    return response.data
  } catch (error) {
    console.error({ error })
    throw error
  }
}

export const addNewProduct = async (productData: ProductBody) => {
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

export const updateProduct = async (productData: any) => {
  try {
    if (!productData.id) {
      throw new Error('Product ID is required')
    }
    if (productData.image instanceof File) {
      /* empty */
    } else {
      delete productData.image
    }
    const response = await api.products.productsProductsPartialUpdate(productData.id, productData)
    return response.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const deleteProduct = async (productId: number) => {
  try {
    const response = await api.products.productsProductsDelete(productId)
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

export const getCategoryById = async (id: number) => {
  try {
    const response = await api.products.productsCategoriesRead(id)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const addNewCategory = async (category: Category) => {
  try {
    const response = await api.products.productsCategoriesCreate(category, {
      headers: {
        'Content-Type': ContentType.Json
      }
    })
    return response.data
  } catch (error) {
    console.error({ error })
    throw error
  }
}

export const updateCategory = async (categoryId: number, category: Category) => {
  try {
    const response = await api.products.productsCategoriesUpdate(categoryId, category, {
      headers: {
        'Content-Type': ContentType.Json
      }
    })
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
