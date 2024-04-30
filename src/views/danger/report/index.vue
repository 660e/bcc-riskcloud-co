<script lang="tsx" setup>
import { ref } from 'vue';
import { getDangerReport } from '@/api/modules/danger';
import { getDictDataType } from '@/api/modules/system';
import { ColumnProps } from '@/components/pro-table/interface';
import { SimpleTabs } from '@bcc/components';
import ProTable from '@/components/pro-table/index.vue';
import DetailDialog from './dialogs/detail.vue';

const tableRef = ref();
const columns: ColumnProps[] = [
  { prop: 'name', label: '隐患名称', search: { el: 'input' } },
  {
    prop: 'status',
    label: '隐患状态',
    search: { el: 'select' },
    enum: () => getDictDataType('danger_status'),
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    render: scope => {
      switch (scope.row.status) {
        case '0':
          return <el-tag type='success'>整改中</el-tag>;
        case '1':
          return <el-tag type='danger'>超期未整改</el-tag>;
        case '2':
          return <el-tag type='primary'>已整改</el-tag>;
      }
    }
  },
  {
    prop: 'type',
    label: '隐患类型',
    enum: () => getDictDataType('danger_type'),
    fieldNames: { label: 'dictLabel', value: 'dictValue' }
  },
  {
    prop: 'level',
    label: '隐患等级',
    enum: () => getDictDataType('danger_level'),
    fieldNames: { label: 'dictLabel', value: 'dictValue' }
  },
  { prop: 'startTime', label: '整改开始时间' },
  { prop: 'endTime', label: '整改期限' },
  { prop: 'operation', label: '操作', width: 120 }
];

const tabs = [
  { label: '当前隐患', value: 0 },
  { label: '历史隐患', value: 1 }
];
const tabChange = (value: number) => {
  console.log(value);
};

const create = () => {
  console.log('create');
};

const detailDialogRef = ref();
const detail = (row: any) => detailDialogRef.value.open(row);
</script>

<template>
  <div class="h-full flex flex-col">
    <pro-table :columns="columns" :request-api="getDangerReport" ref="tableRef" row-key="id">
      <template #tableHeader>
        <el-button @click="create" type="primary">新增</el-button>
      </template>
      <template #tabs>
        <simple-tabs :tabs="tabs" @change="tabChange" />
      </template>
      <template #operation="scope">
        <el-button @click="detail(scope.row)" type="primary" link>整改</el-button>
        <el-button @click="detail(scope.row)" type="primary" link>查看</el-button>
      </template>
    </pro-table>

    <!-- 详情 -->
    <detail-dialog ref="detailDialogRef" />
  </div>
</template>
