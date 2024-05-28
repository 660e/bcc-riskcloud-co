<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import { SignaturePad } from '@bcc/components';

const $emit = defineEmits(['confirm']);

const visible = ref(false);
const signaturePadRef = ref();
const open = async () => {
  visible.value = true;

  await nextTick();
  signaturePadRef.value.init();
};
const confirm = () => {
  if (!signaturePadRef.value.isEmpty()) {
    $emit('confirm', signaturePadRef.value.toDataURL());
    visible.value = false;
  }
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" title="签字" width="600px">
    <signature-pad ref="signaturePadRef" class="h-80" />
    <template #footer>
      <div class="flex">
        <el-button @click="signaturePadRef.clear()">清空</el-button>
        <el-button @click="signaturePadRef.undo()">撤销</el-button>
        <div class="flex-1"></div>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
