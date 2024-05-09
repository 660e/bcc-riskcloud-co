<script lang="tsx" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ColumnProps } from '@/components/pro-table/interface';
import { getDictDataType } from '@/api/modules/system';
import { deleteItem, getCompanyDeptTree, getDept } from '@/api/modules/company';
import { TreeFilter } from '@bcc/components';
import ProTable from '@/components/pro-table/index.vue';
import CreateDeptDialog from '../dialogs/create-dept.vue';
import DetailDeptDialog from '../dialogs/detail-dept.vue';

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
  { prop: 'sort', label: '排序', width: 100 },
  {
    prop: 'status',
    label: '部门状态',
    enum: () => getDictDataType('enable_disable'),
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    render: scope => {
      switch (scope.row.status) {
        case '0':
          return <el-tag type='success'>启用</el-tag>;
        case '1':
          return <el-tag type='danger'>禁用</el-tag>;
      }
    },
    width: 100
  },
  { prop: 'createTime', label: '创建时间', width: 200 },
  { prop: 'disableTime', label: '停用时间', width: 200 },
  { prop: 'operation', label: '操作', width: 44 * 3 + 24 }
];

const createDeptDialogRef = ref();
const create = (row: any = {}) => createDeptDialogRef.value.open(row);

const detailDeptDialogRef = ref();
const detail = (row: any) => detailDeptDialogRef.value.open(row);

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
  <el-tab-pane class="h-full flex">
    <tree-filter :request-api="getCompanyDeptTree" @change="deptIdChange" />
    <div class="flex-1 flex flex-col pt-2.5">
      <pro-table :columns="columns" :request-api="getDept" ref="tableRef" row-key="deptId">
        <template #tableHeader>
          <el-button @click="create" type="primary">新增</el-button>
          <el-button :disabled="!tableRef?.selectedListIds.length" @click="remove" type="danger" plain>删除</el-button>
        </template>
        <template #operation="scope">
          <el-button @click="detail(scope.row)" type="primary" link>查看</el-button>
          <el-button @click="create(scope.row)" type="primary" link>编辑</el-button>
          <el-button @click="remove(scope.row)" type="danger" link>删除</el-button>
        </template>
      </pro-table>
    </div>

    <!-- 新增 -->
    <create-dept-dialog @confirm="tableRef.search() && tableRef.clearSelection()" ref="createDeptDialogRef" />
    <!-- 详情 -->
    <detail-dept-dialog ref="detailDeptDialogRef" />
  </el-tab-pane>
</template>
