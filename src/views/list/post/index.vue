<script lang="ts" setup>
import { ref } from 'vue';

import DutyComponent from './views/duty.vue';
import TaskComponent from './views/task.vue';
import OperationComponent from './views/operation.vue';

const active = ref(0);
</script>

<template>
  <el-tabs v-model="active" type="border-card" class="h-full tabs-flex no-card">
    <duty-component :name="0" label="责任清单" lazy />
    <task-component :name="1" label="任务清单" lazy />
    <operation-component :name="2" label="操作清单" lazy />
  </el-tabs>
</template>
