<template>
  <el-dialog v-model="visible" :title="forms.id ? '编辑' : '新增'" @closed="closed" width="400">
    <el-form :model="forms" :rules="rules" label-width="100" ref="formsRef" class="px-5 pt-5">
      <el-form-item label="队伍名称" prop="name">
        <el-input v-model="forms.name" />
      </el-form-item>
      <el-form-item label="队伍类型" prop="type">
        <el-input v-model="forms.type" />
      </el-form-item>
      <el-form-item label="成立时间" prop="establishTime">
        <el-input v-model="forms.establishTime" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="forms.address" />
      </el-form-item>
      <el-form-item label="总人数" prop="stuffNum">
        <el-input v-model="forms.stuffNum" />
      </el-form-item>
      <el-form-item label="负责人" prop="chief">
        <el-input v-model="forms.chief" />
      </el-form-item>
      <el-form-item label="值班电话" prop="phone">
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

<script lang="ts" name="create-dialog" setup>
import { reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { getDictDataType } from '@/api/modules/system';
import { deleteItem } from '@/api/modules/company';
import { cloneDeep } from 'lodash';

const $emit = defineEmits(['confirm']);

const visible = ref(false);
const formsRef = ref<FormInstance>();
const forms = ref({
  id: undefined,
  name: '',
  type: '',
  establishTime: '',
  address: '',
  stuffNum: '',
  chief: '',
  phone: ''
});
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请填写', trigger: 'blur' }]
});

const open = async (row: any) => {
  visible.value = true;

  console.log(getDictDataType);

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
      const { msg } = forms.value.id ? await deleteItem('') : await deleteItem('');
      $emit('confirm');
      ElMessage.success(msg);
      visible.value = false;
    }
  });
};

defineExpose({ open });
</script>
