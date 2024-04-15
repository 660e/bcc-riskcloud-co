<script lang="ts" setup>
import { ref } from 'vue';
import { getRisks } from '@/api/modules/workspace';

const visible = ref(false);
const risks = ref();

const open = async () => {
  visible.value = true;
  const { data } = await getRisks();
  console.log(data);
  risks.value = data;
};
const close = () => {
  console.log('close');
};
const confirm = () => {
  visible.value = false;
};

open();

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" @close="close" title="风险源" width="1200" align-center>
    <el-tabs type="border-card" tab-position="left" class="_risks">
      <el-tab-pane v-for="risk in risks" :key="risk.id" :label="risk.name">
        <pre>{{ risk.children }}</pre>
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
._risks {
  border: 0;
  height: 80vh;
  :deep(.el-tabs__header) {
    border-bottom: 0;
  }
  :deep(.el-tabs__content) {
    padding: 0;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
