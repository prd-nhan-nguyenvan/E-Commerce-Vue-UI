import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

export const getCategoryName = (categoryId: number | undefined) => {
  const category = categoryStore.categories.find((c) => c.id === categoryId)
  return category ? category.name : 'Unknown'
}
