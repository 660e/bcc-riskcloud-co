<script lang="tsx" setup>
import { ref } from 'vue';
import { ColumnProps } from '@/components/pro-table/interface';
import { systemApi, workspaceApi } from '@/api';
import ProTable from '@/components/pro-table/index.vue';
import DetailDialog from './dialogs/detail.vue';
import StatisticDialog from './dialogs/statistic.vue';

const columns: ColumnProps[] = [
  {
    prop: 'count',
    label: '风险源数量',
    headerAlign: 'center',
    _children: [
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
      { prop: 'level4', label: '重大' }
    ]
  },
  {
    prop: 'resource',
    label: '应急资源',
    headerAlign: 'center',
    _children: [
      { prop: 'expert', label: '应急专家' },
      { prop: 'teams', label: '应急队伍' },
      { prop: 'equipment', label: '应急装备' },
      { prop: 'goods', label: '应急物资' }
    ]
  },
  {
    prop: 'abilityLevelName',
    label: '应急能力',
    enum: () => systemApi.dict('eme_ability'),
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    width: 100
  },
  {
    prop: 'diagnosis',
    label: '诊断分级',
    enum: () => systemApi.dict('eme_diagnosis'),
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    width: 100
  },
  { prop: 'date', label: '上报时间', width: 200 },
  {
    prop: 'status',
    label: '审核状态',
    enum: () => systemApi.dict('audit_status'),
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    width: 150
  },
  { prop: 'operation', label: '操作', width: 44 + 24 }
];

const detailDialogRef = ref();
const detail = (row: any) => detailDialogRef.value.open(row);

const statisticDialogRef = ref();
const statistic = (row: any) => statisticDialogRef.value.open(row);
</script>

<template>
  <pro-table :columns="columns" :request-api="workspaceApi.log">
    <template #operation="scope">
      <el-button @click="statistic(scope.row)" type="primary" link>查看</el-button>
    </template>
  </pro-table>

  <!-- 详情 -->
  <detail-dialog ref="detailDialogRef" />
  <!-- 统计 -->
  <statistic-dialog ref="statisticDialogRef" />
</template>
