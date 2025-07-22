<template>
  <div class="college w-full">
    <div class="container">
      <!-- 过滤条件 -->
      <UPageCard class="p-0 mb-4">
        <UDashboardSearchButton class="w-48" />
        <!-- <UDashboardSearch v-model:search-term="searchTerm" shortcut="meta_k" :groups="[]"
          :fuse="{ resultLimit: 42 }" /> -->

        <div class="filter">
          <div class="filter-item">
            <div class="label">院校所在地</div>
            <ul class="list">
              <li class="list-item" :class="selectedRegion === item.code ? 'active' : ''"
                v-for="(item, index) in regions" :key="index" @click="onRegionChange(item.code)">{{ item.short }}</li>
            </ul>
          </div>
        </div>
      </UPageCard>

      <!-- 数据列表 -->
      <UPageCard class="p0">
        <!-- 过滤条件 -->
        <UPageList divide v-show="colleges.length > 0">
          <UPageCard v-for="(college, index) in colleges" :key="college._id || index" variant="ghost">
            <template #body>
              <UUser :name="college.name" :description="`${college.nature} | ${college.level} | ${college.location}`"
                :avatar="{ src: `${assetUrl}${college.logo}`, alt: college.name }" size="xl" />

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
const { list: collegeList } = useCollegeApi();
const { list: regionList } = useRegionApi();

const config = useRuntimeConfig();
const assetUrl = config.public.assetBase;

const searchTerm = ref('');

const regions: any = ref([]);
const selectedRegion = ref('');

const fetchRegions = async () => {
  try {
    const res: any = await regionList()
    regions.value = res.data || []
    regions.value.unshift({ code: '', short: '全部' })
  } catch (err) {
    console.error('请求失败:', err)
  }
}

const onRegionChange = (code: string) => {
  selectedRegion.value = code;
  fetchColleges();
}

interface College {
  _id: string
  affiliate: string
  code: string
  logo: string
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
    const res: any = await collegeList(page.value, limit.value)
    colleges.value = res.data || []
    total.value = res.total || 0
  } catch (err) {
    console.error('请求失败:', err)
  }
}

watch(page, fetchColleges)
watch(limit, fetchColleges)

onMounted(() => {
  fetchRegions()
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

    .filter {
      font-size: 14px;

      .filter-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 1rem;

        .label {
          width: 8rem;
          font-weight: bold;
          margin-right: 0.5rem;
        }

        .list {
          display: flex;
          flex-wrap: wrap;

          .list-item {
            margin-right: 1rem;
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
  }
}
</style>
