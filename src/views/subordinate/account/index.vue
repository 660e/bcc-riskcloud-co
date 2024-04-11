<script lang="ts" setup>
import { ref } from 'vue';
import { getSubordinateAccount } from '@/api/modules/subordinate';
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
  { prop: 'operation', label: '操作', width: 200 }
];

const createDialogRef = ref();
const create = (row: any = {}) => createDialogRef.value.open(row);

const view = (row: any) => console.log(row);
</script>

<template>
  <div class="h-full flex flex-col">
    <pro-table :columns="columns" :request-api="getSubordinateAccount" ref="tableRef" row-key="id">
      <template #tableHeader>
        <el-button @click="create()" type="primary">新增</el-button>
        <el-button :disabled="!tableRef?.selectedListIds.length">恢复</el-button>
        <el-button :disabled="!tableRef?.selectedListIds.length">核销</el-button>
        <el-button :disabled="!tableRef?.selectedListIds.length" type="danger" plain>解除上下级关系</el-button>
        <el-button>关联下属公司</el-button>
      </template>
      <template #operation="scope">
        <el-button @click="create(scope.row)" type="primary" link>修改</el-button>
        <el-button @click="view(scope.row)" type="primary" link>解除上下级关系</el-button>
      </template>
    </pro-table>

    <!-- 新增/编辑 -->
    <create-dialog @confirm="tableRef.search(tableRef.pageable?.pageNum) && tableRef.clearSelection()" ref="createDialogRef" />
  </div>
</template>
