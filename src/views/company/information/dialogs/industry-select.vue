<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);

const open = (industries: any) => {
  visible.value = true;
  console.log(industries);
};
const confirm = () => {
  visible.value = false;
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" title="选择行业领域" width="800">
    <div class="p-2.5">选择行业领域</div>
    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
