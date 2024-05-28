<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { System } from '@/api/interface';
import { systemApi, workspaceApi } from '@/api';
import { RiskStatistics } from '@bcc/ui';
import SignatureDialog from '@/views/workspace/risk/dialogs/signature.vue';

const data = ref();
onMounted(async () => {
  const dict = (await systemApi.dict('eme_ability')).data;
  data.value = (await workspaceApi.statistics()).data;
  data.value.ability.value = dict.find((d: System.Dict) => d.dictValue === data.value.ability.value)?.dictLabel || '-';
  data.value.diagnosis.value = dict.find((d: System.Dict) => d.dictValue === data.value.diagnosis.value)?.dictLabel || '-';
});

const signatureDialogRef = ref();
const signature = () => signatureDialogRef.value.open();
const confirm = (dataURL: string) => console.log(dataURL);
</script>

<template>
  <div class="card flex-auto h-0 p-2.5 flex flex-col space-y-2.5">
    <div>
      <el-button @click="signature" type="primary">签字确认</el-button>
    </div>
    <risk-statistics :data="data" class="flex-auto" />

    <!-- 签字确认 -->
    <signature-dialog @confirm="confirm" ref="signatureDialogRef" />
  </div>
</template>
