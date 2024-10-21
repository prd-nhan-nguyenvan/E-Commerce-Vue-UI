import { api, type AddToCart } from '.'

export const addToCart = async (addToCartData: AddToCart) => {
  try {
    const response = await api.carts.cartsAddCreate(addToCartData)
    return response.data
  } catch (error) {
    console.error('Failed to add to carts:', error)
    throw new Error('Failed to add to carts')
  }
}

export const fetchCart = async () => {
  try {
    const response = await api.carts.cartsList()
    return response.data
  } catch (error) {
    console.error('Failed to get carts:', error)
    throw new Error('Failed to get carts')
  }
}

export const removeFromCart = async (productId: string) => {
  try {
    const response = await api.carts.cartsRemoveDelete(productId)
    return response.data
  } catch (error) {
    console.error('Failed to remove from cart:', error)
    throw new Error('Failed to remove from cart')
  }
}
