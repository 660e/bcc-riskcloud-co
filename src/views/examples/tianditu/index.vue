<template>
  <div class="card h-full flex flex-col">
    <el-radio-group v-model="active" class="p-2.5">
      <el-radio-button label="地图标注" value="0" />
    </el-radio-group>
    <map-annotation class="flex-1" />
  </div>
</template>

<script lang="ts" name="tianditu" setup>
import { ref } from 'vue';

import { MapAnnotation } from '@bcc/ui';

const active = ref('0');
</script>
