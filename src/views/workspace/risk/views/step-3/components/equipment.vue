<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getDictDataType } from '@/api/modules/system';
import { deleteItem } from '@/api/modules/company';
import { getRiskByIndustryId } from '@/api/modules/workspace';
import { ColumnProps } from '@/components/pro-table/interface';
import { saveAs } from 'file-saver';

import { ImportTemplateDialog } from '@bcc/components';
import ProTable from '@/components/pro-table/index.vue';

const tableRef = ref();
const columns: ColumnProps[] = [
  { prop: 'name', label: '队伍名称' },
  { prop: 'type', label: '队伍类型' },
  { prop: 'establishTime', label: '成立时间' },
  { prop: 'address', label: '地址' },
  { prop: 'stuffNum', label: '总人数' },
  { prop: 'chief', label: '负责人' },
  { prop: 'phone', label: '值班电话' },
  { prop: 'operation', label: '操作', width: 100 }
];

const createDialogRef = ref();
const create = (row: any = {}) => createDialogRef.value.open(row);

const importTemplateDialogRef = ref();
const importData = () => {
  importTemplateDialogRef.value.open({
    templateApi: getDictDataType,
    templateName: '用户列表模板.xlsx',
    importApi: getDictDataType
  });
};

const exportData = async () => {
  const blob: any = await getDictDataType({ ...tableRef.value.searchParam, ids: tableRef.value.selectedListIds });
  saveAs(blob, `user_${new Date().getTime()}.xlsx`);
};

const remove = (row: any) => {
  const name = row.id ? `“${row.name}”` : '';
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
  <el-tab-pane v-bind="$attrs">
    <pro-table :columns="columns" :request-api="getRiskByIndustryId" ref="tableRef" row-key="id">
      <template #tableHeader>
        <el-button @click="create" type="primary">新增</el-button>
        <el-button @click="importData">导入</el-button>
        <el-button @click="exportData">导出</el-button>
      </template>
      <template #operation="scope">
        <el-button @click="remove(scope.row)" type="danger" link>删除</el-button>
      </template>
    </pro-table>

    <!-- 导入 -->
    <import-template-dialog @confirm="tableRef.search() && tableRef.clearSelection()" ref="importTemplateDialogRef" />
  </el-tab-pane>
</template>
