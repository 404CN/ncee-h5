export const useRegionApi = () => {
  const config = useRuntimeConfig()
  const token = useCookie('token')
  const baseUrl = `${config.public.apiBase}/region`

  const headers = computed(() => {
    const result: Record<string, string> = {}
    if (token.value) {
      result.Authorization = `Bearer ${token.value}`
    }
    return result
  })

  return {
    // 获取列表
    list: (extraParams = {}) =>
      $fetch(baseUrl, {
        method: 'GET',
        headers: headers.value,
        params: { ...extraParams }
      }),
  }
}
