<script lang="ts" setup>
import { ref } from 'vue';
import { workspaceApi } from '@/api';
import { ColumnProps } from '@/components/pro-table/interface';
import ProTable from '@/components/pro-table/index.vue';
import ReportDialog from '../dialogs/report.vue';

const tableRef = ref();
const columns: ColumnProps[] = [
  { prop: 'name', label: '评估报告' },
  { prop: 'date', label: '上传时间' },
  { prop: 'operation', label: '操作', width: 44 + 24 }
];

const reportDialogRef = ref();
const view = (row: any) => reportDialogRef.value.open(row);
</script>

<template>
  <pro-table :columns="columns" :request-api="workspaceApi.informationReport" ref="tableRef" row-key="id">
    <template #operation="scope">
      <el-button @click="view(scope.row)" type="primary" link>查看</el-button>
    </template>
  </pro-table>

  <!-- 应急物资 -->
  <report-dialog ref="reportDialogRef" />
</template>
