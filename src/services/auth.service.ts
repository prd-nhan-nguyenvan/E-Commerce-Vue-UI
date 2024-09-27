import { api } from '.'

import type { Login, TokenRefresh } from './api'

export const login = async (loginData: Login): Promise<TokenRefresh> => {
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

export const logout = () => {
  // Remove the access and refresh tokens from local storage
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')

  // Optionally, you can also redirect the user to the login page or refresh the app
  console.log('User logged out successfully')
}

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await api.auth.authTokenRefreshCreate({
      refresh: refreshToken
    })

    // Log the response for debugging
    console.log('Token refresh response:', response)

    // Store the new access token and refresh token (if present) in localStorage
    const { access, refresh } = response.data
    if (access) localStorage.setItem('accessToken', access)
    if (refresh) localStorage.setItem('refreshToken', refresh)

    return { access, refresh }
  } catch (error) {
    console.error('Failed to refresh access token', error)
    throw new Error('Token refresh failed')
  }
}
