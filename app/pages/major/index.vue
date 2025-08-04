<template>
  <div class="major w-full">
    <div class="container">
      <UTabs variant="pill" color="neutral" :content="true" :items="items" class="w-full">
        <template #bachelor="{ item }">
          <MajorBachelor />
        </template>
        <template #associate="{ item }">
          <MajorAssociate />
        </template>
        <template #master="{ item }">
          <MajorMaster />
        </template>
      </UTabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui'
import MajorBachelor from './components/bachelor.vue'
import MajorAssociate from './components/associate.vue'
import MajorMaster from './components/master.vue'

const items = ([
  {
    label: '本科',
    slot: 'bachelor' as const
  },
  {
    label: '专科',
    slot: 'associate' as const
  },
  {
    label: '研究生',
    slot: 'master' as const
  }
] satisfies TabsItem[])
</script>

<style lang="scss" scoped></style>