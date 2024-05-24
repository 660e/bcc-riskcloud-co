<script lang="ts" setup>
import { ref } from 'vue';

import PlanList from './views/plan-list.vue';
import MapMarker from './views/map-marker.vue';
import PipeMarker from './views/pipe-marker.vue';

const active = ref('plan-list');
</script>

<template>
  <el-tabs v-model="active" type="border-card" class="flex-1 h-0 tabs-flex">
    <el-tab-pane label="平面图标注" name="plan-list" class="h-full flex">
      <plan-list v-if="active === 'plan-list'" />
    </el-tab-pane>
    <el-tab-pane label="地图标注" name="map-marker" class="h-full flex">
      <map-marker v-if="active === 'map-marker'" />
    </el-tab-pane>
    <el-tab-pane label="管线标注" name="pipe-marker" class="h-full flex">
      <pipe-marker v-if="active === 'pipe-marker'" />
    </el-tab-pane>
  </el-tabs>
</template>
