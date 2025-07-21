<template>
  <div class="college w-full">
    <div class="container">
      <!-- 过滤条件 -->
      <UPageCard class="p-0 mb-4">
        <UDashboardSearchButton class="w-48" />
      </UPageCard>
      <!-- 数据列表 -->
      <UPageCard class="p0">
        <!-- 过滤条件 -->
        <UPageList divide v-show="colleges.length > 0">
          <UPageCard v-for="(college, index) in colleges" :key="college._id || index" variant="ghost">
            <template #body>
              <UUser :name="college.name" :description="`${college.nature} | ${college.level} | ${college.location}`"
                :avatar="{ src: `https://asset.ncee.cc/logo/${college.code}.jpg`, alt: college.name }" size="xl" />

              <!-- <div class="flex items-center gap-4">
              <USkeleton class="h-12 w-12 rounded-full" />

              <div class="grid gap-2">
                <USkeleton class="h-4 w-[250px]" />
                <USkeleton class="h-4 w-[200px]" />
              </div>
            </div> -->
            </template>
          </UPageCard>
        </UPageList>
      </UPageCard>

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
import { ref, watch, onMounted } from 'vue'
const { list } = useCollegeApi();

interface College {
  _id: string
  affiliate: string
  code: string
  name: string
  level: string
  location: string
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

const fetchColleges = async () => {
  try {
    // const res: any = await $fetch('/api/college', {
    //   params: {
    //     page: page.value,
    //     limit: limit.value,
    //   }
    // })

    // colleges.value = res.data || []
    // total.value = res.total || 0

    const res = await list(page.value, limit.value)
    colleges.value = res.data || []
    total.value = res.total || 0
  } catch (err) {
    console.error('请求失败:', err)
  }
}

watch(page, fetchColleges)
watch(limit, fetchColleges)
onMounted(fetchColleges)
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
