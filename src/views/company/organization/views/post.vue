<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ColumnProps } from '@/components/pro-table/interface';
import { deleteItem, getCompanyDeptTree, getPost } from '@/api/modules/company';
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
  { prop: 'status', label: '岗位状态' },
  { prop: 'operation', label: '操作', width: 120 }
];

const createPostDialogRef = ref();
const create = (row: any = {}) => createPostDialogRef.value.open(row);

const remove = (row: any) => {
  const name = row.postId ? `“${row.postName}”` : '';
  const ids = row.postId ? [row.postId] : tableRef.value.selectedListIds;
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
      <tree-filter :request-api="getCompanyDeptTree" @change="postIdChange" class="h-full" style="padding: 0 0 10px 10px" />
      <div class="flex-1 flex flex-col">
        <pro-table :columns="columns" :request-api="getPost" ref="tableRef" row-key="postId">
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
    </div>
  </el-tab-pane>
</template>
