export const useCollegeDeptApi = () => {
  const config = useRuntimeConfig()
  const token = useCookie('token')
  const baseUrl = `${config.public.apiBase}/college-dept`

  const headers = computed(() => {
    const result: Record<string, string> = {}
    if (token.value) {
      result.Authorization = `Bearer ${token.value}`
    }
    return result
  })

  return {
    // 获取分页列表
    list: (page = 1, limit = 100, extraParams = {}) =>
      $fetch(baseUrl, {
        method: 'GET',
        headers: headers.value,
        params: { page, limit, ...extraParams }
      }),

    // 获取单个
    get: (code: number | string) =>
      $fetch(baseUrl, {
        method: 'GET',
        query: { code },
        headers: headers.value
      }),

    // 创建
    create: (data: any) =>
      $fetch(baseUrl, {
        method: 'POST',
        body: data,
        headers: headers.value
      }),

    // 更新
    update: (id: number | string, data: any) =>
      $fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        body: data,
        headers: headers.value
      }),

    // 删除
    remove: (id: number | string) =>
      $fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: headers.value
      })
  }
}
