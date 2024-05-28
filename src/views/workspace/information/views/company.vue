<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { System } from '@/api/interface';
import { systemApi, workspaceApi } from '@/api';
import { RiskStatistics } from '@bcc/ui';

const data = ref();

onMounted(async () => {
  const dict = (await systemApi.dict('eme_ability')).data;
  data.value = (await workspaceApi.statistics()).data;
  data.value.ability.value = dict.find((d: System.Dict) => d.dictValue === data.value.ability.value)?.dictLabel || '-';
  data.value.diagnosis.value = dict.find((d: System.Dict) => d.dictValue === data.value.diagnosis.value)?.dictLabel || '-';
});
</script>

<template>
  <div class="flex-auto">
    <risk-statistics :data="data" class="min-h-full p-2.5" />
  </div>
</template>
