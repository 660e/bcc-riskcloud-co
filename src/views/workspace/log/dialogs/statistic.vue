<script lang="ts" setup>
import { ref } from 'vue';
import { System } from '@/api/interface';
import { systemApi, workspaceApi } from '@/api';
import { RiskStatistics } from '@bcc/ui';

const visible = ref(false);
const data = ref();
const open = async () => {
  visible.value = true;

  const dict = (await systemApi.dict('eme_ability')).data;
  data.value = (await workspaceApi.statistics()).data;
  data.value.ability.value = dict.find((d: System.Dict) => d.dictValue === data.value.ability.value)?.dictLabel || '-';
  data.value.diagnosis.value = dict.find((d: System.Dict) => d.dictValue === data.value.diagnosis.value)?.dictLabel || '-';
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
