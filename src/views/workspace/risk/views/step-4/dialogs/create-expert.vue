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
  name: '',
  gender: '',
  age: '',
  profession: '',
  type: '',
  unit: '',
  address: '',
  mobile: '',
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
      <el-form-item label="姓名" prop="name">
        <el-input v-model="forms.name" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-input v-model="forms.gender" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="forms.age" />
      </el-form-item>
      <el-form-item label="专业" prop="profession">
        <el-input v-model="forms.profession" />
      </el-form-item>
      <el-form-item label="专家类别" prop="type">
        <el-input v-model="forms.type" />
      </el-form-item>
      <el-form-item label="工作单位" prop="unit">
        <el-input v-model="forms.unit" />
      </el-form-item>
      <el-form-item label="住址" prop="address">
        <el-input v-model="forms.address" />
      </el-form-item>
      <el-form-item label="办公电话" prop="mobile">
        <el-input v-model="forms.mobile" />
      </el-form-item>
      <el-form-item label="手机" prop="phone">
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
