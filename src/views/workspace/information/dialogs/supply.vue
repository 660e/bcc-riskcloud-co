<script lang="ts" setup>
import { ref } from 'vue';
import { workspaceApi } from '@/api';
import { ColumnProps } from '@/components/pro-table/interface';
import ProTable from '@/components/pro-table/index.vue';

const visible = ref(false);

const columns: ColumnProps[] = [
  { prop: 'name', label: '队伍名称', search: { el: 'input' } },
  { prop: 'type', label: '队伍类型', search: { el: 'input' } },
  { prop: 'establishTime', label: '成立时间' },
  { prop: 'address', label: '地址' },
  { prop: 'stuffNum', label: '总人数' },
  { prop: 'chief', label: '负责人' },
  { prop: 'phone', label: '值班电话' }
];

const open = (row: any) => {
  console.log(row);
  visible.value = true;
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" title="应急物资" width="1200">
    <div class="pt-2.5">
      <pro-table :columns="columns" :request-api="workspaceApi.informationResourceById" />
    </div>

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
