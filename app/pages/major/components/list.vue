<template>
  <div class="list" v-if="props.majorData">
    <MajorSelector :data="props.majorData.data" />
  </div>
  <div class="empty" v-else>暂无数据</div>
</template>

<script lang="ts" setup>
import MajorSelector from './selector.vue';

interface MajorNode {
  name: string;
  code: string;
  type?: string;
  desc?: string;
  level?: string;
  remark?: string;
  children?: MajorNode[];
}

interface IMajor {
  code: string;
  name: string;
  type: string;
  data: MajorNode[];
}

const props = defineProps<{
  majorData: IMajor | null;
}>();

watch(
  () => props.majorData,
  (newVal) => {
    if (newVal) {
      console.log('Major data updated:', newVal);
    }
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.empty {
  font-size: 14px;
  text-align: center;
  margin: 5rem 0;
}
</style>