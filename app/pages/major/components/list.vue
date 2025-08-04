<template>
  <div class="list">
    <p>{{ props.majorData ? props.majorData.type : '' }}</p>
  </div>
</template>

<script lang="ts" setup>
interface IMajor {
  code: string;
  name: string;
  type: string;
}

const props = defineProps<{
  majorData: IMajor | null;
}>();
</script>

<style></style>