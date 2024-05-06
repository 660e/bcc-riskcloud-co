<script lang="tsx" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ColumnProps } from '@/components/pro-table/interface';
import { getDictDataType } from '@/api/modules/system';
import { deleteItem } from '@/api/modules/company';
import { getListPostTree, getPostDuty } from '@/api/modules/list';
import { TreeFilter } from '@bcc/components';
import ProTable from '@/components/pro-table/index.vue';

const deptId = ref('1');
const deptIdChange = (value: string) => {
  deptId.value = value;
  tableRef.value.search(tableRef.value.pageable?.pageNum);
  tableRef.value.clearSelection();
};

const tableRef = ref();
const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'id', label: '序号', width: 100 },
  { prop: 'content', label: '清单内容', search: { el: 'input' } },
  {
    prop: 'type',
    label: '清单类型',
    width: 150,
    enum: () => getDictDataType('list_type'),
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    render: scope => {
      switch (scope.row.type) {
        case '0':
          return <el-tag type='primary'>共性清单</el-tag>;
        case '1':
          return <el-tag type='success'>个性清单</el-tag>;
      }
    }
  },
  { prop: 'operation', label: '操作', width: 150 }
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
    <tree-filter :request-api="getListPostTree" @change="deptIdChange" />
    <div class="flex-1 flex flex-col pt-2.5">
      <pro-table :columns="columns" :request-api="getPostDuty" ref="tableRef" row-key="deptId">
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
  </el-tab-pane>
</template>
