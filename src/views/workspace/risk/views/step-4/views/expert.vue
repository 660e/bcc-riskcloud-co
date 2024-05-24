<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { companyApi, systemApi, workspaceApi } from '@/api';
import { ColumnProps } from '@/components/pro-table/interface';
import { saveAs } from 'file-saver';
import { ImportTemplateDialog } from '@bcc/components';
import createTeamDialog from '../dialogs/create-expert.vue';
import ProTable from '@/components/pro-table/index.vue';

const tableRef = ref();
const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'name', label: '姓名', width: 100 },
  {
    prop: 'gender',
    label: '性别',
    enum: () => systemApi.dict('user_sex'),
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    width: 100
  },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'profession', label: '专业' },
  { prop: 'type', label: '专家类别' },
  { prop: 'unit', label: '工作单位' },
  { prop: 'address', label: '住址' },
  { prop: 'mobile', label: '办公电话', width: 150 },
  { prop: 'phone', label: '手机', width: 150 },
  { prop: 'operation', label: '操作', width: 44 * 2 + 24 }
];

const createTeamDialogRef = ref();
const create = (row: any = {}) => createTeamDialogRef.value.open(row);

const importTemplateDialogRef = ref();
const importData = () => {
  importTemplateDialogRef.value.open({
    templateApi: companyApi.deleteItem,
    templateName: '模板.xlsx',
    importApi: companyApi.deleteItem
  });
};

const exportData = async () => {
  const blob: any = await systemApi.dict({ ...tableRef.value.searchParam, ids: tableRef.value.selectedListIds });
  saveAs(blob, `${new Date().getTime()}.xlsx`);
};

const remove = (row: any) => {
  const name = row.id ? `“${row.name}”` : '';
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
  <pro-table :columns="columns" :request-api="workspaceApi.expert" ref="tableRef" row-key="id">
    <template #tableHeader>
      <el-button @click="create" type="primary">新增</el-button>
      <el-button @click="importData">导入</el-button>
      <el-button @click="exportData">导出</el-button>
      <el-button :disabled="!tableRef?.selectedListIds.length" @click="remove" type="danger" plain>删除</el-button>
    </template>
    <template #operation="scope">
      <el-button @click="create(scope.row)" type="primary" link>编辑</el-button>
      <el-button @click="remove(scope.row)" type="danger" link>删除</el-button>
    </template>
  </pro-table>

  <!-- 新增 -->
  <create-team-dialog @confirm="tableRef.search() && tableRef.clearSelection()" ref="createTeamDialogRef" />
  <!-- 导入 -->
  <import-template-dialog @confirm="tableRef.search() && tableRef.clearSelection()" ref="importTemplateDialogRef" />
</template>
