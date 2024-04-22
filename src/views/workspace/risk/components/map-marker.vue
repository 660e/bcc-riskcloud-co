<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getRiskMarkers } from '@/api/modules/workspace';
import { MapClass } from '@bcc/utils';

// 地图工具类
const MapUtils: MapClass = new MapClass();
onMounted(() => {
  MapUtils.Init('map', [116.22874, 40.07758]);
});

// 风险源列表
const riskSources = ref();

const init = async () => {
  riskSources.value = await getRiskMarkers();
};

defineExpose({ init });
</script>

<template>
  <el-tab-pane v-bind="$attrs">
    <div class="w-72 flex">
      <div class="flex-1 flex flex-col">
        <div class="flex-1 overflow-y-auto">
          <pre>{{ riskSources }}</pre>
        </div>
        <div class="p-2.5 flex">
          <el-button class="flex-1">重置</el-button>
          <el-button class="flex-1" type="primary">保存</el-button>
        </div>
      </div>
      <el-divider direction="vertical" class="m-0 h-full" />
    </div>
    <div class="flex-1" id="map"></div>
  </el-tab-pane>
</template>
