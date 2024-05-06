<script lang="tsx" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getDuty } from '@/api/modules/list';
import { getDictDataType } from '@/api/modules/system';
import { deleteItem } from '@/api/modules/company';
import { ColumnProps } from '@/components/pro-table/interface';
import ProTable from '@/components/pro-table/index.vue';
import DetailDialog from './dialogs/detail.vue';

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

const detailDialogRef = ref();
const detail = (row: any) => detailDialogRef.value.open(row);

const remove = (row: any) => {
  const name = row.id ? `“${row.id}”` : '';
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
  <div class="h-full flex flex-col">
    <pro-table :columns="columns" :request-api="getDuty" ref="tableRef" row-key="id">
      <template #tableHeader>
        <el-button @click="create" type="primary">新增共性清单</el-button>
        <el-button @click="create" type="primary">新增个性清单</el-button>
        <el-button :disabled="!tableRef?.selectedListIds.length" @click="remove" type="danger" plain>删除</el-button>
      </template>
      <template #operation="scope">
        <el-button v-if="scope.row.type === '1'" @click="detail(scope.row)" type="primary" link>编辑</el-button>
        <el-button @click="remove(scope.row)" type="danger" link>删除</el-button>
      </template>
    </pro-table>

    <!-- 详情 -->
    <detail-dialog ref="detailDialogRef" />
  </div>
</template>
