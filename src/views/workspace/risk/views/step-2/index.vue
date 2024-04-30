<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { TabPaneName } from 'element-plus';

import MapMarker from './components/map-marker.vue';
import PipeMarker from './components/pipe-marker.vue';
import PlanMarker from './components/plan-marker.vue';

const active = ref<TabPaneName>(0);
const mapMarkerRef = ref();
const planMarkerRef = ref();
const tabChange = (name: TabPaneName) => {
  switch (name) {
    case 0:
      mapMarkerRef.value.init();
      break;
    case 1:
      break;
    case 2:
      planMarkerRef.value.init();
      break;
  }
};
onMounted(() => tabChange(active.value));
</script>

<template>
  <el-tabs v-model="active" @tab-change="tabChange" type="border-card" class="flex-1 tabs-flex">
    <map-marker :name="0" label="地图标注" class="h-full flex" ref="mapMarkerRef" lazy />
    <pipe-marker :name="1" label="管线标注" class="h-full" lazy />
    <plan-marker :name="2" label="平面图标注" class="h-full flex" ref="planMarkerRef" lazy />
  </el-tabs>
</template>
