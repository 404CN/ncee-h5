<template>
  <div class="major w-full">
    <div class="container">
      <UTabs variant="pill" color="neutral" :content="true" :items="items" class="w-full">
        <template #undergraduate="{ item }">本科</template>
        <template #diploma="{ item }">专科</template>
        <template #graduate="{ item }">研究生</template>
      </UTabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui'

const items = ref<TabsItem[]>([
  {
    label: '本科',
    slot: 'undergraduate' as const
  },
  {
    label: '专科',
    slot: 'diploma' as const
  },
  {
    label: '研究生',
    slot: 'graduate' as const
  }
] satisfies TabsItem[])
</script>

<style lang="scss" scoped></style>