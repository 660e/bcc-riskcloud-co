<script lang="ts" name="create-dialog" setup>
import { reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { companyApi } from '@/api';
import { cloneDeep } from 'lodash';

const $emit = defineEmits(['confirm']);

const visible = ref(false);
const formsRef = ref<FormInstance>();
const forms = ref({
  id: undefined,
  type: '',
  name: '',
  specification: '',
  num: '',
  source: '',
  state: '',
  func: '',
  location: '',
  chief: '',
  phone: ''
});
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请填写', trigger: 'blur' }]
});

const open = async (row: any) => {
  visible.value = true;

  if (row.id) {
    forms.value = cloneDeep(row);
  }
};
const closed = () => {
  formsRef.value?.resetFields();
};
const confirm = () => {
  formsRef.value?.validate(async valid => {
    if (valid) {
      const { msg } = forms.value.id ? await companyApi.updateItem({}) : await companyApi.addItem({});
      $emit('confirm');
      ElMessage.success(msg);
      visible.value = false;
    }
  });
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" :title="forms.id ? '编辑' : '新增'" @closed="closed" width="400">
    <el-form :model="forms" :rules="rules" label-width="100" ref="formsRef" class="px-5 pt-5">
      <el-form-item label="物资类型" prop="type">
        <el-input v-model="forms.type" />
      </el-form-item>
      <el-form-item label="物资名称" prop="name">
        <el-input v-model="forms.name" />
      </el-form-item>
      <el-form-item label="规格型号" prop="specification">
        <el-input v-model="forms.specification" />
      </el-form-item>
      <el-form-item label="数量" prop="num">
        <el-input v-model="forms.num" />
      </el-form-item>
      <el-form-item label="来源" prop="source">
        <el-input v-model="forms.source" />
      </el-form-item>
      <el-form-item label="完好情况" prop="state">
        <el-input v-model="forms.state" />
      </el-form-item>
      <el-form-item label="主要功能" prop="func">
        <el-input v-model="forms.func" />
      </el-form-item>
      <el-form-item label="存放场所" prop="location">
        <el-input v-model="forms.location" />
      </el-form-item>
      <el-form-item label="负责人" prop="chief">
        <el-input v-model="forms.chief" />
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="forms.phone" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
