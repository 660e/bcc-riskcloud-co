<script lang="ts" setup>
import { ref } from 'vue';

const $emit = defineEmits(['confirm']);

const visible = ref(false);
const item = ref();
const open = async (row: any) => {
  item.value = row;
  visible.value = true;
};
const confirm = (params: any) => {
  $emit('confirm', params);
  visible.value = false;
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" title="审核" width="800">
    <div>审核</div>

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">取消</el-button>
        <el-button @click="confirm({ row: item, cmd: 'approve' })">驳回</el-button>
        <el-button @click="confirm({ row: item, cmd: 'reject' })" type="primary">通过</el-button>
      </div>
    </template>
  </el-dialog>
</template>
