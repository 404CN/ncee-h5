<template>
  <div class="college-detail">
    <div class="container">
      <UPageCard class="p0">
        <div class="card-wrap flex gap-10 px-4">
          <div class="logo-wrap">
            <img class="logo" :src="`${assetUrl}/logo/${route.params.code}.jpg`" width="160" height="160" />
          </div>

          <div class="details flex-grow" v-if="college">
            <h2 class="name">{{ college.name }}</h2>
            <ul class="list">
              <li class="item dept">
                <span class="label">主管部门：</span>
                <span class="value">{{ college.affiliate }}</span>
              </li>
              <li class="item region">
                <span class="label">所在地区：</span>
                <span class="value">{{ college.region.replace(/\p{P}/gu, '') }}</span>
              </li>
              <li class="item address">
                <span class="label">详细地址：</span>
                <span class="value">{{ college.address }}</span>
              </li>
              <li class="item official">
                <span class="label">官方网址：</span>
                <span class="value">
                  <ULink :href="college.website.official" target="_blank">{{ college.website.official }}</ULink>
                </span>
              </li>
              <li class="item admissions">
                <span class="label">招生网址：</span>
                <span class="value">
                  <ULink :href="college.website.admissions" target="_blank">{{ college.website.admissions }}</ULink>
                </span>
              </li>
            </ul>
          </div>
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

const removePunctuation = (str: string): string => {
  return str.replace(/\p{P}/gu, '');
}

interface ICollege {
  _id: string,
  affiliate: string,
  code: string,
  logo: string,
  name: string,
  level: string,
  address: string,
  region: string,
  nature: string,
  website: {
    official: string,
    admissions: string
  }
}

const college = ref<ICollege | null>(null);

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
.college-detail {
  .logo-wrap {
    .logo {}
  }

  .details {
    letter-spacing: 0.1em;

    .name {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .list {
      font-size: 0.85rem;
      line-height: 1.4rem;
    }
  }
}
</style>