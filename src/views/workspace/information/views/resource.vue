<script lang="tsx" setup>
import { ref } from 'vue';
import { getInformationResource } from '@/api/modules/information';
import { ColumnProps } from '@/components/pro-table/interface';

import ProTable from '@/components/pro-table/index.vue';
import TeamDialog from '../dialogs/team.vue';
import ExpertDialog from '../dialogs/expert.vue';
import EquipmentDialog from '../dialogs/equipment.vue';
import SupplyDialog from '../dialogs/supply.vue';

const columns: ColumnProps[] = [
  { prop: 'date', label: '时间' },
  {
    prop: 'team',
    label: '应急队伍',
    render: scope => (
      <el-button onClick={() => team(scope.row)} type='primary' link>
        {scope.row.team}
      </el-button>
    )
  },
  {
    prop: 'expert',
    label: '应急专家',
    render: scope => (
      <el-button onClick={() => expert(scope.row)} type='primary' link>
        {scope.row.expert}
      </el-button>
    )
  },
  {
    prop: 'equipment',
    label: '应急装备',
    render: scope => (
      <el-button onClick={() => equipment(scope.row)} type='primary' link>
        {scope.row.equipment}
      </el-button>
    )
  },
  {
    prop: 'supply',
    label: '应急物资',
    render: scope => (
      <el-button onClick={() => supply(scope.row)} type='primary' link>
        {scope.row.supply}
      </el-button>
    )
  }
];

const teamDialogRef = ref();
const team = (row: any) => teamDialogRef.value.open(row);
const expertDialogRef = ref();
const expert = (row: any) => expertDialogRef.value.open(row);
const equipmentDialogRef = ref();
const equipment = (row: any) => equipmentDialogRef.value.open(row);
const supplyDialogRef = ref();
const supply = (row: any) => supplyDialogRef.value.open(row);
</script>

<template>
  <el-tab-pane class="h-full pro-table--no-card">
    <pro-table :columns="columns" :request-api="getInformationResource" />

    <!-- 应急队伍 -->
    <team-dialog ref="teamDialogRef" />
    <!-- 应急专家 -->
    <expert-dialog ref="expertDialogRef" />
    <!-- 应急装备 -->
    <equipment-dialog ref="equipmentDialogRef" />
    <!-- 应急物资 -->
    <supply-dialog ref="supplyDialogRef" />
  </el-tab-pane>
</template>
