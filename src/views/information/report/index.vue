<script lang="ts" setup>
import { ref } from 'vue';
import { getSubordinateAccount } from '@/api/modules/subordinate';
import { ColumnProps } from '@/components/pro-table/interface';

import ProTable from '@/components/pro-table/index.vue';

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
  { prop: 'operation', label: '操作', width: 200 }
];

const view = (row: any) => console.log(row);
</script>

<template>
  <div class="h-full flex flex-col">
    <pro-table :columns="columns" :request-api="getSubordinateAccount" ref="tableRef" row-key="id">
      <template #tableHeader>
        <el-button type="primary">新增</el-button>
        <el-button>核销</el-button>
        <el-button>关联下属公司</el-button>
      </template>
      <template #operation="scope">
        <el-button @click="view(scope.row)" type="primary" link>修改</el-button>
        <el-button @click="view(scope.row)" type="primary" link>解除上下级关系</el-button>
      </template>
    </pro-table>
  </div>
</template>
