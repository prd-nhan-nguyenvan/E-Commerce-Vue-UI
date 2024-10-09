import { getCategoryById } from '@/services/product.service'

export const getCategoryName = async (categoryId: number | undefined) => {
  if (!categoryId) return 'Unknown'

  const category = await getCategoryById(categoryId)
  return category ? category.name : 'Unknown'
}
