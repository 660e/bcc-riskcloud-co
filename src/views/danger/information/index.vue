<script lang="ts" setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';
import { getDangerLevel } from '@/api/modules/danger';
import { dangerLevelOption } from './option';

let levelChart: any;

onMounted(async () => {
  levelChart = echarts.init(document.getElementById('level')!);
  levelChart.setOption(dangerLevelOption((await getDangerLevel()).data));
});
</script>

<template>
  <div class="h-full grid grid-cols-3 grid-rows-2 gap-2.5">
    <div class="card flex flex-col">
      <div class="c-subtitle-1 p-2.5">隐患等级</div>
      <div class="flex-1" id="level"></div>
    </div>
    <div class="card col-span-2">2</div>
    <div class="card">3</div>
    <div class="card">4</div>
    <div class="card">5</div>
  </div>
</template>
