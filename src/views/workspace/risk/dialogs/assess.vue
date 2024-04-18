<script lang="ts" setup>
import { ref } from 'vue';

import FormsComponent from '../components/forms.vue';

const visible = ref(true);
const open = async (row: any) => {
  visible.value = true;
  console.log(row);
};

const formsComponentRef = ref();
const confirm = () => {
  console.log(formsComponentRef.value);
  // formsRef.value?.validate(valid => {
  //   if (valid) {
  //     console.log(forms.value);
  //   }
  // });
};
const close = () => {
  console.log('close');
  // formsRef.value?.resetFields();
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" @close="close" title="评估" width="60vw">
    <forms-component ref="formsComponentRef" />

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
