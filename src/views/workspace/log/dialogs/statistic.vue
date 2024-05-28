<script lang="ts" setup>
import { ref } from 'vue';
import { workspaceApi } from '@/api';
import { RiskStatistics } from '@bcc/ui';

const visible = ref(false);
const data = ref();
const open = async () => {
  visible.value = true;
  data.value = (await workspaceApi.statistics()).data;
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" @close="data = null" title="历史风险统计" width="1500" destroy-on-close>
    <div class="p-2.5">
      <risk-statistics :data="data" />
    </div>

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
