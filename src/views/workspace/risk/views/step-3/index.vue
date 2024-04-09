<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(0);
</script>

<template>
  <div class="card flex-1">
    <el-tabs v-model="active" type="border-card" class="workspace__risk__step__tabs--full">
      <el-tab-pane :name="0" label="应急队伍" class="h-full">应急队伍</el-tab-pane>
      <el-tab-pane :name="1" label="应急专家" class="h-full">应急专家</el-tab-pane>
      <el-tab-pane :name="2" label="应急装备" class="h-full">应急装备</el-tab-pane>
      <el-tab-pane :name="3" label="应急物资" class="h-full">应急物资</el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
@import '../index.scss';
</style>
