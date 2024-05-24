<script lang="ts" setup>
import { ref } from 'vue';
import { ColumnProps } from '@/components/pro-table/interface';
import ProTable from '@/components/pro-table/index.vue';

const columns: ColumnProps[] = [
  { prop: 'type', label: '报告类型' },
  { prop: 'name', label: '报告名称' },
  { prop: 'date', label: '更新时间', width: 200 },
  { prop: 'operation', label: '操作', width: 44 * 2 + 24 }
];
const data = ref([
  { id: 1, type: '风险源辨识评估', name: '风险源辨识评估.docx', date: '2024-04-24 16:00' },
  { id: 2, type: '应急资源调查', name: '应急资源调查.docx', date: '2024-04-24 16:00' },
  { id: 3, type: '应急能力评估', name: '应急能力评估.docx', date: '2024-04-24 16:00' }
]);

const generate = () => {
  if (data.value.length === 3) {
    data.value.push({ id: 0, type: '汇总报告', name: '汇总报告.docx', date: '2024-04-24 16:00' });
  }
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
      <el-button v-if="scope.row.id" @click="update(scope.row)" type="primary" link>更新</el-button>
      <el-button @click="download(scope.row)" type="primary" link>下载</el-button>
    </template>
  </pro-table>
</template>
