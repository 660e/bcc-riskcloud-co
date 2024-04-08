<script lang="ts" name="company-post" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getPostList, deletePost } from '@/api/modules/company';
import { ColumnProps } from '@/components/pro-table/interface';

import ProTable from '@/components/pro-table/index.vue';

const tableRef = ref();
const createDialogRef = ref();

const columns: ColumnProps[] = [
  { prop: 'postId', label: '岗位编号', width: 100 },
  { prop: 'postName', label: '岗位名称', search: { el: 'input' } },
  { prop: 'operation', label: '操作', width: 180 }
];

const create = (row: any = {}) => createDialogRef.value.open(row);
const remove = (row: any) => {
  const name = row.postId ? `“${row.postName}”` : '';
  const ids = row.postId ? [row.postId] : tableRef.value.selectedListIds;
  ElMessageBox.confirm(`是否删除${name}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await deletePost(ids.join(','));
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      tableRef.value.clearSelection();
      ElMessage.success(msg);
    })
    .catch(() => false);
};
</script>

<template>
  <div class="flex flex-col h-full">
    <pro-table :columns="columns" :request-api="getPostList" ref="tableRef" row-key="postId">
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
