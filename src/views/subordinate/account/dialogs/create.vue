<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { createUser, editUser, getDictDataType } from '@/api/modules/system';
import { cloneDeep } from 'lodash';

const $emit = defineEmits(['confirm']);

const visible = ref(false);
const formsRef = ref<FormInstance>();
const forms = ref({
  id: undefined,
  placeName: '',
  statusName: '0',
  remark: ''
});
const rules: FormRules = {
  placeName: [{ required: true, message: '请填写', trigger: 'blur' }]
};
const statusOptions = ref();

const open = async (row: any) => {
  visible.value = true;

  const p0 = getDictDataType('enable_disable');
  const response: any = await Promise.all([p0]);
  statusOptions.value = response[0].data;

  if (row.id) {
    forms.value = cloneDeep(row);
  }
};
const closed = () => {
  formsRef.value?.resetFields();
  forms.value.id = undefined;
};
const confirm = () => {
  formsRef.value?.validate(async valid => {
    if (valid) {
      const { msg } = forms.value.id ? await editUser(forms.value) : await createUser(forms.value);
      $emit('confirm');
      ElMessage.success(msg);
      visible.value = false;
    }
  });
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" :title="forms.id ? '编辑' : '新增'" @closed="closed" width="500">
    <el-form :model="forms" :rules="rules" label-width="100" ref="formsRef" class="px-5 pt-5">
      <el-form-item label="名称" prop="placeName">
        <el-input v-model="forms.placeName" maxlength="30" />
      </el-form-item>
      <el-form-item label="状态" prop="statusName">
        <el-radio-group v-model="forms.statusName">
          <el-radio v-for="s in statusOptions" :key="s.dictCode" :value="s.dictValue">{{ s.dictLabel }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="forms.remark" type="textarea" />
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
