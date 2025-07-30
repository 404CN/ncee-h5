<template>
  <div class="filter flex flex-col items-start justify-start gap-4">
    <UDashboardSearchButton class="filter-item w-48" />

    <div class="filter-item">
      <div class="label">所在地区</div>
      <div class="flex row gap-2" v-if="loading">
        <USkeleton v-for="i in 35" class="h-4 w-[50px]" />
      </div>
      <ul class="list" v-else>
        <li class="list-item" :class="filters.region === item.code ? 'active' : ''" v-for="(item, index) in regions"
          :key="index" @click="onRegionChange(item.code)">{{ item.short }}</li>
      </ul>
    </div>

    <div class="filter-item">
      <div class="label">办学层次</div>
      <div class="flex row gap-2" v-if="loading">
        <USkeleton v-for="i in 3" class="h-4 w-[50px]" />
      </div>
      <ul class="list" v-else>
        <li class="list-item" :class="filters.collegeLevel === item.value ? 'active' : ''"
          v-for="(item, index) in collegeLevels" :key="index" @click="onCollegeLevelChange(item.value)">{{ item.label }}
        </li>
      </ul>
    </div>

    <div class="filter-item">
      <div class="label">办学类型</div>
      <div class="flex row gap-2" v-if="loading">
        <USkeleton v-for="i in 3" class="h-4 w-[50px]" />
      </div>
      <ul class="list" v-else>
        <li class="list-item" :class="filters.collegeNature === item.value ? 'active' : ''"
          v-for="(item, index) in collegeNatures" :key="index" @click="onCollegeNatureChange(item.value)">{{ item.label
          }}
        </li>
      </ul>
    </div>

    <div class="filter-item">
      <div class="label">主管部门</div>
      <div class="flex row gap-2" v-if="loading">
        <USkeleton v-for="i in 5" class="h-4 w-[50px]" />
      </div>
      <ul class="list" v-else>
        <li class="list-item" :class="filters.collegeDept === item.value ? 'active' : ''"
          v-for="(item, index) in collegeDepts" :key="index" @click="onCollegeDeptChange(item.value)">{{ item.label }}
        </li>
      </ul>
    </div>

    <div class="filter-item">
      <div class="label">院校特性</div>
      <div class="flex row gap-2" v-if="loading">
        <USkeleton v-for="i in 7" class="h-4 w-[50px]" />
      </div>
      <ul class="list" v-else>
        <li class="list-item" :class="filters.collegeTag === item.value ? 'active' : ''"
          v-for="(item, index) in collegeTags" :key="index" @click="onCollegeTagChange(item.value)">{{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { list: regionList } = useRegionApi();
const { getDataByType }: any = useDictApi();

// 关键词
const searchTerm = ref('');

interface IFilterData {
  region?: string
  collegeLevel?: string
  collegeDept?: string
  collegeNature?: string
  collegeTag?: string
}

interface IDictDataItem {
  _id: string
  alias: string
  createAt: string
  default: boolean
  label: string
  remark: string
  sort: number
  status: number
  type: string
  updateAt: string
  value: string
}

interface IRegionItem {
  code: string
  short: string
}

// 筛选条件
const filters = reactive<IFilterData>({
  region: '',
  collegeLevel: '',
  collegeDept: '',
  collegeNature: '',
  collegeTag: '',
})

const emit = defineEmits<{
  (e: 'change', filters: IFilterData): void
}>()

watch(filters, (val) => {
  emit('change', { ...val })
})

const loading = ref(false)

// UI数据
const regions = ref<any[]>([])
const collegeLevels = ref<any[]>([])
const collegeDepts = ref<any[]>([])
const collegeNatures = ref<any[]>([])
const collegeTags = ref<any[]>([])

// 筛选项变更
const onRegionChange = (code: string) => {
  filters.region = code
}

const onCollegeLevelChange = (code: string) => {
  filters.collegeLevel = code
}

const onCollegeDeptChange = (code: string) => {
  filters.collegeDept = code
}

const onCollegeNatureChange = (code: string) => {
  filters.collegeNature = code
}

const onCollegeTagChange = (code: string) => {
  filters.collegeTag = code
}

// 并行请求数据
const fetchAllOptions = async () => {
  loading.value = true

  try {
    const results = await Promise.allSettled([
      regionList() as Promise<{ data: IRegionItem[] }>,
      getDataByType('college_level') as Promise<{ data: IDictDataItem[] }>,
      getDataByType('college_affiliation') as Promise<{ data: IDictDataItem[] }>,
      getDataByType('college_nature') as Promise<{ data: IDictDataItem[] }>,
      getDataByType('college_tag') as Promise<{ data: IDictDataItem[] }>,
    ])

    const [regionRes, levelRes, deptRes, natureRes, tagRes] = results

    // 地区
    if (regionRes.status === 'fulfilled') {
      regions.value = [{ code: '', short: '全部' }, ...(regionRes.value.data || [])]
    } else {
      console.warn('获取地区失败:', regionRes.reason)
      regions.value = [{ code: '', short: '全部' }]
    }

    // 办学层次
    if (levelRes.status === 'fulfilled') {
      collegeLevels.value = [{ value: '', label: '全部' }, ...(levelRes.value.data || [])]
    } else {
      console.warn('获取办学层次失败:', levelRes.reason)
      collegeLevels.value = [{ value: '', label: '全部' }]
    }

    // 主管部门
    if (deptRes.status === 'fulfilled') {
      collegeDepts.value = [{ value: '', label: '全部' }, ...(deptRes.value.data || [])]
    } else {
      console.warn('获取主管部门失败:', deptRes.reason)
      collegeDepts.value = [{ value: '', label: '全部' }]
    }

    // 院校特性
    if (natureRes.status === 'fulfilled') {
      collegeNatures.value = [{ value: '', label: '全部', en: '' }, ...(natureRes.value.data || [])]
    } else {
      console.warn('获取院校特性失败:', natureRes.reason)
      collegeNatures.value = [{ value: '', label: '全部', en: '' }]
    }

    // 院校标签
    if (tagRes.status === 'fulfilled') {
      collegeTags.value = [{ value: '', label: '全部', attr: '', desc: '' }, ...(tagRes.value.data || [])]
    } else {
      console.warn('获取院校标签失败:', tagRes.reason)
      collegeTags.value = [{ value: '', label: '全部', attr: '', desc: '' }]
    }
  } catch (err) {
    // 一般不会触发，只有 Promise.allSettled 本身失败时才触发（如 JS 语法错误）
    console.error('未知错误:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAllOptions()
})
</script>

<style lang="scss" scoped>
.filter {
  font-size: 14px;

  .filter-item {
    display: flex;
    align-items: flex-start;

    $label-width: 6rem;

    .label {
      width: $label-width;
      max-width: $label-width;
      min-width: $label-width;
      font-weight: bold;
      margin: 0.2rem 0;
    }

    .list {
      display: flex;
      flex-wrap: wrap;

      .list-item {
        margin: 0.2rem 1rem 0.2rem 0;
        cursor: pointer;
        transition: color 0.2s;

        &:hover,
        &.active {
          color: var(--color-primary);
        }
      }
    }
  }
}
</style>