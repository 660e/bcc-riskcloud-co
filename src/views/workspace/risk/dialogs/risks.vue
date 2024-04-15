<script lang="ts" setup>
import { ref } from 'vue';
import { getRisks } from '@/api/modules/workspace';

const visible = ref(false);
const risks = ref();
const checkList = ref([]);

const open = async () => {
  visible.value = true;
  risks.value = (await getRisks()).data;
};
const close = () => {
  console.log('close');
};
const confirm = () => {
  console.log(checkList.value);
};

open();

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" @close="close" title="风险源" width="80vw" align-center>
    <el-tabs tab-position="left" type="border-card" class="_risks">
      <el-tab-pane v-for="industry in risks" :key="industry.id" :label="industry.name" class="pb-5">
        <template v-for="level in industry.children" :key="level.id">
          <div class="bg-blue-400 pl-2.5 text-white flex items-center" style="height: 38px">{{ level.name }}</div>
          <el-collapse>
            <el-collapse-item v-for="group in level.children" :key="group.id" :title="group.name" class="px-2.5">
              <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="risk in group.children" :key="risk.id" :label="risk.name" :value="risk.id" />
              </el-checkbox-group>
            </el-collapse-item>
          </el-collapse>
        </template>
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
