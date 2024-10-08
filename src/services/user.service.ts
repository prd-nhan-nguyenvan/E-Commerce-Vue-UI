import { api } from '.'

export interface userProfileUpdateInput {
  first_name?: string
  last_name?: string
  bio?: string
  profile_picture?: File | null
  phone_number?: string
  address?: string
}

export const getUserProfile = async () => {
  try {
    const response = await api.users.usersProfileRead()

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateProfile = async (profileData: userProfileUpdateInput) => {
  try {
    const response = await api.users.usersProfilePartialUpdate(profileData)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
