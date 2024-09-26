import { api } from '.'

import type { TokenObtainPair, TokenRefresh } from './api'

export const login = async (loginData: TokenObtainPair): Promise<TokenRefresh> => {
  try {
    // Make the login request
    const response = await api.auth.authLoginCreate(loginData)

    // Log the full response for debugging
    console.log({ response })

    // Store the access and refresh tokens in local storage
    localStorage.setItem('accessToken', response.data.access)
    localStorage.setItem('refreshToken', response.data.refresh)

    return response.data
  } catch (error) {
    // Log the error for debugging
    console.error('Login error:', error)

    // Handle the error gracefully
    if (error.response) {
      // If the error has a response, display a specific message
      throw new Error(`Login failed: ${error.response.data.detail || 'Unknown error'}`)
    } else {
      throw new Error('Login failed. Please check your credentials.')
    }
  }
}
