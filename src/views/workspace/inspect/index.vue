<script lang="ts" setup>
import { ref } from 'vue';

import OnlineComponent from './views/online.vue';
import OfflineComponent from './views/offline.vue';

const active = ref('online');
</script>

<template>
  <el-tabs v-model="active" type="border-card" class="h-full tabs-flex no-card">
    <el-tab-pane name="online" label="线上核查" class="h-full flex flex-col pt-2.5">
      <online-component v-if="active === 'online'" />
    </el-tab-pane>
    <el-tab-pane name="offline" label="线下核查" class="h-full flex flex-col pt-2.5">
      <offline-component v-if="active === 'offline'" />
    </el-tab-pane>
  </el-tabs>
</template>
