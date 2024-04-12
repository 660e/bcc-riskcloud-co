<script lang="tsx" setup>
import { ref } from 'vue';
import { getInformationResource } from '@/api/modules/information';
import { ColumnProps } from '@/components/pro-table/interface';
import ProTable from '@/components/pro-table/index.vue';
import TeamDialog from './dialogs/team.vue';

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
  { prop: 'expert', label: '应急专家' },
  { prop: 'equipment', label: '应急装备' },
  { prop: 'supply', label: '应急物资' }
];

const teamDialogRef = ref();
const team = (row: any) => teamDialogRef.value.open(row);
</script>

<template>
  <div class="h-full flex flex-col">
    <pro-table :columns="columns" :request-api="getInformationResource" />

    <!-- 应急队伍 -->
    <team-dialog ref="teamDialogRef" />
  </div>
</template>
