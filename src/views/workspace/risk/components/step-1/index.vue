<script lang="ts" setup>
import { ref } from 'vue';

const industries = ref([
  { label: '城镇公共供水运行', total: 2, undone: 1 },
  { label: '城镇排水和污水处理运行', total: 5, undone: 0 },
  { label: '水务工程建设', total: 3, undone: 0 },
  { label: '水利工程运行', total: 4, undone: 2 }
]);
</script>

<template>
  <div class="h-full p-5">
    <div class="space-x-2.5">
      <el-badge
        v-for="industry in industries"
        :key="industry.label"
        :value="industry.undone"
        :show-zero="false"
        :is-dot="!!industry.undone"
      >
        <el-button>{{ industry.label }}（{{ industry.total }}）</el-button>
      </el-badge>
    </div>
  </div>
</template>
