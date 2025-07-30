export const useDictApi = () => {
  const config = useRuntimeConfig()
  const token = useCookie('token')

  const headers = computed(() => {
    const result: Record<string, string> = {}
    if (token.value) {
      result.Authorization = `Bearer ${token.value}`
    }
    return result
  })

  const baseTypeUrl = `${config.public.apiBase}/dict/type`
  const baseDataUrl = `${config.public.apiBase}/dict/data`

  return {
    // --------------------
    // 字典类型 Type
    // --------------------

    // 分页获取字典类型列表
    listType: (page = 1, limit = 10, filters = {}) =>
      $fetch(baseTypeUrl, {
        method: 'GET',
        headers: headers.value,
        params: { page, limit, ...filters }
      }),

    // 根据 ID 获取字典类型详情
    getTypeById: (id: string) =>
      $fetch(`${baseTypeUrl}/${id}`, {
        method: 'GET',
        headers: headers.value
      }),

    // 创建字典类型
    createType: (data: any) =>
      $fetch(baseTypeUrl, {
        method: 'POST',
        headers: headers.value,
        body: data
      }),

    // 更新字典类型
    updateType: (id: string, data: any) =>
      $fetch(`${baseTypeUrl}/${id}`, {
        method: 'PUT',
        headers: headers.value,
        body: data
      }),

    // 删除字典类型
    deleteType: (id: string) =>
      $fetch(`${baseTypeUrl}/${id}`, {
        method: 'DELETE',
        headers: headers.value
      }),

    // --------------------
    // 字典数据 Data
    // --------------------

    // 获取某个类型下的数据列表（通过 type 名称）
    getDataByType: (type: string) =>
      $fetch(`${config.public.apiBase}/dict/data/${type}`, {
        method: 'GET',
        headers: headers.value
      }),

    // 分页获取数据项
    listData: (page = 1, limit = 10, filters = {}) =>
      $fetch(baseDataUrl, {
        method: 'GET',
        headers: headers.value,
        params: { page, limit, ...filters }
      }),

    // 获取单个数据项
    getDataById: (id: string) =>
      $fetch(`${baseDataUrl}/${id}`, {
        method: 'GET',
        headers: headers.value
      }),

    // 创建字典数据项
    createData: (data: any) =>
      $fetch(baseDataUrl, {
        method: 'POST',
        headers: headers.value,
        body: data
      }),

    // 更新字典数据项
    updateData: (id: string, data: any) =>
      $fetch(`${baseDataUrl}/${id}`, {
        method: 'PUT',
        headers: headers.value,
        body: data
      }),

    // 删除字典数据项
    deleteData: (id: string) =>
      $fetch(`${baseDataUrl}/${id}`, {
        method: 'DELETE',
        headers: headers.value
      })
  }
}
