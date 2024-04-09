<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getDictDataType } from '@/api/modules/system';
import { deleteDept, getCompanyIndustry } from '@/api/modules/company';
import { getRiskByIndustryId } from '@/api/modules/workspace';
import { ColumnProps } from '@/components/pro-table/interface';

import ProTable from '@/components/pro-table/index.vue';

const industryId = ref('');
const industries = ref();

const tableRef = ref();
const columns: ColumnProps[] = [
  { prop: 'sourceName', label: '风险源' },
  { prop: 'deptId', label: '风险类型' },
  {
    prop: 'levelName',
    label: '风险等级',
    enum: () => getDictDataType('risk_level_name'),
    search: { el: 'select' },
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    width: 100
  },
  {
    prop: 'statusFlag',
    label: '状态',
    enum: () => getDictDataType('assess_status'),
    search: { el: 'select' },
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    width: 100
  },
  { prop: 'operation', label: '操作', width: 180 }
];
const requestApi = (params: any) => {
  params.industryId = industryId.value;
  return getRiskByIndustryId(params);
};
onMounted(async () => {
  industries.value = (await getCompanyIndustry()).data;
  if (industries.value.length) {
    industryId.value = industries.value[0].id;
    tableRef.value.search(tableRef.value.pageable?.pageNum);
  }
});

const createDialogRef = ref();
const create = (row: any = {}) => createDialogRef.value.open(row);

const remove = (row: any) => {
  const name = row.id ? `“${row.sourceName}”` : '';
  const ids = row.id ? [row.id] : tableRef.value.selectedListIds;
  ElMessageBox.confirm(`是否删除${name}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await deleteDept(ids.join(','));
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      tableRef.value.clearSelection();
      ElMessage.success(msg);
    })
    .catch(() => false);
};
</script>

<template>
  <div class="card flex-1 flex flex-col">
    <el-tabs
      v-model="industryId"
      @tab-change="tableRef.search(tableRef.pageable?.pageNum)"
      type="border-card"
      class="no-tab-pane"
    >
      <el-tab-pane
        v-for="industry in industries"
        :key="industry.id"
        :label="`${industry.label}(${industry.done}/${industry.total})`"
        :name="industry.id"
      />
    </el-tabs>
    <div class="pro-table--no-card">
      <pro-table :columns="columns" :request-api="requestApi" :request-auto="false" ref="tableRef" row-key="id">
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
    </div>
  </div>
</template>
