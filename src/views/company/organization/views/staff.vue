<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ColumnProps } from '@/components/pro-table/interface';
import { getDictDataType } from '@/api/modules/system';
import { deleteItem, getCompanyDeptTree, getStaff } from '@/api/modules/company';
import { TreeFilter } from '@bcc/components';
import ProTable from '@/components/pro-table/index.vue';
import CreateStaffDialog from '../dialogs/create-staff.vue';

const staffId = ref('1');
const staffIdChange = (value: string) => {
  staffId.value = value;
  tableRef.value.search(tableRef.value.pageable?.pageNum);
  tableRef.value.clearSelection();
};

const tableRef = ref();
const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'staffName', label: '人员姓名', search: { el: 'input' } },
  { prop: 'phone', label: '联系电话' },
  { prop: 'dept', label: '所属部门' },
  { prop: 'post', label: '所属岗位' },
  {
    prop: 'manager',
    label: '是否为企业负责人',
    enum: () => getDictDataType('yes_no'),
    fieldNames: { label: 'dictLabel', value: 'dictValue' }
  },
  { prop: 'operation', label: '操作', width: 120 }
];

const createStaffDialogRef = ref();
const create = (row: any = {}) => createStaffDialogRef.value.open(row);

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
  <el-tab-pane>
    <div class="h-full flex">
      <tree-filter :request-api="getCompanyDeptTree" @change="staffIdChange" class="h-full" style="padding: 0 0 10px 10px" />
      <div class="flex-1 flex flex-col">
        <pro-table :columns="columns" :request-api="getStaff" ref="tableRef" row-key="staffId">
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
      <create-staff-dialog @confirm="tableRef.search() && tableRef.clearSelection()" ref="createStaffDialogRef" />
    </div>
  </el-tab-pane>
</template>
