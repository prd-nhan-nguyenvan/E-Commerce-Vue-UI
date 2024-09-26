import { api } from '.'

export const getUserProfile = async () => {
  try {
    const response = await api.users.usersProfileRead()

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
