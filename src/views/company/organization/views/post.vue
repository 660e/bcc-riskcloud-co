<script lang="tsx" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ColumnProps } from '@/components/pro-table/interface';
import { companyApi, systemApi } from '@/api';
import { TreeFilter } from '@bcc/components';
import ProTable from '@/components/pro-table/index.vue';
import CreatePostDialog from '../dialogs/create-post.vue';

const postId = ref('1');
const postIdChange = (value: string) => {
  postId.value = value;
  tableRef.value.search(tableRef.value.pageable?.pageNum);
  tableRef.value.clearSelection();
};

const tableRef = ref();
const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'postName', label: '岗位名称', search: { el: 'input' } },
  { prop: 'dept', label: '所属部门' },
  { prop: 'parentDept', label: '上级岗位' },
  {
    prop: 'status',
    label: '岗位状态',
    enum: () => systemApi.dict('enable_disable'),
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
  { prop: 'operation', label: '操作', width: 44 * 2 + 24 }
];

const createPostDialogRef = ref();
const create = (row: any = {}) => createPostDialogRef.value.open(row);

const remove = (row: any) => {
  const name = row.postId ? `“${row.postName}”` : '';
  const ids = row.postId ? [row.postId] : tableRef.value.selectedListIds;
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
  <tree-filter :request-api="companyApi.deptTree" @change="postIdChange" />
  <div class="flex-1 flex flex-col pt-2.5">
    <pro-table :columns="columns" :request-api="companyApi.post" ref="tableRef" row-key="postId">
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
  <create-post-dialog @confirm="tableRef.search() && tableRef.clearSelection()" ref="createPostDialogRef" />
</template>
