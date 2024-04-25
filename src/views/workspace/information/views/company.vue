<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getWorkspaceStatistics } from '@/api/modules/workspace';
import { RiskStatistics } from '@bcc/ui';

const data = ref();

onMounted(async () => {
  data.value = (await getWorkspaceStatistics()).data;
});
</script>

<template>
  <el-tab-pane class="h-full">
    <risk-statistics :data="data" class="h-full" />
  </el-tab-pane>
</template>
