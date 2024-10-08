import { api } from '.'
import { ContentType, type UserProfile } from './api'

export const getUserProfile = async () => {
  try {
    const response = await api.users.usersProfileRead()

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateProfile = async (profileData: UserProfile) => {
  try {
    const response = await api.users.usersProfilePartialUpdate(profileData, {
      headers: {
        'Content-Type': ContentType.Json
      }
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
