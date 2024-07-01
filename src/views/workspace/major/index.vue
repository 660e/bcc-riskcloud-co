<script lang="ts" setup>
import { ref } from 'vue';
import { companyApi, workspaceApi } from '@/api';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ColumnProps } from '@/components/pro-table/interface';
import ProTable from '@/components/pro-table/index.vue';

const tableRef = ref();
const columns: ColumnProps[] = [
  { prop: 'placeName', label: '场所位置', search: { el: 'input' } },
  { prop: 'riskName', label: '重大风险源名称', search: { el: 'input' } },
  { prop: 'count', label: '数量' },
  { prop: 'type', label: '风险类型' },
  { prop: 'status', label: '状态' },
  { prop: 'docs', label: '应急预案' },
  { prop: 'operation', label: '操作', width: 100 }
];

const remove = (row: any) => {
  ElMessageBox.confirm(`是否删除${row.riskName}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await companyApi.deleteItem(row.id);
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      ElMessage.success(msg);
    })
    .catch(() => false);
};
</script>

<template>
  <div class="h-full card no-card flex flex-col pt-2.5">
    <pro-table :columns="columns" :request-api="workspaceApi.major" ref="tableRef" row-key="id">
      <template #operation="scope">
        <el-button @click="remove(scope.row)" type="primary" link>删除</el-button>
      </template>
    </pro-table>
  </div>
</template>
