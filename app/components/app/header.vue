<template>
  <UHeader>
    <template #title>
      <h1>NCEE DB</h1>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']"></UTooltip>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = [
  {
    label: '首页',
    icon: '',
    to: '/',
    target: '',
  },
  {
    label: '院校',
    icon: '',
    to: '/college',
  },
  {
    label: '学科',
    icon: '',
    to: '/discipline',
  },
  {
    label: '专业',
    icon: '',
    to: '/major',
  },
] satisfies NavigationMenuItem[]
</script>

<style lang="scss" scoped>
.header {
  .logo {
    h1 {
      font-size: 1.2rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: #666;
      }
    }
  }
}
</style>