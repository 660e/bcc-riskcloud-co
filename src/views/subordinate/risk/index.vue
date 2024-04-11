<script lang="tsx" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getWorkspaceLog } from '@/api/modules/workspace';
import { deleteItem } from '@/api/modules/company';
import { ColumnProps } from '@/components/pro-table/interface';

import ProTable from '@/components/pro-table/index.vue';
import StatisticDialog from './dialogs/statistic.vue';
import CheckDialog from './dialogs/check.vue';

const tableRef = ref();
const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'placeName', label: '单位名称', search: { el: 'input' } },
  { prop: 'level1', label: '低' },
  { prop: 'level2', label: '一般' },
  { prop: 'level3', label: '较大' },
  { prop: 'level4', label: '重大' },
  { prop: 'expert', label: '应急专家' },
  { prop: 'teams', label: '应急队伍' },
  { prop: 'equipment', label: '应急装备' },
  { prop: 'goods', label: '应急物资' },
  { prop: 'abilityLevelName', label: '应急能力' },
  { prop: 'operation', label: '操作', width: 180 }
];

const handle = (row: any, cmd: 'approve' | 'reject') => {
  let fn: any;

  switch (cmd) {
    case 'approve':
      fn = deleteItem;
      break;
    case 'reject':
      fn = deleteItem;
      break;
  }

  const name = row.id ? `“${row.placeName}”` : '';
  const ids = row.id ? [row.id] : tableRef.value.selectedListIds;
  ElMessageBox.confirm(`是否处理${name}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await fn(ids.join(','));
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      tableRef.value.clearSelection();
      ElMessage.success(msg);
    })
    .catch(() => false);
};

const statisticDialogRef = ref();
const statistic = (row: any) => statisticDialogRef.value.open(row);

const checkDialogRef = ref();
const check = (row: any) => checkDialogRef.value.open(row);

const confirm = (params: any) => handle(params.row, params.cmd);
</script>

<template>
  <pro-table :columns="columns" :request-api="getWorkspaceLog" ref="tableRef" row-key="id">
    <template #tableHeader>
      <el-button @click="handle({}, 'approve')" :disabled="!tableRef?.selectedListIds.length">通过</el-button>
      <el-button @click="handle({}, 'reject')" :disabled="!tableRef?.selectedListIds.length">驳回</el-button>
    </template>
    <template #operation="scope">
      <el-button @click="statistic(scope.row)" type="primary" link>统计</el-button>
      <el-button @click="check(scope.row)" type="primary" link>审核</el-button>
      <el-button @click="handle(scope.row, 'reject')" type="primary" link>驳回</el-button>
    </template>
  </pro-table>

  <!-- 统计 -->
  <statistic-dialog ref="statisticDialogRef" />
  <!-- 审核 -->
  <check-dialog @confirm="confirm" ref="checkDialogRef" />
</template>
