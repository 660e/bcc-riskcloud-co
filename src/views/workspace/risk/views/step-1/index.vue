<script lang="tsx" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getRiskByIndustryId } from '@/api/modules/workspace';
import { companyApi, systemApi } from '@/api';
import { ColumnProps } from '@/components/pro-table/interface';
import { saveAs } from 'file-saver';
import { ImportTemplateDialog, SimpleTabs } from '@bcc/components';
import RisksDialog from './dialogs/risks.vue';
import ProTable from '@/components/pro-table/index.vue';

const industryId = ref('');
const industries = ref();

const tabs = [
  { label: '全部', value: 6, count: 3 },
  { label: '已完成', value: 2, count: 2 },
  { label: '评估中', value: 1, count: 0 },
  { label: '待评估', value: 0, count: 1 },
  { label: '已驳回', value: 4, count: 0 },
  { label: '已删除', value: 3, count: 0 }
];
const tabChange = (value: number) => {
  console.log(value);
};

const tableRef = ref();
const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'sourceName', label: '风险源' },
  { prop: 'riskType', label: '风险类型' },
  {
    prop: 'levelName',
    label: '风险等级',
    enum: () => systemApi.dict('risk_level_name'),
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    width: 100
  },
  {
    prop: 'statusFlag',
    label: '状态',
    enum: () => systemApi.dict('assess_status'),
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    render: scope => {
      switch (scope.row.statusFlag) {
        case '0':
          return <el-tag type='warning'>待评估</el-tag>;
        case '1':
          return <el-tag type='primary'>评估中</el-tag>;
        case '2':
          return <el-tag type='success'>已完成</el-tag>;
        case '3':
          return <el-tag type='info'>已删除</el-tag>;
        case '4':
          return <el-tag type='danger'>已驳回</el-tag>;
      }
    },
    width: 100
  },
  { prop: 'operation', label: '操作', width: 44 * 3 + 24 }
];
const requestApi = (params: any) => {
  params.industryId = industryId.value;
  return getRiskByIndustryId(params);
};
onMounted(async () => {
  industries.value = (await companyApi.industry('1')).data;
  if (industries.value.length) {
    industryId.value = industries.value[0].id;
    tableRef.value.search(tableRef.value.pageable?.pageNum);
  }
});

const risksDialogRef = ref();
const risks = () => risksDialogRef.value.open();

const importTemplateDialogRef = ref();
const importData = () => {
  importTemplateDialogRef.value.open({
    templateApi: systemApi.dict,
    templateName: '模板.xlsx',
    importApi: systemApi.dict
  });
};

const exportData = async () => {
  const blob: any = await systemApi.dict({ ...tableRef.value.searchParam, ids: tableRef.value.selectedListIds });
  saveAs(blob, `${new Date().getTime()}.xlsx`);
};

const $router = useRouter();
const assess = (row: any) => $router.push({ name: 'risk-assess', params: { id: row.id } });

const copy = (row: any) => {
  ElMessageBox.confirm(`是否复制${row.sourceName}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await companyApi.copyItem(row.id);
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      tableRef.value.clearSelection();
      ElMessage.success(msg);
    })
    .catch(() => false);
};

const remove = (row: any) => {
  const name = row.id ? `“${row.sourceName}”` : '';
  const ids = row.id ? [row.id] : tableRef.value.selectedListIds;
  ElMessageBox.confirm(`是否删除${name}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await companyApi.deleteItem(ids.join(','));
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      tableRef.value.clearSelection();
      ElMessage.success(msg);
    })
    .catch(() => false);
};
</script>

<template>
  <div class="card flex-1 flex flex-col">
    <el-tabs
      v-model="industryId"
      @tab-change="tableRef.search() && tableRef.clearSelection()"
      type="border-card"
      class="no-tab-pane"
    >
      <el-tab-pane v-for="industry in industries" :key="industry.id" :label="industry.label" :name="industry.id" />
    </el-tabs>
    <div class="no-card flex-1 pt-2.5">
      <pro-table :columns="columns" :request-api="requestApi" :request-auto="false" ref="tableRef" row-key="id">
        <template #tabs>
          <simple-tabs :tabs="tabs" @change="tabChange" />
        </template>
        <template #tableHeader>
          <el-button @click="risks" type="primary">新增</el-button>
          <el-button @click="importData">导入</el-button>
          <el-button @click="exportData">导出</el-button>
          <el-button @click="remove" :disabled="!tableRef?.selectedListIds.length" type="danger" plain>删除</el-button>
        </template>
        <template #operation="scope">
          <el-button @click="assess(scope.row)" type="primary" link>评估</el-button>
          <el-button @click="copy(scope.row)" type="primary" link>复制</el-button>
          <el-button @click="remove(scope.row)" type="danger" link>删除</el-button>
        </template>
      </pro-table>
    </div>

    <!-- 新增 -->
    <risks-dialog ref="risksDialogRef" />
    <!-- 导入 -->
    <import-template-dialog @confirm="tableRef.search() && tableRef.clearSelection()" ref="importTemplateDialogRef" />
  </div>
</template>
