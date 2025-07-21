<template>
  <div class="home w-full">
    <div class="container">
      <UPageCard :title="pageData.title" :description="pageData.desc" :icon="pageData.icon" orientation="horizontal"
        spotlight spotlight-color="primary">
        <img :src="pageData.img" alt="NCEE DATABASE" class="w-full" />
      </UPageCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'NCEE DATABASE',
  meta: [
    { name: 'keywords', content: 'NCEE DATABASE' },
    { name: 'description', content: 'NCEE database v1.0' },
  ],
  bodyAttrs: {},
});

const pageData = ref({
  title: "NCEE DATABASE",
  desc: "NCEE database v1.0 comming soon.",
  icon: "",
  img: "https://ui.nuxt.com/tailwindcss-v4.svg",
});
</script>

<style lang="scss" scoped></style>