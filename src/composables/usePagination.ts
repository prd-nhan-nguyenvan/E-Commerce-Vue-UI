import { ref, computed } from 'vue'

export function usePagination(
  fetchItems: (limit: number, offset: number) => Promise<void>,
  itemsPerPage = 10
) {
  const currentPage = ref(1)
  const totalCount = ref(0)
  const loading = ref(false)

  const totalPages = computed(() => Math.ceil(totalCount.value / itemsPerPage))

  const goToPage = async (page: number) => {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
    const offset = (page - 1) * itemsPerPage
    loading.value = true
    await fetchItems(itemsPerPage, offset)
    loading.value = false
  }

  const loadPrevious = async () => {
    if (currentPage.value > 1) {
      await goToPage(currentPage.value - 1)
    }
  }

  const loadNext = async () => {
    if (currentPage.value < totalPages.value) {
      await goToPage(currentPage.value + 1)
    }
  }

  return {
    currentPage,
    totalPages,
    goToPage,
    loadPrevious,
    loadNext,
    loading,
    setTotalCount: (count: number) => {
      totalCount.value = count
    }
  }
}
