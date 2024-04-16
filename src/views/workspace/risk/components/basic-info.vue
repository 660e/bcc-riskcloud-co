<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue';
import { System } from '@/api/interface';
import { getDictDataType } from '@/api/modules/system';

const $props = defineProps<{ forms: any }>();
const propsForms = computed(() => $props.forms);
const options = reactive<{ [key: string]: System.Dict[] }>({});

onMounted(async () => {
  options.riskType = (await getDictDataType('risk_damage')).data;
});
</script>

<template>
  <div class="grid grid-cols-2">
    <el-form-item label="风险源名称" prop="riskName">
      <el-input v-model="propsForms.riskName" />
    </el-form-item>
    <el-form-item label="风险源数量" prop="count">
      <el-input-number v-model="propsForms.count" :min="1" />
    </el-form-item>
    <el-form-item label="场所位置" prop="location">
      <el-input v-model="propsForms.location" />
    </el-form-item>
    <el-form-item label="风险类型" prop="riskType">
      <el-select v-model="propsForms.riskType" :max-collapse-tags="3" collapse-tags collapse-tags-tooltip multiple>
        <el-option v-for="e in options.riskType" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
      </el-select>
    </el-form-item>
  </div>
</template>
