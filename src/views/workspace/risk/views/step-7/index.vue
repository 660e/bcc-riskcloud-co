<script lang="ts" setup>
import { ref } from 'vue';
import SignatureDialog from '@/views/workspace/risk/dialogs/signature.vue';

const imgSrc = ref('');
const signatureDialogRef = ref();
const signature = () => signatureDialogRef.value.open();
const confirm = (dataURL: string) => (imgSrc.value = dataURL);
</script>

<template>
  <div class="card flex-1 p-2.5">
    <el-button @click="signature" type="primary">签字确认</el-button>
    <img v-if="imgSrc" :src="imgSrc" />

    <!-- 签字确认 -->
    <signature-dialog @confirm="confirm" ref="signatureDialogRef" />
  </div>
</template>
