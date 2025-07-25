<template>
  <div class="college w-full">
    <div class="container">
      <!-- 过滤条件 -->
      <UPageCard class="p-0 mb-4">
        <CollectFilter @change="onFilterChange"></CollectFilter>
      </UPageCard>

      <!-- 院校列表 - 移动端 -->
      <UPageCard class="p0 md:hidden">
        <UPageList divide v-if="colleges.length > 0">
          <UPageCard v-for="(college, index) in colleges" :key="college._id || index" variant="ghost">
            <template #body>
              <UUser :to="'/college/' + college.code" :name="college.name"
                :description="`${college.nature} | ${college.level} | ${college.region}`"
                :avatar="{ src: `${assetUrl}${college.logo}`, alt: college.name }" size="xl" />
            </template>
          </UPageCard>
        </UPageList>

        <UPageList divide v-else>
          <UPageCard v-for="i in limit" :key="i" variant="ghost">
            <template #body>
              <div class="skeleton flex items-center gap-4">
                <USkeleton class="h-12 w-12 rounded-full" />
                <div class="grid gap-2">
                  <USkeleton class="h-4 w-[250px]" />
                  <USkeleton class="h-4 w-[200px]" />
                </div>
              </div>
            </template>
          </UPageCard>
        </UPageList>
      </UPageCard>
      <!-- 院校列表 - 移动端 -->

      <!-- 院校列表 - PC端 -->
      <UPageCard class="p0 hidden md:block">
        <UPageList divide v-show="colleges.length > 0">
          <UPageCard v-for="(college, index) in colleges" :key="college._id || index" variant="ghost">
            <template #body>
              <UUser :to="'/college/' + college.code" :name="college.name"
                :description="`${college.nature} | ${college.level} | ${college.region.includes(',') ? college.region.split(',')[1] : college.region}`"
                :avatar="{ src: `${assetUrl}${college.logo}`, alt: college.name }" size="xl" />
            </template>

            <!-- <template #header>
              <p>header</p>
            </template>

            <template #leading>
              <p>leading</p>
            </template>

            <template #title>
              <p>title</p>
            </template>

            <template #description>
              <p>description</p>
            </template>

            <template #footer>
              <p>footer</p>
            </template> -->
          </UPageCard>
        </UPageList>
      </UPageCard>
      <!-- 院校列表 - PC端 -->

      <!-- 分页 -->
      <div class="mt-6 flex flex-col sm:flex-row justify-center items-center gap-2">
        <UPagination v-model:page="page" :items-per-page="limit" :total="total" show-edges :sibling-count="1"
          active-color="neutral" />
        <USelect v-model="limit" :items="limitList" class="w-30 ml-2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import CollectFilter from './components/filter.vue'

const { list: collegeList } = useCollegeApi();

const config = useRuntimeConfig();
const assetUrl = config.public.assetBase;

interface College {
  _id: string
  affiliate: string
  code: string
  logo: string
  name: string
  level: string
  region: string
  nature: string
}

const limitList = ref([
  {
    label: '每页10条',
    value: 10
  },
  {
    label: '每页20条',
    value: 20
  },
  {
    label: '每页50条',
    value: 50
  },
  {
    label: '每页100条',
    value: 100
  }
])

const colleges = ref<College[]>([])
const page = ref(1)
const limit = ref(10)
const total = ref(0)

// 筛选条件响应式对象
const filters = ref<{
  region?: string
  collegeLevel?: string
  collegeDept?: string
  collegeNatures?: string
  collegeTags?: string
}>({})

// 获取列表数据，带 filters 参数
const fetchColleges = async () => {
  try {
    const res: any = await collegeList(page.value, limit.value, filters.value)
    colleges.value = res.data || []
    total.value = res.total || 0
  } catch (err) {
    console.error('请求失败:', err)
  }
}

// CollectFilter 的 change 回调中保存 filters，重置页码并重新加载
const onFilterChange = (newFilters: typeof filters.value) => {
  filters.value = newFilters
  page.value = 1
  fetchColleges()
}

watch(page, fetchColleges)
watch(limit, fetchColleges)

onMounted(() => {
  fetchColleges()
})
</script>

<style scoped lang="scss">
.college {
  ::v-deep(.p0 > div) {
    padding: 0 !important;
  }

  .container {
    padding: 1rem;
  }
}
</style>
