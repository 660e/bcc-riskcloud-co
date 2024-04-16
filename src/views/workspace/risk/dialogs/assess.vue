<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import basicInfo from '../components/basic-info.vue';

const visible = ref(true);
const open = async (row: any) => {
  visible.value = true;
  console.log(row);
};

const close = () => {
  formsRef.value?.resetFields();
};

const formsRef = ref<FormInstance>();
const forms = ref({
  riskName: '',
  count: 1,
  location: '',
  riskType: []
});
const rules: FormRules = {
  riskName: [{ required: true, message: '请填写', trigger: 'blur' }],
  count: [{ required: true, message: '请填写', trigger: 'blur' }],
  location: [{ required: true, message: '请填写', trigger: 'blur' }],
  riskType: [{ required: true, message: '请选择', trigger: 'change' }]
};
const confirm = () => {
  formsRef.value?.validate(valid => {
    if (valid) {
      console.log(forms.value);
    }
  });
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" @close="close" title="评估" width="60vw">
    <el-form :model="forms" :rules="rules" label-width="120" ref="formsRef" class="p-5">
      <basic-info :forms="forms" />
    </el-form>

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
