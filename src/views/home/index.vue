<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { companyApi, dangerApi, systemApi } from '@/api';
import { CircleCheck, Clock, DocumentDelete } from '@element-plus/icons-vue';
import QRCode from 'qrcode';
// import { onMounted, reactive } from 'vue';

// import { riskStatistics } from '@/api/modules/home';
// import { LabelTooltip } from '@bcc/components';

// const statistics = reactive<any>({
//   risk: []
// });
// onMounted(async () => {
//   statistics.risk = (await riskStatistics()).data;
// });

const icons = {
  dangerSummary: [CircleCheck, Clock, DocumentDelete]
};

const dangerSummary = ref();

onMounted(async () => {
  QRCode.toCanvas(document.getElementById('qrcode'), (await companyApi.qrcode('1')).data, { margin: 0 });

  const reformStatusDict = (await systemApi.dict('reform_status')).data;
  dangerSummary.value = (await dangerApi.summary()).data.map((item: any) => {
    item.label = reformStatusDict.find(dict => dict.dictValue === item.code)?.dictLabel || '-';
    return item;
  });
});

// const riskStatisticsClass = (level: number) => {
//   switch (level) {
//     case 1:
//       return ['text-red-700', 'bg-red-50'];
//     case 2:
//       return ['text-orange-700', 'bg-orange-50'];
//     case 3:
//       return ['text-yellow-700', 'bg-yellow-50'];
//     case 4:
//       return ['text-sky-700', 'bg-sky-50'];
//   }
// };
</script>

<template>
  <div class="h-full flex flex-col space-y-2.5">
    <div class="card p-5 flex">
      <div class="space-y-2.5 w-1/4">
        <div class="c-subtitle-1">企业总码</div>
        <canvas id="qrcode"></canvas>
      </div>
      <div class="space-y-2.5 w-3/4">
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
  </div>
  <!-- <div class="h-full flex flex-col space-y-2.5">
    <div class="card p-2.5 flex">
      <div>
        <div class="c-subtitle-1">企业总码</div>
      </div>
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
      <div class="c-subtitle-1">
        <span>工作流程</span>
        <label-tooltip content="请涉及危险化学品的企业进行单位诊断分级" />
      </div>
    </div>
  </div> -->
</template>
