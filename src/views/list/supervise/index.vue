<script lang="ts" setup>
import { ref } from 'vue';
import { getListSupervise } from '@/api/modules/list';
import { ColumnProps } from '@/components/pro-table/interface';

import ProTable from '@/components/pro-table/index.vue';
import DetailDialog from './dialogs/detail.vue';

const tableRef = ref();
const columns: ColumnProps[] = [
  { prop: 'name', label: '清单名称', search: { el: 'input' } },
  { prop: 'point', label: '关联点位', search: { el: 'input' } },
  { prop: 'principal', label: '检查人员' },
  { prop: 'operation', label: '操作', width: 200 }
];

const detailDialogRef = ref();
const detail = (row: any) => detailDialogRef.value.open(row);
</script>

<template>
  <div class="h-full flex flex-col">
    <pro-table :columns="columns" :request-api="getListSupervise" ref="tableRef" row-key="id">
      <template #operation="scope">
        <el-button @click="detail(scope.row)" type="primary" link>检查</el-button>
        <el-button @click="detail(scope.row)" type="primary" link>编辑</el-button>
        <el-button @click="detail(scope.row)" type="primary" link>详情</el-button>
        <el-button @click="detail(scope.row)" type="danger" link>删除</el-button>
      </template>
    </pro-table>

    <!-- 详情 -->
    <detail-dialog ref="detailDialogRef" />
  </div>
</template>
