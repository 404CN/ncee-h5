<template>
  <div class="college-detail">
    <div class="container">
      <UPageCard class="p0">
        <div class="card-wrap">
          <NuxtImg :src="`${assetUrl}/logo/${route.params.code}.jpg`" width="200" height="200" />
        </div>
      </UPageCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { get: getCollege } = useCollegeApi();

const config = useRuntimeConfig();
const assetUrl = config.public.assetBase;

const route = useRoute()
console.log(route.params.code)

const college = ref(null);

const fetchCollege = async () => {
  try {
    const res: any = await getCollege(typeof route.params.code === 'string' ? route.params.code : '');
    college.value = res.data;
  } catch (err) {
    console.error('请求失败:', err)
  }
}

onMounted(() => {
  fetchCollege();
})
</script>

<style lang="scss" scoped>
.college-detail {}
</style>