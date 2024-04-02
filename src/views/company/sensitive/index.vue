<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { getDictDataType } from '@/api/modules/system';
import { System } from '@/api/interface';
import { SensitiveTargets } from '@bcc/ui';

const config = reactive<{
  company: any;
  options: {
    [key: string]: System.Dict[];
  };
}>({
  company: {},
  options: {}
});

onMounted(async () => {
  config.company = {
    lnglat: [116.22874, 40.07758],
    radius: 200,
    targets: [
      { id: 1, label: 'Target-001', lnglat: [116.22685, 40.07829] },
      { id: 2, label: 'Target-002', lnglat: [116.22733, 40.07677] }
    ]
  };
  config.options.range = (await getDictDataType('sensitive_target_range')).data;
});
</script>

<template>
  <sensitive-targets :config="config" class="card h-full" />
</template>
