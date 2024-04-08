<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(0);
</script>

<template>
  <div class="h-full flex flex-col">
    <el-radio-group v-model="active" class="p-2.5">
      <el-radio-button :value="0" label="地图" />
      <el-radio-button :value="1" label="管线" />
      <el-radio-button :value="2" label="平面图" />
    </el-radio-group>
    <el-divider class="m-0" />
  </div>
</template>
