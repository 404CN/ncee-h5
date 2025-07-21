<template>
  <USeparator />

  <UFooter>
    <template #left>
      <p class="text-muted text-sm">Copyright © {{ new Date().getFullYear() }}</p>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UButton icon="i-simple-icons-github" color="neutral" variant="ghost" to="https://github.com/nuxt/nuxt"
        target="_blank" aria-label="GitHub" />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [
  {
    label: '网站声明',
    to: '/statement'
  },
  {
    label: '网站地图',
    to: '/sitemap.xml',
    target: '_blank'
  },
  // {
  //   label: '404.cafe',
  //   to: 'https://www.404.cafe',
  //   target: '_blank'
  // }
]
</script>

<style></style>