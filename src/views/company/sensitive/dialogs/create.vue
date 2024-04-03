<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { getDictDataType } from '@/api/modules/system';
import { System } from '@/api/interface';
import { cloneDeep } from 'lodash';

const visible = ref(false);
const options = reactive<{ [key: string]: System.Dict[] }>({});
const formsRef = ref<FormInstance>();
const forms = ref({
  lnglat: [0, 0],
  type: '',
  subtype: '',
  label: ''
});
const rules = reactive<FormRules>({
  type: [{ required: true, message: '请选择敏感目标类型', trigger: 'change' }],
  subtype: [{ required: true, message: '请选择敏感目标子类型', trigger: 'change' }],
  label: [{ required: true, message: '请填写敏感目标名称', trigger: 'blur' }]
});

const typeChange = async (value: string) => {
  options.subtype = (await getDictDataType(value)).data;
};

const open = async (lnglat: any) => {
  visible.value = true;
  forms.value.lnglat = [lnglat.lng, lnglat.lat];
  options.type = (await getDictDataType('sensitive_target_type')).data;
};

const closed = () => formsRef.value?.resetFields();

const $emit = defineEmits(['confirm']);
const confirm = () => {
  formsRef.value?.validate(valid => {
    if (valid) {
      $emit('confirm', cloneDeep(forms.value));
      visible.value = false;
    }
  });
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" @closed="closed" title="添加敏感目标" width="500" align-center draggable>
    <el-form :model="forms" :rules="rules" label-width="130" ref="formsRef" class="px-5 pt-5">
      <el-form-item label="地理经纬度" prop="lnglat">
        <div>{{ forms.lnglat.join(', ') }}</div>
      </el-form-item>
      <el-form-item label="敏感目标类型" prop="type">
        <el-select v-model="forms.type" @change="typeChange">
          <el-option v-for="e in options.type" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
        </el-select>
      </el-form-item>
      <el-form-item label="敏感目标子类型" prop="subtype">
        <el-select v-model="forms.subtype">
          <el-option v-for="e in options.subtype" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
        </el-select>
      </el-form-item>
      <el-form-item label="敏感目标名称" prop="label">
        <el-input v-model="forms.label" />
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
