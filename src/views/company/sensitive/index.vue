<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { SensitiveTargets } from '@bcc/ui';

const config = reactive({
  company: {}
});

onMounted(() => {
  config.company = {
    lnglat: [116.22874, 40.07758],
    radius: 200,
    targets: [
      { id: 1, label: 'Target-001', lnglat: [116.22685, 40.07829] },
      { id: 2, label: 'Target-002', lnglat: [116.22733, 40.07677] }
    ]
  };
});
</script>

<template>
  <sensitive-targets :config="config" class="card h-full" />
</template>
