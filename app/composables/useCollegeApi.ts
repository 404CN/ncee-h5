// composables/college.ts
export const useCollegeApi = () => {
  const config = useRuntimeConfig()
  const token = useCookie('token')
  const baseUrl = `${config.public.apiBase}/college`

  const headers = computed(() => {
    const result: Record<string, string> = {}
    if (token.value) {
      result.Authorization = `Bearer ${token.value}`
    }
    return result
  })

  return {
    // 获取分页列表
    list: (page = 1, limit = 10, extraParams = {}) =>
      $fetch(baseUrl, {
        method: 'GET',
        headers: headers.value,
        params: { page, limit, ...extraParams }
      }),

    // 获取单个院校
    get: (id: number | string) =>
      $fetch(`${baseUrl}/${id}`, {
        method: 'GET',
        headers: headers.value
      }),

    // 创建院校
    create: (data: any) =>
      $fetch(baseUrl, {
        method: 'POST',
        body: data,
        headers: headers.value
      }),

    // 更新院校
    update: (id: number | string, data: any) =>
      $fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        body: data,
        headers: headers.value
      }),

    // 删除院校
    remove: (id: number | string) =>
      $fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: headers.value
      })
  }
}
