<script lang="ts" name="company-dept" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getDictDataType } from '@/api/modules/system';
import { getList, deleteItem } from '@/api/modules/company';
import { ColumnProps } from '@/components/pro-table/interface';
import { saveAs } from 'file-saver';

import { ImportTemplateDialog } from '@bcc/components';
import ProTable from '@/components/pro-table/index.vue';
import CreateDialog from './dialogs/create.vue';

const tableRef = ref();
const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'staffId', label: '人员编号', width: 100 },
  { prop: 'staffName', label: '人员名称', search: { el: 'input' } },
  { prop: 'operation', label: '操作', width: 180 }
];

const createDialogRef = ref();
const create = (row: any = {}) => createDialogRef.value.open(row);

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

const remove = (row: any) => {
  const name = row.staffId ? `“${row.staffName}”` : '';
  const ids = row.staffId ? [row.staffId] : tableRef.value.selectedListIds;
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
  <div class="flex flex-col h-full">
    <pro-table :columns="columns" :request-api="getList" ref="tableRef" row-key="staffId">
      <template #tableHeader>
        <el-button @click="create()" type="primary">新增</el-button>
        <el-button @click="importData">导入</el-button>
        <el-button @click="exportData">导出</el-button>
        <el-button @click="remove" :disabled="!tableRef?.selectedListIds.length" type="danger" plain>删除</el-button>
      </template>
      <template #operation="scope">
        <el-button @click="create(scope.row)" type="primary" link>编辑</el-button>
        <el-button @click="remove(scope.row)" type="danger" link>删除</el-button>
      </template>
    </pro-table>

    <!-- 新增/编辑 -->
    <create-dialog @confirm="tableRef.search(tableRef.pageable?.pageNum) && tableRef.clearSelection()" ref="createDialogRef" />
    <!-- 导入 -->
    <import-template-dialog @confirm="tableRef.search() && tableRef.clearSelection()" ref="importTemplateDialogRef" />
  </div>
</template>
