<script lang="ts" setup>
import { computed } from 'vue';

const $props = defineProps<{ forms: any }>();
const propsForms = computed(() => $props.forms);
</script>

<template>
  <div class="grid grid-cols-2">
    <el-form-item label="风险源名称" prop="riskName">
      <el-input v-model="propsForms.riskName" />
    </el-form-item>
    <el-form-item label="风险源数量" prop="count">
      <el-input-number v-model="propsForms.count" :min="1" />
    </el-form-item>
  </div>
</template>
