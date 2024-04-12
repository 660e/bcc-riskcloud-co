<script lang="ts" setup>
import { ref } from 'vue';
import { getDictDataType } from '@/api/modules/system';
import { getInformationRisk } from '@/api/modules/information';
import { ColumnProps } from '@/components/pro-table/interface';
import { saveAs } from 'file-saver';
import { RiskDetailsDialog } from '@bcc/ui';
import ProTable from '@/components/pro-table/index.vue';
import HistoryComponent from './components/history.vue';

const tableRef = ref();
const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'location', label: '场所位置' },
  { prop: 'riskName', label: '风险源' },
  { prop: 'typeName', label: '风险类型', search: { el: 'input' } },
  { prop: 'levelName', label: '风险等级', search: { el: 'input' } },
  { prop: 'count', label: '数量' },
  { prop: 'statusFlag', label: '状态' },
  { prop: 'operation', label: '操作', width: 100 }
];

const exportData = async () => {
  const blob: any = await getDictDataType({ ...tableRef.value.searchParam, ids: tableRef.value.selectedListIds });
  saveAs(blob, `${new Date().getTime()}.xlsx`);
};

const current = ref();
const confirm = (row: any) => {
  current.value = row;
  tableRef.value.search();
};

const riskDetailsDialogRef = ref();
const view = (row: any) => riskDetailsDialogRef.value.open(row);
</script>

<template>
  <div class="h-full flex flex-col">
    <pro-table :columns="columns" :request-api="getInformationRisk" ref="tableRef" row-key="id">
      <template #tableHeader>
        <div class="flex items-center space-x-2.5">
          <el-button @click="exportData">导出</el-button>
          <history-component @confirm="confirm" />
          <span v-if="current">{{ current.date }}</span>
        </div>
      </template>
      <template #operation="scope">
        <el-button @click="view(scope.row)" type="primary" link>查看</el-button>
      </template>
    </pro-table>

    <!-- 风险源详情 -->
    <risk-details-dialog ref="riskDetailsDialogRef" />
  </div>
</template>
