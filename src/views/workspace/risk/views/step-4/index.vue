<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getAbilityEvaluationTable } from '@/api/modules/workspace';

const table = ref();

onMounted(async () => {
  table.value = (await getAbilityEvaluationTable()).data;
});
</script>

<template>
  <div class="card flex-1">
    <pre>{{ table }}</pre>
  </div>
</template>
