<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { riskStatistics } from '@/api/modules/home';

const statistics = reactive<any>({
  risk: []
});
onMounted(async () => {
  statistics.risk = (await riskStatistics()).data;
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

const active = ref(0);
</script>

<template>
  <div class="h-full flex flex-col space-y-2.5">
    <div class="card p-2.5">
      <div class="c-subtitle-1">安全风险评估工作</div>
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

    <el-tabs v-model="active" type="border-card" class="card">
      <el-tab-pane :name="0" label="风险源列表" class="h-full">引用“信息汇总-风险源列表”页面</el-tab-pane>
      <el-tab-pane :name="1" label="应急资源列表" class="h-full">引用“信息汇总-应急资源列表”页面</el-tab-pane>
      <el-tab-pane :name="2" label="评估报告管理" class="h-full">引用“信息汇总-评估报告管理”页面</el-tab-pane>
    </el-tabs>
  </div>
</template>
