<script lang="ts" setup>
import { ref } from 'vue';
import { getWorkspaceLog } from '@/api/modules/workspace';
import { ColumnProps } from '@/components/pro-table/interface';

import ProTable from '@/components/pro-table/index.vue';

const tableRef = ref();
const columns: ColumnProps[] = [
  { prop: 'level1', label: '低' },
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

const view = (row: any) => console.log(row);
</script>

<template>
  <pro-table :columns="columns" :request-api="getWorkspaceLog" ref="tableRef" row-key="id" :tool-button="false">
    <template #operation="scope">
      <el-button @click="view(scope.row)" type="primary" link>查看</el-button>
    </template>
  </pro-table>
</template>
