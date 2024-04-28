<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { System } from '@/api/interface';
import { getDictDataType } from '@/api/modules/system';
import { addItem, updateItem } from '@/api/modules/company';
import { cloneDeep } from 'lodash';

const $emit = defineEmits(['confirm']);
const visible = ref(false);
const formsRef = ref<FormInstance>();
const forms = ref({
  postId: undefined,
  postName: '',
  dept: '',
  parentDept: '',
  status: '0'
});
const rules: FormRules = {
  postName: [{ required: true, message: '请填写', trigger: 'blur' }]
};
const options = reactive<{ [key: string]: System.Dict[] }>({});

const open = async (row: any) => {
  visible.value = true;

  const p0 = getDictDataType('enable_disable');
  const response: any = await Promise.all([p0]);
  options.status = response[0].data;

  if (row.postId) {
    forms.value = cloneDeep(row);
  }
};
const closed = () => {
  formsRef.value?.resetFields();
  forms.value.postId = undefined;
};
const confirm = () => {
  formsRef.value?.validate(async valid => {
    if (valid) {
      const { msg } = forms.value.postId ? await updateItem(forms.value) : await addItem(forms.value);
      $emit('confirm');
      ElMessage.success(msg);
      visible.value = false;
    }
  });
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" :title="forms.postId ? '编辑' : '新增'" @closed="closed" width="500">
    <el-form :model="forms" :rules="rules" label-width="100" ref="formsRef" class="px-5 pt-5">
      <el-form-item label="岗位名称" prop="postName">
        <el-input v-model="forms.postName" />
      </el-form-item>
      <el-form-item label="所属部门" prop="dept">
        <el-input v-model="forms.dept" />
      </el-form-item>
      <el-form-item label="上级岗位" prop="parentDept">
        <el-input v-model="forms.parentDept" />
      </el-form-item>
      <el-form-item label="岗位状态" prop="status">
        <el-radio-group v-model="forms.status">
          <el-radio v-for="e in options.status" :key="e.dictValue" :value="e.dictValue" :label="e.dictLabel" />
        </el-radio-group>
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
