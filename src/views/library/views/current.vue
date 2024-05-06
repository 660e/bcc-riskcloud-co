<script lang="ts" setup>
import { ref } from 'vue';
import { getListExecute } from '@/api/modules/list';
import { ColumnProps } from '@/components/pro-table/interface';
import ProTable from '@/components/pro-table/index.vue';
import DetailDialog from '../dialogs/detail.vue';

const tableRef = ref();
const columns: ColumnProps[] = [
  { prop: 'name', label: '任务名称', search: { el: 'input' } },
  { prop: 'content', label: '工作内容' },
  { prop: 'post', label: '关联岗位' },
  { prop: 'staff', label: '关联人员' },
  { prop: 'operation', label: '操作', width: 120 }
];

const create = () => {
  console.log('create');
};

const detailDialogRef = ref();
const detail = (row: any) => detailDialogRef.value.open(row);
</script>

<template>
  <el-tab-pane class="h-full flex flex-col pt-2.5">
    <pro-table :columns="columns" :request-api="getListExecute" ref="tableRef" row-key="id">
      <template #tableHeader>
        <el-button @click="create" type="primary">新增</el-button>
      </template>
      <template #operation="scope">
        <el-button @click="detail(scope.row)" type="primary" link>执行</el-button>
        <el-button @click="detail(scope.row)" type="primary" link>详情</el-button>
      </template>
    </pro-table>

    <!-- 详情 -->
    <detail-dialog ref="detailDialogRef" />
  </el-tab-pane>
</template>
