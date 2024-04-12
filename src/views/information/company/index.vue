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
  <div class="card h-full flex">
    <risk-statistics :data="data" class="flex-1" />
  </div>
</template>
