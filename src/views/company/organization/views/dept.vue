<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { deleteItem } from '@/api/modules/company';
import { getEmergencyEquipment } from '@/api/modules/workspace';
import { ColumnProps } from '@/components/pro-table/interface';
import { TreeFilter } from '@bcc/components';

import CreatePostDialog from '../dialogs/create-post.vue';
import ProTable from '@/components/pro-table/index.vue';

const treeFilterValue = reactive({ departmentId: '1' });
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

const changeTreeFilter = (val: string) => {
  ElMessage.success(`你选择了 id 为 ${val} 的数据🤔`);
  treeFilterValue.departmentId = val;
};

const createPostDialogRef = ref();
const create = (row: any = {}) => createPostDialogRef.value.open(row);

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
    <div class="flex">
      <tree-filter
        label="name"
        title="部门列表(单选)"
        :request-api="getEmergencyEquipment"
        :default-value="treeFilterValue.departmentId"
        @change="changeTreeFilter"
      />
      <pro-table :columns="columns" :request-api="getEmergencyEquipment" ref="tableRef" row-key="id">
        <template #tableHeader>
          <el-button @click="create" type="primary">新增</el-button>
          <el-button :disabled="!tableRef?.selectedListIds.length" @click="remove" type="danger" plain>删除</el-button>
        </template>
        <template #operation="scope">
          <el-button @click="remove(scope.row)" type="danger" link>删除</el-button>
        </template>
      </pro-table>

      <!-- 新增 -->
      <create-post-dialog @confirm="tableRef.search() && tableRef.clearSelection()" ref="createPostDialogRef" />
    </div>
  </el-tab-pane>
</template>
