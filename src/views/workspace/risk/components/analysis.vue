<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { System } from '@/api/interface';
import { getMajors } from '@/api/modules/workspace';

const major = ref();
const options = reactive<{ [key: string]: System.Dict[] }>({});

onMounted(async () => {
  options.majors = (await getMajors()).data;
});
</script>

<template>
  <div class="c-subtitle-1">判断为重大风险源的条件</div>
  <el-form-item>
    <el-radio-group v-model="major" class="block">
      <el-radio v-for="e in options.majors" :key="e.value" :value="e.value" class="flex">{{ e.label }}</el-radio>
    </el-radio-group>
  </el-form-item>
</template>
