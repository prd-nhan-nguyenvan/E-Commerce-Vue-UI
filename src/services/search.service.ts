import { api } from './'

export const getSuggestions = async (query: string, limit: number = 5) => {
  try {
    const response = await api.search.searchSuggest({
      query,
      limit
    })
    return response.data
  } catch (error) {
    console.error('Failed to get suggestions:', error)
    throw new Error('Failed to get suggestions')
  }
}
