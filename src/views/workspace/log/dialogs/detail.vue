<script lang="ts" setup>
import { ref } from 'vue';
import { getWorkspaceLog } from '@/api/modules/workspace';
import { ColumnProps } from '@/components/pro-table/interface';
import ProTable from '@/components/pro-table/index.vue';

const visible = ref(false);
const columns: ColumnProps[] = [
  { prop: 'expert', label: '应急专家' },
  { prop: 'teams', label: '应急队伍' },
  { prop: 'equipment', label: '应急装备' },
  { prop: 'goods', label: '应急物资' },
  { prop: 'abilityLevelName', label: '应急能力' }
];
const open = async (row: any) => {
  console.log(row);
  visible.value = true;
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" title="历史风险列表" width="1200">
    <div class="pro-table--no-card">
      <pro-table :columns="columns" :request-api="getWorkspaceLog" :tool-button="false" />
    </div>
    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
