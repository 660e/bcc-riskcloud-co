<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getDictDataType } from '@/api/modules/system';
import { deleteItem, getCompanyIndustry } from '@/api/modules/company';
import { getRiskByIndustryId } from '@/api/modules/workspace';
import { ColumnProps } from '@/components/pro-table/interface';
import { saveAs } from 'file-saver';
import { ImportTemplateDialog } from '@bcc/components';
import RisksDialog from '../../dialogs/risks.vue';
import ProTable from '@/components/pro-table/index.vue';

const industryId = ref('');
const industries = ref();

const tableRef = ref();
const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'sourceName', label: '风险源' },
  { prop: 'deptId', label: '风险类型' },
  {
    prop: 'levelName',
    label: '风险等级',
    enum: () => getDictDataType('risk_level_name'),
    search: { el: 'select' },
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    width: 100
  },
  {
    prop: 'statusFlag',
    label: '状态',
    enum: () => getDictDataType('assess_status'),
    search: { el: 'select' },
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    width: 100
  },
  { prop: 'operation', label: '操作', width: 180 }
];
const requestApi = (params: any) => {
  params.industryId = industryId.value;
  return getRiskByIndustryId(params);
};
onMounted(async () => {
  industries.value = (await getCompanyIndustry()).data;
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
    templateApi: getDictDataType,
    templateName: '模板.xlsx',
    importApi: getDictDataType
  });
};

const exportData = async () => {
  const blob: any = await getDictDataType({ ...tableRef.value.searchParam, ids: tableRef.value.selectedListIds });
  saveAs(blob, `${new Date().getTime()}.xlsx`);
};

const $router = useRouter();
const assess = (row: any) => $router.push({ name: 'risk-assess', params: { id: row.id } });

const copy = (row: any) => {
  ElMessageBox.confirm(`是否复制${row.sourceName}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await deleteItem(row.id);
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
      const { msg } = await deleteItem(ids.join(','));
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
      <el-tab-pane
        v-for="industry in industries"
        :key="industry.id"
        :label="`${industry.label}(${industry.done}/${industry.total})`"
        :name="industry.id"
      />
    </el-tabs>
    <div class="pro-table--no-card">
      <pro-table :columns="columns" :request-api="requestApi" :request-auto="false" ref="tableRef" row-key="id">
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
