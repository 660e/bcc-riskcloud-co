<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { workspaceApi } from '@/api';
import image from '../bg.jpg';

const isList = ref(true);
const planList = ref();

onMounted(async () => {
  planList.value = (await workspaceApi.plan()).data;
});
</script>

<template>
  <div v-if="isList" class="flex-auto flex flex-wrap space-x-5">
    <div v-for="plan in planList" :key="plan.id">
      <el-image :src="image" fit="cover" class="w-80 h-40" />
      <div>123</div>
    </div>
  </div>

  <div v-else>marker</div>
</template>
