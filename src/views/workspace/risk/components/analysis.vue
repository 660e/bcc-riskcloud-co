<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getMajors, getAnalysis } from '@/api/modules/workspace';

const major = ref();
const checks = ref();
const majors = ref();
const analyses = ref();

onMounted(async () => {
  majors.value = (await getMajors()).data;
  analyses.value = (await getAnalysis()).data;
});
</script>

<template>
  <div class="c-subtitle-1">判断为重大风险源的条件</div>
  <el-form-item>
    <el-radio-group v-model="major" class="block">
      <el-radio v-for="e in majors" :key="e.value" :label="e.label" :value="e.value" class="flex" />
    </el-radio-group>
  </el-form-item>

  <div class="c-subtitle-1">可能性分析</div>
  <el-form-item>
    <div>
      <div class="c-form-item-label">发生可能性等级直接判定为很可能（5级）的情形</div>
      <el-checkbox-group v-model="checks" class="block">
        <el-checkbox v-for="e in majors" :key="e.value" :label="e.label" :value="e.value" class="flex" />
      </el-checkbox-group>
    </div>
  </el-form-item>
  <el-form-item v-for="analysis in analyses" :key="analysis.label">
    <div>
      <div class="c-form-item-label">{{ analysis.label }}</div>
      <el-radio-group v-model="analysis.value" class="block">
        <el-radio v-for="e in analysis.children" :key="e.value" :label="e.label" :value="e.value" class="flex" />
      </el-radio-group>
    </div>
  </el-form-item>

  <div class="c-subtitle-1">严重性分析</div>
</template>
