<script lang="ts" setup>
import { ref } from 'vue';

import CurrentComponent from './views/current.vue';
import HistoryComponent from './views/history.vue';

const active = ref(0);
</script>

<template>
  <el-tabs v-model="active" type="border-card" class="h-full tabs-flex no-card">
    <current-component :name="0" label="标准规划" lazy />
    <history-component :name="1" label="安全制度" lazy />
    <history-component :name="2" label="操作规程" lazy />
    <history-component :name="3" label="法律法规" lazy />
    <history-component :name="4" label="事故库" lazy />
  </el-tabs>
</template>
