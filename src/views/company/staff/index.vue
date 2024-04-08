<script lang="ts" name="company-staff" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getStaffList, deleteStaff } from '@/api/modules/company';
import { ColumnProps } from '@/components/pro-table/interface';

import ProTable from '@/components/pro-table/index.vue';

const tableRef = ref();
const createDialogRef = ref();

const columns: ColumnProps[] = [
  { prop: 'staffId', label: '人员编号', width: 100 },
  { prop: 'staffName', label: '人员名称', search: { el: 'input' } },
  { prop: 'operation', label: '操作', width: 180 }
];

const create = (row: any = {}) => createDialogRef.value.open(row);
const remove = (row: any) => {
  const name = row.staffId ? `“${row.staffName}”` : '';
  const ids = row.staffId ? [row.staffId] : tableRef.value.selectedListIds;
  ElMessageBox.confirm(`是否删除${name}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await deleteStaff(ids.join(','));
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      tableRef.value.clearSelection();
      ElMessage.success(msg);
    })
    .catch(() => false);
};
</script>

<template>
  <div class="flex flex-col h-full">
    <pro-table :columns="columns" :request-api="getStaffList" ref="tableRef" row-key="staffId">
      <template #tableHeader>
        <el-button @click="create()" type="primary">新增</el-button>
      </template>
      <template #operation="scope">
        <el-button @click="create(scope.row)" type="primary" link>编辑</el-button>
        <el-button @click="remove(scope.row)" type="danger" link>删除</el-button>
      </template>
    </pro-table>
  </div>
</template>
