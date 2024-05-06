<script lang="ts" setup>
import { ref } from 'vue';

import CurrentComponent from './views/current.vue';
import HistoryComponent from './views/history.vue';

const active = ref(0);
</script>

<template>
  <el-tabs v-model="active" type="border-card" class="h-full tabs-flex no-card">
    <current-component :name="0" label="当前预警" lazy />
    <history-component :name="1" label="历史预警" lazy />
  </el-tabs>
</template>
