import { api } from '.'

import type { Login } from './api'

export const login = async (loginData: Login) => {
  try {
    const response = await api.auth.authLoginCreate(loginData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log({ data: response?.data })

    return response.data
  } catch (error) {
    console.error('Login error:', error)

    if (error.response) {
      throw new Error(`Login failed: ${error.response.data.detail || 'Unknown error'}`)
    } else {
      throw new Error('Login failed. Please check your credentials.')
    }
  }
}

export const logout = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')

  console.log('User logged out successfully')
}

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await api.auth.authTokenRefreshCreate({
      refresh: refreshToken
    })

    console.log('Token refresh response:', response)

    const { access, refresh } = response.data
    if (access) localStorage.setItem('accessToken', access)
    if (refresh) localStorage.setItem('refreshToken', refresh)

    return { access, refresh }
  } catch (error) {
    console.error('Failed to refresh access token', error)
    throw new Error('Token refresh failed')
  }
}
