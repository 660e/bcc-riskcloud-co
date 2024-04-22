<script lang="ts" setup>
import { ref } from 'vue';

import MapMarker from '../../components/map-marker.vue';
import PipeMarker from '../../components/pipe-marker.vue';
import PlanMarker from '../../components/plan-marker.vue';

const active = ref(0);
</script>

<template>
  <div class="card flex-1">
    <el-tabs v-model="active" type="border-card" class="workspace__risk__step__tabs--full">
      <el-tab-pane :name="0" label="地图标注" class="h-full">
        <map-marker />
      </el-tab-pane>
      <el-tab-pane :name="1" label="管线标注" class="h-full">
        <pipe-marker />
      </el-tab-pane>
      <el-tab-pane :name="2" label="平面图标注" class="h-full">
        <plan-marker />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
@import '../index.scss';
</style>
