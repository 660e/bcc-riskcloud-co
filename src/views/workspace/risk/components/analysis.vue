<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { getMajors, getPossibility, getSeverity } from '@/api/modules/workspace';

defineEmits(['analyse']);
const majors = ref();
const analyses = reactive<{
  major: string;
  checks: string[];
  possibilities: any[];
  severities: any[];
}>({
  major: '',
  checks: [],
  possibilities: [],
  severities: []
});

onMounted(async () => {
  majors.value = (await getMajors()).data;
  analyses.possibilities = (await getPossibility()).data;
  analyses.severities = (await getSeverity()).data;
});
</script>

<template>
  <div class="c-subtitle-1">判断为重大风险源的条件</div>
  <el-form-item>
    <el-radio-group v-model="analyses.major" @change="$emit('analyse', analyses)" class="block">
      <el-radio v-for="e in majors" :key="e.value" :label="e.label" :value="e.value" class="_rc" />
    </el-radio-group>
  </el-form-item>

  <template v-if="!analyses.major">
    <div class="c-subtitle-1">可能性分析</div>
    <el-form-item>
      <div>
        <div class="c-form-item-label">发生可能性等级直接判定为很可能（5级）的情形</div>
        <el-checkbox-group v-model="analyses.checks" @change="$emit('analyse', analyses)" class="block">
          <el-checkbox v-for="e in majors" :key="e.value" :label="e.label" :value="e.value" class="_rc" />
        </el-checkbox-group>
      </div>
    </el-form-item>

    <template v-if="!analyses.checks.length">
      <el-form-item v-for="possibility in analyses.possibilities" :key="possibility.label">
        <div>
          <div class="c-form-item-label">{{ possibility.label }}</div>
          <el-radio-group v-model="possibility.value" @change="$emit('analyse', analyses)" class="block">
            <el-radio v-for="e in possibility.children" :key="e.value" :label="e.label" :value="e.value" class="_rc" />
          </el-radio-group>
        </div>
      </el-form-item>
    </template>

    <div class="c-subtitle-1">严重性分析</div>
    <el-form-item v-for="severity in analyses.severities" :key="severity.label">
      <div>
        <div class="c-form-item-label">{{ severity.label }}</div>
        <el-radio-group v-model="severity.value" @change="$emit('analyse', analyses)" class="block">
          <el-radio v-for="e in severity.children" :key="e.value" :label="e.label" :value="e.value" class="_rc" />
        </el-radio-group>
      </div>
    </el-form-item>
  </template>
</template>

<style lang="scss" scoped>
._rc {
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
