<script lang="ts" setup>
import { ref } from 'vue';

import PlanMarker from './views/plan-marker.vue';
import MapMarker from './views/map-marker.vue';
import PipeMarker from './views/pipe-marker.vue';

const active = ref('plan');
</script>

<template>
  <el-tabs v-model="active" type="border-card" class="flex-1 tabs-flex">
    <el-tab-pane label="平面图标注" name="plan" class="h-full flex">
      <plan-marker v-if="active === 'plan'" />
    </el-tab-pane>
    <el-tab-pane label="地图标注" name="map" class="h-full flex">
      <map-marker v-if="active === 'map'" />
    </el-tab-pane>
    <el-tab-pane label="管线标注" name="pipe" class="h-full flex">
      <pipe-marker v-if="active === 'pipe'" />
    </el-tab-pane>
  </el-tabs>
</template>
