<script lang="ts" setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';
import { getDangerLevel, getDangerMend, getDangerSource } from '@/api/modules/danger';
import { dangerLevelOption, dangerMendOption, dangerSourceOption } from './option';

let levelChart: any;

let mendChart: any;
let sourceChart: any;

onMounted(async () => {
  levelChart = echarts.init(document.getElementById('level')!);
  levelChart.setOption(dangerLevelOption((await getDangerLevel()).data));

  mendChart = echarts.init(document.getElementById('mend')!);
  mendChart.setOption(dangerMendOption((await getDangerMend()).data));

  sourceChart = echarts.init(document.getElementById('source')!);
  sourceChart.setOption(dangerSourceOption((await getDangerSource()).data));
});
</script>

<template>
  <div class="h-full grid grid-cols-3 grid-rows-2 gap-2.5">
    <div class="card flex flex-col">
      <div class="c-subtitle-1 p-2.5">隐患等级</div>
      <div class="flex-1" id="level"></div>
    </div>
    <div class="card col-span-2">2</div>
    <div class="card flex flex-col">
      <div class="c-subtitle-1 p-2.5">隐患整改情况</div>
      <div class="flex-1" id="mend"></div>
    </div>
    <div class="card flex flex-col">
      <div class="c-subtitle-1 p-2.5">隐患来源</div>
      <div class="flex-1" id="source"></div>
    </div>
    <div class="card">5</div>
  </div>
</template>
