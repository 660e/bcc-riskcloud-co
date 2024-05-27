<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { workspaceApi } from '@/api';
import { RiskStatistics } from '@bcc/ui';
import SignatureDialog from '@/views/workspace/risk/dialogs/signature.vue';

const data = ref();
onMounted(async () => {
  data.value = (await workspaceApi.statistics()).data;
});

const signatureDialogRef = ref();
const signature = () => signatureDialogRef.value.open();
const confirm = (dataURL: string) => console.log(dataURL);
</script>

<template>
  <div class="card flex-auto p-2.5 flex flex-col space-y-2.5">
    <div>
      <el-button @click="signature" type="primary">签字确认</el-button>
    </div>
    <risk-statistics :data="data" class="flex-auto" />

    <!-- 签字确认 -->
    <signature-dialog @confirm="confirm" ref="signatureDialogRef" />
  </div>
</template>
