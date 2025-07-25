<template>
  <div class="filter flex flex-col items-start justify-start gap-4">
    <UDashboardSearchButton class="filter-item w-48" />

    <div class="filter-item">
      <div class="label">所在地区</div>
      <ul class="list">
        <li class="list-item" :class="selectedRegion === item.code ? 'active' : ''" v-for="(item, index) in regions"
          :key="index" @click="onRegionChange(item.code)">{{ item.short }}</li>
      </ul>
    </div>

    <div class="filter-item">
      <div class="label">办学层次</div>
      <ul class="list">
        <li class="list-item" :class="selectedRegion === item.code ? 'active' : ''" v-for="(item, index) in regions"
          :key="index" @click="onRegionChange(item.code)">{{ item.short }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { list: regionList } = useRegionApi();

// 关键词
const searchTerm = ref('');

// 所在地区
const regions: any = ref([]);
const selectedRegion = ref('');

const fetchRegions = async () => {
  try {
    const res: any = await regionList()
    regions.value = res.data || []
    regions.value.unshift({ code: '', short: '全部' })
  } catch (err) {
    console.error('获取地区失败:', err)
  }
}

const onRegionChange = (code: string) => {
  selectedRegion.value = code;
}

// 办学层次

onMounted(() => {
  fetchRegions()
})
</script>

<style lang="scss" scoped>
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
</style>