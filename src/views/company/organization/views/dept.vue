<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ColumnProps } from '@/components/pro-table/interface';
import { deleteItem, getCompanyDeptTree, getDept } from '@/api/modules/company';
import { TreeFilter } from '@bcc/components';
import ProTable from '@/components/pro-table/index.vue';
import CreateDeptDialog from '../dialogs/create-dept.vue';

const deptId = ref('1');
const deptIdChange = (value: string) => {
  deptId.value = value;
  tableRef.value.search(tableRef.value.pageable?.pageNum);
  tableRef.value.clearSelection();
};

const tableRef = ref();
const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'deptName', label: '部门名称', search: { el: 'input' } },
  { prop: 'sort', label: '排序' },
  { prop: 'status', label: '部门状态' },
  { prop: 'createTime', label: '创建时间' },
  { prop: 'disableTime', label: '停用时间' },
  { prop: 'operation', label: '操作', width: 120 }
];

const createDeptDialogRef = ref();
const create = (row: any = {}) => createDeptDialogRef.value.open(row);

const remove = (row: any) => {
  const name = row.deptId ? `“${row.deptName}”` : '';
  const ids = row.deptId ? [row.deptId] : tableRef.value.selectedListIds;
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
  <el-tab-pane>
    <div class="h-full flex">
      <tree-filter :request-api="getCompanyDeptTree" @change="deptIdChange" class="h-full" style="padding: 0 0 10px 10px" />
      <div class="flex-1 flex flex-col">
        <pro-table :columns="columns" :request-api="getDept" ref="tableRef" row-key="deptId">
          <template #tableHeader>
            <el-button @click="create" type="primary">新增</el-button>
            <el-button :disabled="!tableRef?.selectedListIds.length" @click="remove" type="danger" plain>删除</el-button>
          </template>
          <template #operation="scope">
            <el-button @click="create(scope.row)" type="primary" link>编辑</el-button>
            <el-button @click="remove(scope.row)" type="danger" link>删除</el-button>
          </template>
        </pro-table>
      </div>

      <!-- 新增 -->
      <create-dept-dialog @confirm="tableRef.search() && tableRef.clearSelection()" ref="createDeptDialogRef" />
    </div>
  </el-tab-pane>
</template>
