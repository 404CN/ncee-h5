export const useMajorApi = () => {
  const config = useRuntimeConfig()
  const token = useCookie('token')
  const baseUrl = `${config.public.apiBase}/major`

  const headers = computed(() => {
    const result: Record<string, string> = {}
    if (token.value) {
      result.Authorization = `Bearer ${token.value}`
    }
    return result
  })

  return {
    // 获取列表
    list: (type: string) =>
      $fetch(`${baseUrl}/${type}`, {
        method: 'GET',
        headers: headers.value,
      }),
  }
}
