<template>
  <UApp>
    <header class="header">
      <app-header></app-header>
    </header>

    <NuxtPage />

    <footer class="footer">
      <app-footer></app-footer>
    </footer>
  </UApp>
</template>

<script lang="ts" setup>
useHead({
  script: [
    {
      src: 'https://hm.baidu.com/hm.js?25fe837e8cc1e34804629dd546aeeae8',
      async: true
    }
  ]
})
</script>