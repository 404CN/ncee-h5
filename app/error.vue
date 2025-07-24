<template>
  <div class="error-page w-screen h-screen py-24 flex flex-col items-center justify-center">
    <h1 class="">404</h1>

    <p class="">你访问的页面不存在</p>

    <ULink class="btn" raw to="/" active-class="font-bold" inactive-class="text-muted">返回首页</ULink>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.error-page {
  h1 {
    font-size: 5rem;
    margin: 20px 0;
  }

  p {
    font-size: 1.5rem;
    margin: 20px 0;
  }

  .btn {
    font-size: 1rem;
    margin: 20px 0;
    transition: all 0.2s;

    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>