<script lang="ts" setup>
import { ref } from 'vue';
import { getWorkspaceOnline } from '@/api/modules/workspace';
import { ColumnProps } from '@/components/pro-table/interface';

import ProTable from '@/components/pro-table/index.vue';
import DetailDialog from './dialogs/detail.vue';

const tableRef = ref();
const columns: ColumnProps[] = [
  { prop: 'placeName', label: '单位名称', search: { el: 'input' } },
  { prop: 'countyName', label: '行政区划', search: { el: 'input' } },
  { prop: 'secondName', label: '行业领域' },
  { prop: 'officeName', label: '行业管理部门' },
  { prop: 'isSmallName', label: '企业规模' },
  { prop: 'oot', label: '数据来源' },
  { prop: 'statusName', label: '账号审核状态' },
  { prop: 'checkStatusName', label: '核查状态' },
  { prop: 'checkOfficeName', label: '核查机构' },
  { prop: 'checkPersonnelName', label: '核查人' },
  { prop: 'checkTime', label: '核查时间' },
  { prop: 'allSource', label: '总得分' },
  { prop: 'operation', label: '操作', width: 100 }
];

const detailDialogRef = ref();
const detail = (row: any) => detailDialogRef.value.open(row);
</script>

<template>
  <div class="h-full card no-card flex flex-col pt-2.5">
    <pro-table :columns="columns" :request-api="getWorkspaceOnline" ref="tableRef" row-key="id">
      <template #operation="scope">
        <el-button @click="detail(scope.row)" type="primary" link>查看</el-button>
      </template>
    </pro-table>

    <!-- 详情 -->
    <detail-dialog ref="detailDialogRef" />
  </div>
</template>
