<script lang="tsx" setup>
import { ref } from 'vue';
import { getWorkspaceLog } from '@/api/modules/workspace';
import { ColumnProps } from '@/components/pro-table/interface';
import { getDictDataType } from '@/api/modules/system';
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
  {
    prop: 'abilityLevelName',
    label: '应急能力',
    enum: () => getDictDataType('eme_ability'),
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    render: scope => {
      switch (scope.row.status) {
        case '1':
          return <el-tag type='success'>优</el-tag>;
        case '2':
          return <el-tag type='primary'>良</el-tag>;
        case '3':
          return <el-tag type='info'>一般</el-tag>;
        case '4':
          return <el-tag type='warning'>较差</el-tag>;
        case '5':
          return <el-tag type='danger'>差</el-tag>;
      }
    },
    width: 100
  },
  { prop: 'date', label: '上报时间', width: 200 },
  { prop: 'status', label: '审核状态' },
  { prop: 'operation', label: '操作', width: 44 + 24 }
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
