<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getDeptList, deleteDept, getCompanyIndustry } from '@/api/modules/company';
import { ColumnProps } from '@/components/pro-table/interface';

import ProTable from '@/components/pro-table/index.vue';

const active = ref(0);
const industries = ref([
  { label: '城镇公共供水运行', total: 2, done: 1 },
  { label: '城镇排水和污水处理运行', total: 5, done: 0 },
  { label: '水务工程建设', total: 3, done: 0 },
  { label: '水利工程运行', total: 4, done: 2 }
]);

const tableRef = ref();
const createDialogRef = ref();

const columns: ColumnProps[] = [
  { prop: 'deptId', label: '部门编号', width: 100 },
  { prop: 'deptName', label: '部门名称' },
  { prop: 'operation', label: '操作', width: 180 }
];

const create = (row: any = {}) => createDialogRef.value.open(row);
const remove = (row: any) => {
  const name = row.userId ? `“${row.deptName}”` : '';
  const ids = row.userId ? [row.userId] : tableRef.value.selectedListIds;
  ElMessageBox.confirm(`是否删除${name}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await deleteDept(ids.join(','));
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      tableRef.value.clearSelection();
      ElMessage.success(msg);
    })
    .catch(() => false);
};

onMounted(async () => {
  industries.value = (await getCompanyIndustry()).data;
});
</script>

<template>
  <el-tabs v-model="active" type="border-card" class="workspace__risk__step-1__tabs">
    <el-tab-pane
      v-for="(industry, index) in industries"
      :key="index"
      :label="`${industry.label}(${industry.done}/${industry.total})`"
      :name="index"
    >
      <pro-table :columns="columns" :request-api="getDeptList" ref="tableRef" row-key="deptId">
        <template #tableHeader>
          <el-button @click="create" type="primary">新增</el-button>
          <el-button @click="create">导入</el-button>
        </template>
        <template #operation="scope">
          <el-button @click="create(scope.row)" type="primary" link>评估</el-button>
          <el-button @click="create(scope.row)" type="primary" link>复制</el-button>
          <el-button @click="remove(scope.row)" type="danger" link>删除</el-button>
        </template>
      </pro-table>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
