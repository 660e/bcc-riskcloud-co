<script lang="ts" setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';
import { getDangerLevel, getDangerType, getDangerMend, getDangerSource, getDangerVary } from '@/api/modules/danger';
import { dangerLevelOption, dangerTypeOption, dangerMendOption, dangerSourceOption, dangerVaryOption } from './option';

onMounted(async () => {
  const levelChart = echarts.init(document.getElementById('level')!);
  levelChart.setOption(dangerLevelOption((await getDangerLevel()).data));

  const typeChart = echarts.init(document.getElementById('type')!);
  typeChart.setOption(dangerTypeOption((await getDangerType()).data));

  const mendChart = echarts.init(document.getElementById('mend')!);
  mendChart.setOption(dangerMendOption((await getDangerMend()).data));

  const sourceChart = echarts.init(document.getElementById('source')!);
  sourceChart.setOption(dangerSourceOption((await getDangerSource()).data));

  const varyChart = echarts.init(document.getElementById('vary')!);
  varyChart.setOption(dangerVaryOption((await getDangerVary()).data));
});
</script>

<template>
  <div class="h-full grid grid-cols-3 grid-rows-2 gap-2.5">
    <div class="card p-2.5 flex flex-col">
      <div class="c-subtitle-1 pb-2.5">隐患等级</div>
      <div class="flex-1" id="level"></div>
    </div>
    <div class="card p-2.5 col-span-2 flex flex-col">
      <div class="c-subtitle-1 pb-2.5">隐患类型</div>
      <div class="flex-1" id="type"></div>
    </div>
    <div class="card p-2.5 flex flex-col">
      <div class="c-subtitle-1 pb-2.5">隐患整改情况</div>
      <div class="flex-1" id="mend"></div>
    </div>
    <div class="card p-2.5 flex flex-col">
      <div class="c-subtitle-1 pb-2.5">隐患来源</div>
      <div class="flex-1" id="source"></div>
    </div>
    <div class="card p-2.5 flex flex-col">
      <div class="c-subtitle-1 pb-2.5">隐患变化</div>
      <div class="flex-1" id="vary"></div>
    </div>
  </div>
</template>
