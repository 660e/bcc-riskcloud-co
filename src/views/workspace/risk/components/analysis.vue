<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getMajors, getPossibility, getSeverity } from '@/api/modules/workspace';

const major = ref();
const checks = ref();

const majors = ref();
const possibilities = ref();
const severities = ref();

onMounted(async () => {
  majors.value = (await getMajors()).data;
  possibilities.value = (await getPossibility()).data;
  severities.value = (await getSeverity()).data;
});
</script>

<template>
  <div class="c-subtitle-1">判断为重大风险源的条件</div>
  <el-form-item>
    <el-radio-group v-model="major" class="block">
      <el-radio v-for="e in majors" :key="e.value" :label="e.label" :value="e.value" class="_radio-checkbox" />
    </el-radio-group>
  </el-form-item>

  <div class="c-subtitle-1">可能性分析</div>
  <el-form-item>
    <div>
      <div class="c-form-item-label">发生可能性等级直接判定为很可能（5级）的情形</div>
      <el-checkbox-group v-model="checks" class="block">
        <el-checkbox v-for="e in majors" :key="e.value" :label="e.label" :value="e.value" class="_radio-checkbox" />
      </el-checkbox-group>
    </div>
  </el-form-item>
  <el-form-item v-for="possibility in possibilities" :key="possibility.label">
    <div>
      <div class="c-form-item-label">{{ possibility.label }}</div>
      <el-radio-group v-model="possibility.value" class="block">
        <el-radio v-for="e in possibility.children" :key="e.value" :label="e.label" :value="e.value" class="_radio-checkbox" />
      </el-radio-group>
    </div>
  </el-form-item>

  <div class="c-subtitle-1">严重性分析</div>
  <el-form-item v-for="severity in severities" :key="severity.label">
    <div>
      <div class="c-form-item-label">{{ severity.label }}</div>
      <el-radio-group v-model="severity.value" class="block">
        <el-radio v-for="e in severity.children" :key="e.value" :label="e.label" :value="e.value" class="_radio-checkbox" />
      </el-radio-group>
    </div>
  </el-form-item>
</template>

<style lang="scss" scoped>
._radio-checkbox {
  height: auto;
  display: flex;
  :deep(.el-radio__input),
  :deep(.el-checkbox__input) {
    padding-top: 8px;
    align-self: flex-start;
  }
  :deep(.el-radio__label),
  :deep(.el-checkbox__label) {
    text-wrap: wrap;
    line-height: 32px;
  }
}
</style>
