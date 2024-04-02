<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { getDictDataType } from '@/api/modules/system';
import { System } from '@/api/interface';

const formsRef = ref<FormInstance>();
const forms = ref({
  isCity: '0',
  roleId: '16'
});
const rules: FormRules = {
  dictLabel: [{ required: true, message: '请填写字典标签', trigger: 'blur' }],
  dictValue: [{ required: true, message: '请填写字典键值', trigger: 'blur' }],
  dictSort: [{ required: true, message: '请填写显示顺序', trigger: 'blur' }]
};

const save = () => {
  formsRef.value?.validate(valid => {
    if (valid) {
      console.log(forms.value);
    }
  });
};

const options = reactive<{ [key: string]: System.Dict[] }>({
  isCity: [],
  roleId: []
});

onMounted(async () => {
  options.isCity = (await getDictDataType('company_is_city')).data;
  options.roleId = (await getDictDataType('company_role_id')).data;
});
</script>

<template>
  <div class="card h-full flex flex-col">
    <el-form :model="forms" :rules="rules" class="flex-1 overflow-y-auto px-2.5 pt-2.5 flex" ref="formsRef">
      <div class="flex-1">
        <div class="c-subtitle-1">单位类型</div>
        <div class="p-5 grid grid-cols-2">
          <el-form-item label="直属关系" prop="isCity">
            <el-radio-group v-model="forms.isCity">
              <el-radio v-for="c in options.isCity" :key="c.dictValue" :label="c.dictLabel" :value="c.dictValue" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="单位角色" prop="roleId">
            <el-radio-group v-model="forms.roleId">
              <el-radio v-for="c in options.roleId" :key="c.dictValue" :label="c.dictLabel" :value="c.dictValue" />
            </el-radio-group>
          </el-form-item>
          <div class="col-span-2"></div>
        </div>
      </div>
      <div class="flex-1">
        <div class="c-subtitle-1">单位基本信息</div>
      </div>
    </el-form>
    <div class="flex justify-center py-2.5">
      <el-button @click="save" type="primary">保存</el-button>
    </div>
  </div>
</template>
