<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { deleteItem } from '@/api/modules/company';

const $emit = defineEmits(['confirm']);

const visible = ref(false);
const id = ref();
const open = async (row: any) => {
  id.value = row.id;
  visible.value = true;
};
const confirm = (cmd: 'approve' | 'reject') => {
  let fn: any;

  switch (cmd) {
    case 'approve':
      fn = deleteItem;
      break;
    case 'reject':
      fn = deleteItem;
      break;
  }

  ElMessageBox.confirm('是否处理？', '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await fn(id.value);
      ElMessage.success(msg);
      $emit('confirm');
      visible.value = false;
    })
    .catch(() => false);
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" title="审核" width="800">
    <div>审核</div>

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">取消</el-button>
        <el-button @click="confirm('approve')">驳回</el-button>
        <el-button @click="confirm('reject')" type="primary">通过</el-button>
      </div>
    </template>
  </el-dialog>
</template>
