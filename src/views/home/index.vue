<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { riskStatistics } from '@/api/modules/home';
import { RiskStatisticsType } from '@/api/interface/home';

const statistics = reactive<{ risk: RiskStatisticsType[] }>({
  risk: []
});

onMounted(async () => {
  const { data } = await riskStatistics(1);

  statistics.risk = data;
});
</script>

<template>
  <div class="card h-full flex justify-center items-center">
    <pre>{{ statistics.risk }}</pre>
  </div>
</template>
