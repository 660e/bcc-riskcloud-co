<script lang="ts" setup>
import { ref } from 'vue';
import { getWorkspaceStatistics } from '@/api/modules/workspace';
import { RiskStatistics } from '@bcc/ui';

const visible = ref(false);
const data = ref();
const open = async () => {
  visible.value = true;
  data.value = (await getWorkspaceStatistics()).data;
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" @close="data = null" title="历史风险统计" width="1200" destroy-on-close>
    <risk-statistics :data="data" />
    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
