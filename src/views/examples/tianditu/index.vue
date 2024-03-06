<template>
  <div class="card h-full flex flex-col">
    <el-radio-group v-model="active" class="p-2.5">
      <el-radio-button :value="0" label="地图标注" />
      <el-radio-button :value="1" label="海量点位（5000+）" />
    </el-radio-group>
    <map-annotation v-if="active === 0" class="flex-1" />
    <cloud-marker-collection v-if="active === 1" class="flex-1" />
  </div>
</template>

<script lang="ts" name="tianditu" setup>
import { ref } from 'vue';

import { MapAnnotation } from '@bcc/ui';
import CloudMarkerCollection from './components/cloud-marker-collection.vue';

const active = ref(0);
</script>
