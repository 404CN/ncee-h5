<template>
  <div class="statement w-full">
    <div class="container">
      <ul class="statement-list">
        <li class="statement-item mb-4" v-for="(item, index) in statementList" :key="index">
          <h3><strong>{{ `${index + 1}. ${item.title}` }}</strong></h3>
          <p class="desc" v-for="(text, idx) in item.description" :key="idx">{{ text }}</p>
        </li>
      </ul>
      <USeparator class="my-6" />
      <p>祝大家金榜题名！</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const statementList = [
  {
    title: "关于本站",
    description: [
      "本网站（www.ncee.cc）是一个开源的高考信息数据库，所有内容均可公开使用。"
    ],
  },
  {
    title: "免责条款",
    description: [
      "本网站提供的数据和信息仅供参考，不构成任何专业建议（如志愿报考等）。用户需自行判断内容准确性，并承担因使用信息而产生的风险。",
      "本网站可能包含外部链接，仅供参考之用，不对链接内容的准确性、合法性负责。",
      "本网站对因技术故障、不可抗力或第三方行为导致的数据丢失、服务中断等不承担责任。",
    ],
  },
  {
    title: "隐私保护",
    description: [
      "本网站收集的数据仅限于用于优化用户体验，不会向第三方披露。",
    ],
  },
  {
    title: "声明修改权",
    description: [
      "本网站保留随时更新本声明的权利，修改后的内容将通过网站公示生效。",
    ],
  },
];
</script>

<style lang="scss" scoped>
.statement {
  .statement-list {
    list-style: none;

    .statement-item {
      .desc {
        line-height: 2rem;
      }
    }
  }
}
</style>