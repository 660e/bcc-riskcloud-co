<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue';
import { useElementSize } from '@vueuse/core';
import { companyApi, dangerApi, libraryApi, listApi, riskApi, systemApi } from '@/api';
import { COLORS } from '@/utils';
import { CircleCheck, Clock, DocumentDelete, Histogram } from '@element-plus/icons-vue';
import QRCode from 'qrcode';

const icons: any = {
  dangerSummary: [CircleCheck, Clock, DocumentDelete],
  riskSummary: [Histogram, ...new Array(4).fill(new URL('../../assets/icons/home/warning-1.png', import.meta.url).href)]
};

const dangerSummary = ref();
const riskSummary = ref();
const tasksData = ref();
const helpData = ref();
const tableWrapperRef = ref();
const tableWrapperHeight = ref(0);
const backgroundImage = (index: number) => {
  const url = new URL(`../../assets/images/home-${index + 1}.png`, import.meta.url).href;
  return { backgroundImage: `url(${url})` };
};

onMounted(async () => {
  QRCode.toCanvas(document.getElementById('qrcode'), (await companyApi.qrcode('1')).data, { margin: 0, width: 120 });

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

  await nextTick();

  const { height } = useElementSize(tableWrapperRef);
  tableWrapperHeight.value = height.value;
  tasksData.value = (await listApi.tasks()).data.list;
  helpData.value = (await libraryApi.help()).data.list;
});
</script>

<template>
  <div class="h-full flex flex-col space-y-2.5">
    <div class="card p-5 flex">
      <div class="space-y-5 flex-1">
        <div class="c-subtitle-1">企业总码</div>
        <canvas id="qrcode"></canvas>
      </div>
      <div class="space-y-5">
        <div class="c-subtitle-1">隐患信息</div>
        <div class="flex space-x-20">
          <div
            v-for="(item, index) in dangerSummary"
            :key="index"
            :style="backgroundImage(index)"
            class="h-[120px] w-[340px] flex-1 text-white rounded flex items-center px-5 space-x-5 bg-cover"
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
          <el-icon :style="{ backgroundColor: COLORS.risk_level[index] }" class="text-5xl rounded p-2 text-white">
            <component v-if="index === 0" :is="icons.riskSummary[index]" />
            <img v-else :src="icons.riskSummary[index]" />
          </el-icon>
          <div class="space-y-1">
            <div>{{ item.label }}</div>
            <div class="space-x-5">
              <b :style="{ color: COLORS.risk_level[index] }">{{ item.value }}</b>
              <span>较上月{{ item.increase < 0 ? item.increase : `+${item.increase}` }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 flex space-x-2.5">
      <div class="card p-5 space-y-2.5 w-2/3 flex flex-col">
        <div class="c-subtitle-1">
          <span>待办任务</span>
          <div class="flex-1"></div>
          <el-button type="primary" link>更多>></el-button>
        </div>
        <div class="flex-1" ref="tableWrapperRef">
          <el-table :data="tasksData" :style="{ height: `${tableWrapperHeight}px` }" :show-header="false">
            <el-table-column label="任务名称" prop="name" />
            <el-table-column label="完成度" width="200">
              <template #default="scope">
                <el-progress
                  :percentage="(scope.row.count / scope.row.total) * 100"
                  :status="scope.row.count === scope.row.total ? 'success' : ''"
                >
                  {{ scope.row.count }}/{{ scope.row.total }}
                </el-progress>
              </template>
            </el-table-column>
            <el-table-column align="right" width="150">
              <el-button type="primary" size="small">执行</el-button>
              <el-button type="warning" size="small">详情</el-button>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="card p-5 space-y-2.5 w-1/3 flex flex-col">
        <div class="c-subtitle-1">
          <span>系统帮助</span>
          <div class="flex-1"></div>
          <el-button type="primary" link>更多>></el-button>
        </div>
        <div class="flex-1">
          <el-table :data="helpData" :style="{ height: `${tableWrapperHeight}px` }" :show-header="false">
            <el-table-column label="文档名称" prop="name" />
            <el-table-column align="right" width="100">
              <el-button type="primary" size="small">下载</el-button>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
