<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);

const open = async (row: any) => {
  console.log(row);
  visible.value = true;
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" title="历史风险统计" width="1200">
    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
