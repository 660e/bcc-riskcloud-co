<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { FormRules } from 'element-plus';
import { System } from '@/api/interface';
import { getDictDataType } from '@/api/modules/system';

const forms = ref({
  riskName: '',
  count: 1,
  location: '',
  riskType: [] as string[],
  otherComment: '',
  hazardousgasType: '0',
  hazardousGasName: '',
  peripheralInfluence: '0',
  riskDesc: ''
});
const rules: FormRules = {
  riskName: [{ required: true, message: '请填写', trigger: 'blur' }],
  count: [{ required: true, message: '请填写', trigger: 'blur' }],
  location: [{ required: true, message: '请填写', trigger: 'blur' }],
  riskType: [{ required: true, message: '请选择', trigger: 'change' }],
  otherComment: [{ required: true, message: '请填写', trigger: 'blur' }],
  hazardousGasName: [{ required: true, message: '请填写', trigger: 'blur' }],
  riskDesc: [{ required: true, message: '请填写', trigger: 'blur' }]
};

const options = reactive<{ [key: string]: System.Dict[] }>({});
onMounted(async () => {
  options.riskType = (await getDictDataType('risk_damage')).data;
  options.yesNo = (await getDictDataType('yes_no')).data;
});
</script>

<template>
  <el-form :model="forms" :rules="rules" label-width="160" class="w-4/5 space-y-5">
    <div class="c-subtitle-1">基本信息</div>
    <div>
      <div class="grid grid-cols-2">
        <el-form-item label="风险源名称" prop="riskName">
          <el-input v-model="forms.riskName" />
        </el-form-item>
        <el-form-item label="风险源数量" prop="count">
          <el-input-number v-model="forms.count" :min="1" />
        </el-form-item>
        <el-form-item label="场所位置" prop="location">
          <el-input v-model="forms.location" />
        </el-form-item>
        <div></div>
        <el-form-item label="风险类型" prop="riskType">
          <el-select v-model="forms.riskType" :max-collapse-tags="3" collapse-tags collapse-tags-tooltip multiple>
            <el-option v-for="e in options.riskType" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="forms.riskType.includes('3')" label="风险类型备注" prop="otherComment">
          <el-input v-model="forms.otherComment" />
        </el-form-item>
        <div v-else></div>
        <el-form-item label="是否涉及有毒有害气体" prop="hazardousgasType">
          <el-radio-group v-model="forms.hazardousgasType">
            <el-radio v-for="e in options.yesNo" :key="e.dictValue" :value="e.dictValue">{{ e.dictLabel }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="forms.hazardousgasType === '1'" label="有毒有害气体备注" prop="hazardousGasName">
          <el-input v-model="forms.hazardousGasName" />
        </el-form-item>
        <div v-else></div>
        <el-form-item label="是否对周边有影响" prop="peripheralInfluence">
          <el-radio-group v-model="forms.peripheralInfluence">
            <el-radio v-for="e in options.yesNo" :key="e.dictValue" :value="e.dictValue">{{ e.dictLabel }}</el-radio>
          </el-radio-group>
          <el-button v-if="forms.peripheralInfluence === '1'" class="ml-5">查看周边6个敏感目标</el-button>
        </el-form-item>
      </div>
      <el-form-item label="风险源描述" prop="riskDesc">
        <el-input v-model="forms.riskDesc" :rows="5" type="textarea" />
      </el-form-item>
    </div>

    <slot />
  </el-form>
</template>
