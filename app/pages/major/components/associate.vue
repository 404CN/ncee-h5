<template>
  <div class="associate">
    <MajorList :majorData="majorData" />
  </div>
</template>

<script lang="ts" setup>
import MajorList from './list.vue';

const { list: majorList } = useMajorApi();

interface IMajor {
  code: string;
  name: string;
  type: string;
}

const majorData = ref<IMajor | null>(null);

onMounted(() => {
  majorList('associate').then((res) => {
    majorData.value = res.data;
  });
})
</script>

<style></style>