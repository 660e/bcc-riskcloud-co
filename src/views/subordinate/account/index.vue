<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getSubordinateAccount } from '@/api/modules/subordinate';
import { deleteItem } from '@/api/modules/company';
import { ColumnProps } from '@/components/pro-table/interface';
import CreateDialog from './dialogs/create.vue';
import ProTable from '@/components/pro-table/index.vue';

const tableRef = ref();
const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'placeName', label: '单位名称', search: { el: 'input' } },
  { prop: 'countyName', label: '所属区域', search: { el: 'input' } },
  { prop: 'parentName', label: '上级单位' },
  { prop: 'statusName', label: '状态' },
  { prop: 'operation', label: '操作', width: 280 }
];

const createDialogRef = ref();
const create = (row: any = {}) => createDialogRef.value.open(row);

const handle = (row: any, cmd: 'write-off' | 'revert' | 'unbind') => {
  let fn: any;

  switch (cmd) {
    case 'write-off':
      fn = deleteItem;
      break;
    case 'revert':
      fn = deleteItem;
      break;
    case 'unbind':
      fn = deleteItem;
      break;
  }

  const name = row.id ? `“${row.placeName}”` : '';
  const ids = row.id ? [row.id] : tableRef.value.selectedListIds;
  ElMessageBox.confirm(`是否解除${name}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await fn(ids.join(','));
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      tableRef.value.clearSelection();
      ElMessage.success(msg);
    })
    .catch(() => false);
};
</script>

<template>
  <div class="h-full flex flex-col">
    <pro-table :columns="columns" :request-api="getSubordinateAccount" ref="tableRef" row-key="id">
      <template #tableHeader>
        <el-button @click="create()" type="primary">新增</el-button>
        <el-button @click="handle({}, 'write-off')" :disabled="!tableRef?.selectedListIds.length">核销</el-button>
        <el-button @click="handle({}, 'revert')" :disabled="!tableRef?.selectedListIds.length">恢复</el-button>
        <el-button>关联下属公司</el-button>
        <el-button @click="handle({}, 'unbind')" :disabled="!tableRef?.selectedListIds.length" type="danger" plain>
          解除上下级关系
        </el-button>
      </template>
      <template #operation="scope">
        <el-button @click="create(scope.row)" type="primary" link>修改</el-button>
        <el-button @click="handle(scope.row, 'write-off')" type="primary" link>核销</el-button>
        <el-button @click="handle(scope.row, 'revert')" type="primary" link>恢复</el-button>
        <el-button @click="handle(scope.row, 'unbind')" type="danger" link>解除上下级关系</el-button>
      </template>
    </pro-table>

    <!-- 新增/编辑 -->
    <create-dialog @confirm="tableRef.search(tableRef.pageable?.pageNum) && tableRef.clearSelection()" ref="createDialogRef" />
  </div>
</template>
