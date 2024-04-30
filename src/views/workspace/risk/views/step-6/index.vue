<script lang="ts" setup>
import { ref } from 'vue';
import { ColumnProps } from '@/components/pro-table/interface';
import ProTable from '@/components/pro-table/index.vue';

const columns: ColumnProps[] = [
  { prop: 'type', label: '报告类型' },
  { prop: 'name', label: '报告名称' },
  { prop: 'date', label: '更新时间' },
  { prop: 'status', label: '状态' },
  { prop: 'operation', label: '操作', width: 150 }
];
const data = ref([
  { type: '风险源辨识评估', name: '风险源辨识评估.docx', date: '2024-04-24 16:00', status: '上级单位待审' },
  { type: '应急资源调查', name: '应急资源调查.docx', date: '2024-04-24 16:00', status: '上级单位待审' },
  { type: '应急能力评估', name: '应急能力评估.docx', date: '2024-04-24 16:00', status: '上级单位待审' },
  { type: '汇总报告', name: '汇总报告.docx', date: '2024-04-24 16:00', status: '上级单位待审' }
]);

const generate = () => {
  console.log('generate');
};
const update = (row: any) => {
  console.log(row);
};
const download = (row: any) => {
  console.log(row);
};
</script>

<template>
  <pro-table :columns="columns" :data="data" :pagination="false">
    <template #tableHeader>
      <el-button @click="generate" type="primary">生成汇总报告</el-button>
    </template>
    <template #operation="scope">
      <el-button @click="update(scope.row)" type="primary" link>更新</el-button>
      <el-button @click="download(scope.row)" type="primary" link>下载</el-button>
    </template>
  </pro-table>
</template>
