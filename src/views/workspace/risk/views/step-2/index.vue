<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(0);
</script>

<template>
  <div class="card flex-1">
    <el-tabs v-model="active" type="border-card" class="workspace__risk__step-2__tabs">
      <el-tab-pane :name="0" label="地图标注" class="h-full">地图标注</el-tab-pane>
      <el-tab-pane :name="1" label="管线标注" class="h-full">管线标注</el-tab-pane>
      <el-tab-pane :name="2" label="平面图标注" class="h-full">平面图标注</el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.workspace__risk__step-2__tabs {
  border: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  :deep(.el-tabs__content) {
    flex: 1;
    padding: 0;
  }
}
</style>
