<script lang="ts" setup>
import { ref } from 'vue';
import { getInformationRiskById } from '@/api/modules/workspace';
import { ColumnProps } from '@/components/pro-table/interface';
import ProTable from '@/components/pro-table/index.vue';

const $emit = defineEmits(['confirm']);

const dropdownRef = ref();
const visibleChange = (visible: boolean) => {
  if (visible) tableRef.value.search();
};

const tableRef = ref();
const columns: ColumnProps[] = [
  { prop: 'level4', label: '重大', width: 100 },
  { prop: 'level3', label: '较大', width: 100 },
  { prop: 'level2', label: '一般', width: 100 },
  { prop: 'level1', label: '低', width: 100 },
  { prop: 'date', label: '上报时间', width: 300 },
  { prop: 'operation', label: '操作', width: 120 }
];
const view = (row: any) => {
  $emit('confirm', row);
  dropdownRef.value.handleClose();
};
</script>

<template>
  <el-dropdown @visible-change="visibleChange" ref="dropdownRef" trigger="click" placement="bottom-start">
    <el-button>
      <span>历次上报记录</span>
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <pro-table
        :columns="columns"
        :request-api="getInformationRiskById"
        :request-auto="false"
        :tool-button="false"
        ref="tableRef"
        row-key="id"
      >
        <template #operation="scope">
          <el-button @click="view(scope.row)" type="primary" link>查看</el-button>
        </template>
      </pro-table>
    </template>
  </el-dropdown>
</template>
