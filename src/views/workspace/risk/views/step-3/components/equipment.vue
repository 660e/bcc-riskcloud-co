<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getDictDataType } from '@/api/modules/system';
import { deleteItem } from '@/api/modules/company';
import { getEmergencyEquipment } from '@/api/modules/workspace';
import { ColumnProps } from '@/components/pro-table/interface';
import { saveAs } from 'file-saver';

import { ImportTemplateDialog } from '@bcc/components';
import createEquipmentDialog from '../dialogs/create-equipment.vue';
import ProTable from '@/components/pro-table/index.vue';

const tableRef = ref();
const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'type', label: '装备类型' },
  { prop: 'name', label: '装备名称' },
  { prop: 'specification', label: '规格型号' },
  { prop: 'num', label: '数量' },
  { prop: 'source', label: '来源' },
  { prop: 'state', label: '完好情况' },
  { prop: 'func', label: '主要功能' },
  { prop: 'location', label: '存放场所' },
  { prop: 'chief', label: '负责人' },
  { prop: 'phone', label: '联系电话' },
  { prop: 'operation', label: '操作', width: 100 }
];

const createEquipmentDialogRef = ref();
const create = (row: any = {}) => createEquipmentDialogRef.value.open(row);

const importTemplateDialogRef = ref();
const importData = () => {
  importTemplateDialogRef.value.open({
    templateApi: deleteItem,
    templateName: '模板.xlsx',
    importApi: deleteItem
  });
};

const exportData = async () => {
  const blob: any = await getDictDataType({ ...tableRef.value.searchParam, ids: tableRef.value.selectedListIds });
  saveAs(blob, `${new Date().getTime()}.xlsx`);
};

const remove = (row: any) => {
  const name = row.id ? `“${row.name}”` : '';
  const ids = row.id ? [row.id] : tableRef.value.selectedListIds;
  ElMessageBox.confirm(`是否删除${name}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await deleteItem(ids.join(','));
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      tableRef.value.clearSelection();
      ElMessage.success(msg);
    })
    .catch(() => false);
};
</script>

<template>
  <el-tab-pane v-bind="$attrs">
    <pro-table :columns="columns" :request-api="getEmergencyEquipment" ref="tableRef" row-key="id">
      <template #tableHeader>
        <el-button @click="create" type="primary">新增</el-button>
        <el-button @click="importData">导入</el-button>
        <el-button @click="exportData">导出</el-button>
        <el-button :disabled="!tableRef?.selectedListIds.length" @click="remove" type="danger" plain>删除</el-button>
      </template>
      <template #operation="scope">
        <el-button @click="remove(scope.row)" type="danger" link>删除</el-button>
      </template>
    </pro-table>

    <!-- 新增 -->
    <create-equipment-dialog @confirm="tableRef.search() && tableRef.clearSelection()" ref="createEquipmentDialogRef" />
    <!-- 导入 -->
    <import-template-dialog @confirm="tableRef.search() && tableRef.clearSelection()" ref="importTemplateDialogRef" />
  </el-tab-pane>
</template>
