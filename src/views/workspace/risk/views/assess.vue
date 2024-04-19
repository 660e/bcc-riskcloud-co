<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { RiskGradeMatrix } from '@bcc/components';
import AssessForms from '../components/assess-forms.vue';
import AssessAnalysis from '../components/assess-analysis.vue';

const grade = ref([-1, -1]);
const analysisResult = ref();
const analyse = (result: any) => {
  canCalc.value = false;
  grade.value = [-1, -1];
  analysisResult.value = result;

  if (result.major) {
    canCalc.value = true;
  }
};

const canCalc = ref(false);
const calc = () => {
  if (analysisResult.value.major) {
    grade.value = [4, 4];
  } else {
    grade.value = [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)];
  }
};

const formsComponentRef = ref();
const canSave = computed(() => grade.value[0] !== -1 && grade.value[1] !== -1);
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
      <assess-forms ref="formsComponentRef">
        <assess-analysis @analyse="analyse" />
      </assess-forms>
    </div>

    <el-divider class="m-0" />

    <div class="flex justify-center py-2.5">
      <el-tooltip v-if="!canSave" :disabled="canCalc" content="请完整填写“可能性分析”和“严重性分析”表单" placement="top">
        <el-button :disabled="!canCalc" @click="calc" type="primary">计算风险等级</el-button>
      </el-tooltip>
      <el-popover v-else width="600" placement="top">
        <risk-grade-matrix :grade="grade" />
        <template #reference>
          <el-button type="success">风险等级</el-button>
        </template>
      </el-popover>

      <el-tooltip :disabled="canSave" content="请先计算风险等级" placement="top">
        <el-button :disabled="!canSave" @click="save">保存</el-button>
      </el-tooltip>

      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>
