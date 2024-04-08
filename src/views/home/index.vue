<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { riskStatistics } from '@/api/modules/home';
import { RiskStatisticsType } from '@/api/interface/home';

const statistics = reactive<{ risk: RiskStatisticsType[] }>({
  risk: []
});

const riskStatisticsClass = (level: number) => {
  switch (level) {
    case 1:
      return ['text-red-700', 'bg-red-50'];
    case 2:
      return ['text-orange-700', 'bg-orange-50'];
    case 3:
      return ['text-yellow-700', 'bg-yellow-50'];
    case 4:
      return ['text-sky-700', 'bg-sky-50'];
  }
};

onMounted(async () => {
  const { data } = await riskStatistics(1);
  statistics.risk = data;
});
</script>

<template>
  <div class="h-full flex flex-col space-y-2.5">
    <div class="card p-2.5">
      <div class="c-subtitle-1">风险源信息</div>
      <div class="flex justify-center space-x-10">
        <div
          v-for="r in statistics.risk"
          :key="r.level"
          :class="riskStatisticsClass(r.level)"
          class="h-28 w-28 space-y-2 flex flex-col justify-center items-center"
        >
          <div>较上次{{ r.increase < 0 ? r.increase : `+${r.increase}` }}</div>
          <div class="text-2xl">{{ r.value }}</div>
        </div>
      </div>
    </div>
    <div class="card p-2.5 flex-1">
      <div class="c-subtitle-1">应急信息</div>
    </div>
    <div class="card p-2.5 flex-1">
      <div class="c-subtitle-1">工作流程</div>
    </div>
  </div>
</template>
