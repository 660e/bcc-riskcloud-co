<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getSubordinateAccount } from '@/api/modules/subordinate';
import { deleteItem } from '@/api/modules/company';
import { ColumnProps } from '@/components/pro-table/interface';
import ProTable from '@/components/pro-table/index.vue';

const $emit = defineEmits(['confirm']);

const visible = ref(false);

const tableRef = ref();
const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'placeName', label: '单位名称', search: { el: 'input' } },
  { prop: 'countyName', label: '所属区域', search: { el: 'input' } },
  { prop: 'parentName', label: '上级单位' },
  { prop: 'statusName', label: '状态' },
  { prop: 'operation', label: '操作', width: 100 }
];
const open = async (row: any) => {
  console.log(row);
  visible.value = true;
};

const bind = (row: any = {}) => {
  const name = row.id ? `“${row.placeName}”` : '';
  const ids = row.id ? [row.id] : tableRef.value.selectedListIds;
  ElMessageBox.confirm(`是否关联${name}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await deleteItem(ids.join(','));
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      tableRef.value.clearSelection();
      ElMessage.success(msg);
      $emit('confirm');
    })
    .catch(() => false);
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" title="历史风险列表" width="1200">
    <div class="pro-table--no-card">
      <pro-table :columns="columns" :request-api="getSubordinateAccount" ref="tableRef" row-key="id">
        <template #tableHeader>
          <el-button @click="bind()" :disabled="!tableRef?.selectedListIds.length">关联</el-button>
        </template>
        <template #operation="scope">
          <el-button @click="bind(scope.row)" type="primary" link>关联</el-button>
        </template>
      </pro-table>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
