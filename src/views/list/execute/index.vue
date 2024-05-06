<script lang="ts" setup>
import { ref } from 'vue';

import StandbyComponent from './views/standby.vue';
import ProgressComponent from './views/progress.vue';
import AccomplishComponent from './views/accomplish.vue';

const active = ref(0);
</script>

<template>
  <el-tabs v-model="active" type="border-card" class="h-full tabs-flex no-card">
    <standby-component :name="0" label="待执行" lazy />
    <progress-component :name="1" label="执行中" lazy />
    <accomplish-component :name="2" label="已执行" lazy />
  </el-tabs>
</template>
