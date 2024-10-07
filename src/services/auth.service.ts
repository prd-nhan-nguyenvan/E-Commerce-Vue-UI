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
    throw new Error('Login failed. Please check your credentials.')
  }
}

export const logout = async () => {
  try {
    await api.auth.authLogoutCreate()
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

    console.log('User logged out successfully')
  } catch (err) {
    console.log('🚀 ~ logout ~ err:', err)
    throw new Error('Logout failed...')
  }
}
