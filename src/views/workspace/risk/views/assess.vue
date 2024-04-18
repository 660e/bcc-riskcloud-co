<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';

import FormsComponent from '../components/forms.vue';
import AnalysisComponent from '../components/analysis.vue';

const formsComponentRef = ref();
const save = () => {
  formsComponentRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log(formsComponentRef.value.forms);
    }
  });
};

const $router = useRouter();
const back = () => {
  ElMessageBox.confirm('是否返回列表页？已填写的内容将被清空', '提示', { type: 'warning' })
    .then(() => $router.push({ name: '/workspace/risk' }))
    .catch(() => false);
};
</script>

<template>
  <div class="card h-full flex flex-col">
    <div class="flex-1 overflow-y-auto pt-5">
      <forms-component ref="formsComponentRef">
        <analysis-component />
      </forms-component>
    </div>

    <el-divider class="m-0" />
    <div class="flex justify-center py-2.5">
      <el-tooltip content="请完整填写“可能性分析”和“严重性分析”表单" placement="top">
        <el-button @click="save" type="primary">计算风险等级</el-button>
      </el-tooltip>
      <el-tooltip content="请先计算风险等级" placement="top">
        <el-button @click="save">保存</el-button>
      </el-tooltip>
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>
