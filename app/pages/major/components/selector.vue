<template>
  <div class="flex border border-gray-300 rounded overflow-hidden w-full text-[14px] mt-6">
    <!-- 第 1 列 -->
    <div class="w-[20%] bg-white border-r border-gray-300 flex flex-col min-h-0">
      <ul class="flex-1 list-none m-0 p-0 overflow-y-auto">
        <li v-for="item in data" :key="item.code" :class="[
          'px-4 py-2 cursor-pointer transition-colors hover:bg-slate-100',
          activeLevel1?.code === item.code && 'bg-slate-200 font-bold'
        ]" @click="selectLevel1(item)">
          {{ `${item.name} (${item.code})` }}
        </li>
      </ul>
    </div>

    <!-- 第 2 列 -->
    <div v-if="levelCount >= 2" :class="[
      'bg-white flex flex-col min-h-0',
      levelCount === 3 ? 'w-[20%] border-r border-gray-300' : 'flex-1'
    ]">
      <ul class="flex-1 list-none m-0 p-0 overflow-y-auto">
        <li v-for="item in level2List" :key="item.code" :class="[
          'px-4 py-2 cursor-pointer transition-colors hover:bg-slate-100',
          activeLevel2?.code === item.code && 'bg-slate-200 font-bold'
        ]" @click="selectLevel2(item)">
          {{ `${item.name} (${item.code})` }}
        </li>
      </ul>
    </div>

    <!-- 第 3 列 -->
    <div v-if="levelCount === 3" class="w-[60%] bg-white flex flex-col min-h-0">
      <ul class="flex-1 list-none m-0 p-0 overflow-y-auto">
        <li v-for="item in level3List" :key="item.code"
          class="px-4 py-2 cursor-pointer transition-colors hover:bg-slate-100">
          {{ `${item.name} (${item.code})` }}
        </li>
      </ul>
    </div>

    <!-- 二级结构时的右侧列 -->
    <div v-else-if="levelCount === 2 && activeLevel2?.children?.length" class="flex-1 bg-white flex flex-col min-h-0">
      <ul class="flex-1 list-none m-0 p-0 overflow-y-auto">
        <li v-for="item in activeLevel2.children" :key="item.code"
          class="px-4 py-2 cursor-pointer transition-colors hover:bg-slate-100">
          {{ `${item.name} (${item.code})` }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface MajorNode {
  name: string;
  code: string;
  type?: string;
  desc?: string;
  level?: string;
  remark?: string;
  children?: MajorNode[];
}

const props = defineProps<{
  data: MajorNode[];
}>();

const activeLevel1 = ref<MajorNode | null>(null);
const activeLevel2 = ref<MajorNode | null>(null);

const level2List = computed(() => activeLevel1.value?.children || []);
const level3List = computed(() => activeLevel2.value?.children || []);

const levelCount = computed(() => {
  return props.data.some((item) =>
    item.children?.some((sub) => sub.children && sub.children.length > 0)
  )
    ? 3
    : 2;
});

function selectLevel1(item: MajorNode) {
  activeLevel1.value = item;
  activeLevel2.value = null;
}

function selectLevel2(item: MajorNode) {
  activeLevel2.value = item;
}
</script>
