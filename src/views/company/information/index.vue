<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import { getDictDataType } from '@/api/modules/system';
import { System } from '@/api/interface';

const formsRef = ref<FormInstance>();
const forms = ref({
  isCity: '0',
  roleId: '16',
  parentName: '',
  county: '',
  officeName: '',
  standardization: 100
});
const rules: FormRules = {
  parentName: [{ required: true, message: '请填写', trigger: 'blur' }],
  standardization: [{ required: true, message: '请填写', trigger: 'blur' }]
};
const ui = ref({
  type: '1',
  keyword: '',
  secondClass: Array.from({ length: 20 }, (_, i) => i)
});

const save = () => {
  formsRef.value?.validate(valid => {
    if (valid) {
      console.log(forms.value);
    }
  });
};

const options = reactive<{ [key: string]: System.Dict[] }>({
  isCity: [],
  roleId: [],
  keywordsType: []
});

onMounted(async () => {
  options.isCity = (await getDictDataType('company_is_city')).data;
  options.roleId = (await getDictDataType('company_role_id')).data;
  options.keywordType = (await getDictDataType('search_company_keyword_type')).data;
});
</script>

<template>
  <div class="card h-full flex flex-col">
    <el-form :model="forms" :rules="rules" label-width="170px" ref="formsRef" class="flex-1 overflow-y-auto px-5 pt-5 flex">
      <div class="flex-1">
        <div class="c-subtitle-1">单位类型</div>
        <div class="p-5 grid grid-cols-2">
          <el-form-item label="直属关系" prop="isCity">
            <el-radio-group v-model="forms.isCity">
              <el-radio v-for="e in options.isCity" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="单位角色" prop="roleId">
            <el-radio-group v-model="forms.roleId">
              <el-radio v-for="e in options.roleId" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="上级单位名称" prop="parentName" class="col-span-2">
            <el-input v-model="forms.parentName" />
          </el-form-item>
          <el-form-item class="col-span-2">
            <template #label>
              <div class="flex items-center space-x-1">
                <span>确认上下级关系</span>
                <el-tooltip content="如果上级公司参加北京市风险评估工作，则输入信息建立关联，否则该项信息不填" placement="top">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
            <el-input v-model="ui.keyword">
              <template #prepend>
                <el-select v-model="ui.type" class="w-28">
                  <el-option v-for="e in options.keywordType" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
                </el-select>
              </template>
              <template #append>
                <el-button :icon="Search" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="实际地址" prop="county" class="col-span-2"></el-form-item>
          <el-form-item label="行业领域" class="col-span-2">
            <div class="flex flex-wrap">
              <el-tag v-for="e in ui.secondClass" :key="e" class="my-1 mr-2" closable>{{ e }}</el-tag>
              <el-button class="my-1" size="small">添加行业领域</el-button>
            </div>
          </el-form-item>
          <el-form-item label="行业管理部门" prop="officeName" class="col-span-2">
            <el-input v-model="forms.officeName" />
          </el-form-item>
          <el-form-item prop="standardization" class="col-span-2">
            <template #label>
              <div class="flex items-center space-x-1">
                <span>安全生产标准化得分</span>
                <el-tooltip content="未开展安全生产标准化工作，得分请填写0" placement="top">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
            <el-input v-model="forms.standardization" />
          </el-form-item>
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
