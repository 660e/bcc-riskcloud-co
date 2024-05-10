<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { companyApi, dangerApi, riskApi, systemApi } from '@/api';
import { CircleCheck, Clock, DocumentDelete, Histogram } from '@element-plus/icons-vue';
import QRCode from 'qrcode';

const icons = {
  dangerSummary: [CircleCheck, Clock, DocumentDelete],
  riskSummary: [Histogram, Histogram, Histogram, Histogram, Histogram]
};

const dangerSummary = ref();
const riskSummary = ref();

onMounted(async () => {
  QRCode.toCanvas(document.getElementById('qrcode'), (await companyApi.qrcode('1')).data, { margin: 0 });

  const reformStatusDict = (await systemApi.dict('reform_status')).data;
  dangerSummary.value = (await dangerApi.summary()).data.map((item: any) => {
    item.label = reformStatusDict.find(dict => dict.dictValue === item.code)?.dictLabel || '-';
    return item;
  });

  const riskLevelDict = (await systemApi.dict('risk_level')).data;
  riskSummary.value = (await riskApi.summary()).data.map((item: any) => {
    item.label = riskLevelDict.find(dict => dict.dictValue === item.code)?.dictLabel || '-';
    return item;
  });
  riskSummary.value.unshift({
    label: '全部',
    value: riskSummary.value.reduce((a: number, c: any) => a + c.value, 0),
    increase: riskSummary.value.reduce((a: number, c: any) => a + c.increase, 0)
  });
});
</script>

<template>
  <div class="h-full flex flex-col space-y-2.5">
    <div class="card p-5 flex">
      <div class="space-y-5 w-1/4">
        <div class="c-subtitle-1">企业总码</div>
        <canvas id="qrcode"></canvas>
      </div>
      <div class="space-y-5 w-3/4">
        <div class="c-subtitle-1">隐患信息</div>
        <div class="flex space-x-5">
          <div
            v-for="(item, index) in dangerSummary"
            :key="index"
            class="h-[100px] flex-1 text-white bg-gray-400 rounded flex items-center px-5 space-x-5"
          >
            <el-icon class="text-5xl"><component :is="icons.dangerSummary[index]" /></el-icon>
            <div class="space-y-2.5">
              <div>{{ item.label }}</div>
              <div class="space-x-5">
                <b class="text-xl">{{ item.value }}条</b>
                <span>较上月{{ item.increase < 0 ? item.increase : `+${item.increase}` }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card p-5 space-y-5">
      <div class="c-subtitle-1">风险信息</div>
      <div class="flex">
        <div v-for="(item, index) in riskSummary" :key="index" class="flex-1 flex items-center space-x-5">
          <el-icon class="text-5xl bg-gray-400 rounded p-2 text-white"><component :is="icons.riskSummary[index]" /></el-icon>
          <div class="space-y-1">
            <div>{{ item.label }}</div>
            <div class="space-x-5">
              <b>{{ item.value }}</b>
              <span>较上月{{ item.increase < 0 ? item.increase : `+${item.increase}` }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 flex space-x-2.5">
      <div class="card p-5 w-2/3">
        <div class="c-subtitle-1">待办任务</div>
      </div>
      <div class="card p-5 w-1/3"></div>
    </div>
  </div>
</template>
