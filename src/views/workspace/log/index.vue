<script lang="tsx" setup>
import { ref } from 'vue';
import { getWorkspaceLog } from '@/api/modules/workspace';
import { ColumnProps } from '@/components/pro-table/interface';

import ProTable from '@/components/pro-table/index.vue';
import DetailDialog from './dialogs/detail.vue';
import StatisticDialog from './dialogs/statistic.vue';

const columns: ColumnProps[] = [
  {
    prop: 'level1',
    label: '低',
    render: scope => (
      <el-button onClick={() => detail(scope.row)} type='primary' link>
        {scope.row.level1}
      </el-button>
    )
  },
  { prop: 'level2', label: '一般' },
  { prop: 'level3', label: '较大' },
  { prop: 'level4', label: '重大' },
  { prop: 'expert', label: '应急专家' },
  { prop: 'teams', label: '应急队伍' },
  { prop: 'equipment', label: '应急装备' },
  { prop: 'goods', label: '应急物资' },
  { prop: 'abilityLevelName', label: '应急能力' },
  { prop: 'date', label: '上报时间' },
  { prop: 'status', label: '审核状态' },
  { prop: 'operation', label: '操作', width: 100 }
];

const detailDialogRef = ref();
const detail = (row: any) => detailDialogRef.value.open(row);

const statisticDialogRef = ref();
const statistic = (row: any) => statisticDialogRef.value.open(row);
</script>

<template>
  <pro-table :columns="columns" :request-api="getWorkspaceLog">
    <template #operation="scope">
      <el-button @click="statistic(scope.row)" type="primary" link>统计</el-button>
    </template>
  </pro-table>

  <!-- 详情 -->
  <detail-dialog ref="detailDialogRef" />
  <!-- 统计 -->
  <statistic-dialog ref="statisticDialogRef" />
</template>
