<script lang="ts" name="company-info" setup>
import { onMounted, reactive, ref } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { getDictDataType } from '@/api/modules/system';
import { getCompanyInfo, getCompanyListById } from '@/api/modules/company';
import { System } from '@/api/interface';
import { LabelTooltip, LocationPicker } from '@bcc/components';
import IndustrySelectDialog from './dialogs/industry-select.vue';

const options = reactive<{ [key: string]: System.Dict[] }>({});
onMounted(async () => {
  options.companyType = (await getDictDataType('company_type')).data;
  options.companyIsCity = (await getDictDataType('company_is_city')).data;
  options.companyRoleId = (await getDictDataType('company_role_id')).data;
  options.searchCompanyKeywordType = (await getDictDataType('search_company_keyword_type')).data;
  options.companyCodeType = (await getDictDataType('company_code_type')).data;
  options.yesNo = (await getDictDataType('yes_no')).data;
  options.companyIdentity = (await getDictDataType('company_identity')).data;

  forms.value = (await getCompanyInfo()).data;
});

const formsRef = ref<FormInstance>();
const forms = ref<any>({
  // 单位类型
  type: '0',
  isCity: '0',
  roleId: '16',
  registeredAddress: '',
  parentName: '',
  county: '',
  constructionCompanyName: '',
  constructionCompanyAddress: '',
  constructionAddress: '',
  officeName: '',
  standardization: 0,
  secondClass: [],
  license: '',
  expires: '',

  // 单位基本信息
  placeName: '',
  creditCode: '',
  otherCode: '',
  renzongshu: 0,
  dishang: 0,
  dxmj: 0,
  dixia: 0,
  guestCount: 0,
  income: 0,
  legalname: '',
  legalmobile: '',
  qyprincipalname: '',
  qyprincipalmobile: '',
  registeredcapital: 0,
  chengliriqi: '',
  sfssc: '0',
  zRole: '1',
  gas: '0',
  dangerousChemicals: '0',
  finiteSpace: '0'
});
const rules: FormRules = {
  // 单位类型
  parentName: [{ required: true, message: '请填写', trigger: 'blur' }],
  registeredAddress: [{ required: true, message: '请填写', trigger: 'blur' }],
  county: [{ required: true, message: '请填写', trigger: 'blur' }],
  constructionCompanyName: [{ required: true, message: '请填写', trigger: 'blur' }],
  officeName: [{ required: true, message: '请填写', trigger: 'blur' }],
  standardization: [{ required: true, message: '请填写', trigger: 'blur' }],
  license: [{ required: true, message: '请填写', trigger: 'blur' }],
  expires: [{ required: true, message: '请填写', trigger: 'blur' }],

  // 单位基本信息
  placeName: [{ required: true, message: '请填写', trigger: 'blur' }],
  chengliriqi: [{ required: true, message: '请选择', trigger: 'change' }],
  mainBusiness: [{ required: true, message: '请填写', trigger: 'blur' }],
  renzongshu: [{ required: true, message: '请填写', trigger: 'blur' }],
  dishang: [{ required: true, message: '请填写', trigger: 'blur' }],
  dxmj: [{ required: true, message: '请填写', trigger: 'blur' }],
  dixia: [{ required: true, message: '请填写', trigger: 'blur' }],
  guestCount: [{ required: true, message: '请填写', trigger: 'blur' }],
  income: [{ required: true, message: '请填写', trigger: 'blur' }],
  legalname: [{ required: true, message: '请填写', trigger: 'blur' }],
  legalmobile: [{ required: true, message: '请填写', trigger: 'blur' }],
  qyprincipalname: [{ required: true, message: '请填写', trigger: 'blur' }],
  qyprincipalmobile: [{ required: true, message: '请填写', trigger: 'blur' }],
  registeredcapital: [{ required: true, message: '请填写', trigger: 'blur' }]
};
const ui = reactive({
  keywordType: '1',
  keyword: '',
  codeType: '0',
  code: ''
});

const remoteMethod = async (query: string) => {
  options.parentName = query ? (await getCompanyListById(query, ui.keywordType)).data : [];
};
const connect = () => {
  console.log(ui.keyword);
};

const industrySelectDialogRef = ref();
const setIndustry = () => industrySelectDialogRef.value.open(forms.value.secondClass);

const save = () => {
  formsRef.value?.validate(valid => {
    if (valid) {
      console.log(forms.value);
    }
  });
};
</script>

<template>
  <div class="card h-full flex flex-col">
    <div class="flex-1 overflow-y-auto pt-5">
      <el-form :model="forms" :rules="rules" label-width="180px" ref="formsRef" class="w-4/5 mx-auto space-y-5">
        <!-- 单位类型 -->
        <div class="c-subtitle-1">单位类型</div>
        <div>
          <div class="grid grid-cols-2">
            <el-form-item label="单位类型" prop="type">
              <el-radio-group v-model="forms.type">
                <el-radio v-for="e in options.companyType" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="直属关系" prop="isCity">
              <el-radio-group v-model="forms.isCity">
                <el-radio v-for="e in options.companyIsCity" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="单位角色" prop="roleId">
              <el-radio-group v-model="forms.roleId">
                <el-radio v-for="e in options.companyRoleId" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="上级单位名称" prop="parentName">
              <el-input v-model="forms.parentName" />
            </el-form-item>
            <el-form-item label="注册地址" prop="registeredAddress">
              <el-input v-model="forms.registeredAddress" />
            </el-form-item>
            <el-form-item label="实际地址" prop="county">
              <location-picker v-model="forms.county" />
            </el-form-item>
            <el-form-item label="施工单位名称" prop="constructionCompanyName">
              <el-input v-model="forms.constructionCompanyName" />
            </el-form-item>
            <el-form-item label="施工单位地址" prop="constructionCompanyAddress">
              <el-input v-model="forms.constructionCompanyAddress" />
            </el-form-item>
            <el-form-item label="项目实际地址" prop="constructionAddress">
              <el-input v-model="forms.constructionAddress" />
            </el-form-item>
            <el-form-item label="行业管理部门" prop="officeName">
              <el-input v-model="forms.officeName" />
            </el-form-item>
            <el-form-item prop="standardization">
              <template #label>
                <label-tooltip label="安全生产标准化得分" content="未开展安全生产标准化工作，得分请填写0" />
              </template>
              <el-input v-model="forms.standardization" />
            </el-form-item>
            <el-form-item label="企业证照" prop="license">
              <el-input v-model="forms.license" />
            </el-form-item>
            <el-form-item label="证照有限期" prop="expires">
              <el-date-picker v-model="forms.expires" type="date" style="width: 100%" />
            </el-form-item>
          </div>
          <el-form-item>
            <template #label>
              <label-tooltip
                label="确认上下级关系"
                content="如果上级公司参加北京市风险评估工作，则输入上级公司企业代码或企业名称建立关联，否则该项信息不填"
              />
            </template>
            <div class="w-full flex space-x-2.5">
              <el-select v-model="ui.keywordType" class="w-32">
                <el-option
                  v-for="e in options.searchCompanyKeywordType"
                  :key="e.dictValue"
                  :label="e.dictLabel"
                  :value="e.dictValue"
                />
              </el-select>
              <el-select v-model="ui.keyword" :remote-method="remoteMethod" filterable remote>
                <el-option v-for="e in options.parentName" :key="e.value" :label="e.label" :value="e.value" />
              </el-select>
              <el-button @click="connect">关联</el-button>
            </div>
          </el-form-item>
          <el-form-item label="行业领域">
            <div class="flex flex-wrap">
              <el-tag v-for="e in forms.secondClass" :key="e.value" class="my-1 mr-2" closable>{{ e.label }}</el-tag>
              <el-button @click="setIndustry" class="my-1" size="small">选择行业领域</el-button>
            </div>
          </el-form-item>
        </div>

        <!-- 单位基本信息 -->
        <div class="c-subtitle-1">单位基本信息</div>
        <div>
          <div class="grid grid-cols-2">
            <el-form-item label="单位名称" prop="placeName">
              <el-input v-model="forms.placeName" />
            </el-form-item>
            <el-form-item label="成立日期" prop="chengliriqi">
              <el-date-picker v-model="forms.chengliriqi" type="date" style="width: 100%" />
            </el-form-item>
            <el-form-item label="单位代码">
              <el-input v-model="ui.code">
                <template #prepend>
                  <el-select v-model="ui.codeType" class="w-40">
                    <el-option
                      v-for="e in options.companyCodeType"
                      :key="e.dictValue"
                      :label="e.dictLabel"
                      :value="e.dictValue"
                    />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="主营业务" prop="mainBusiness">
              <el-input v-model="forms.mainBusiness" />
            </el-form-item>
            <el-form-item label="法定代表人" prop="legalname">
              <el-input v-model="forms.legalname" />
            </el-form-item>
            <el-form-item label="法定代表人电话" prop="legalmobile">
              <el-input v-model="forms.legalmobile" />
            </el-form-item>
            <el-form-item label="单位负责人" prop="qyprincipalname">
              <el-input v-model="forms.qyprincipalname" />
            </el-form-item>
            <el-form-item label="单位负责人电话" prop="qyprincipalmobile">
              <el-input v-model="forms.qyprincipalmobile" />
            </el-form-item>
            <el-form-item label="从业人数" prop="renzongshu">
              <el-input v-model="forms.renzongshu">
                <template #append>人</template>
              </el-input>
            </el-form-item>
            <el-form-item label="建筑面积" prop="dishang">
              <el-input v-model="forms.dishang">
                <template #append>平方米</template>
              </el-input>
            </el-form-item>
            <el-form-item label="地下面积" prop="dxmj">
              <el-input v-model="forms.dxmj">
                <template #append>平方米</template>
              </el-input>
            </el-form-item>
            <el-form-item label="地下建筑面积" prop="dixia">
              <el-input v-model="forms.dixia">
                <template #append>平方米</template>
              </el-input>
            </el-form-item>
            <el-form-item label="房间数" prop="guestCount">
              <el-input v-model="forms.guestCount">
                <template #append>间</template>
              </el-input>
            </el-form-item>
            <el-form-item label="营业收入" prop="income">
              <el-input v-model="forms.income">
                <template #append>万元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="注册资本" prop="registeredcapital">
              <el-input v-model="forms.registeredcapital">
                <template #append>万元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="是否位于综合楼宇" prop="sfssc">
              <el-radio-group v-model="forms.sfssc">
                <el-radio v-for="e in options.yesNo" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="楼宇权属角色" prop="zRole">
              <el-radio-group v-model="forms.zRole">
                <el-radio v-for="e in options.companyIdentity" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否涉及使用燃气" prop="gas">
              <el-radio-group v-model="forms.gas">
                <el-radio v-for="e in options.yesNo" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否涉及化学危险品" prop="dangerousChemicals">
              <el-radio-group v-model="forms.dangerousChemicals">
                <el-radio v-for="e in options.yesNo" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否涉及有限空间" prop="finiteSpace">
              <el-radio-group v-model="forms.finiteSpace">
                <el-radio v-for="e in options.yesNo" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>

    <el-divider class="m-0" />
    <div class="flex justify-center py-2.5">
      <el-button @click="save" type="primary">保存</el-button>
    </div>

    <!-- 选择行业领域 -->
    <industry-select-dialog ref="industrySelectDialogRef" />
  </div>
</template>
