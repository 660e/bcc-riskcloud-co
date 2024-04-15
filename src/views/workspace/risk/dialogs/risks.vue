<script lang="ts" setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { getRisks } from '@/api/modules/workspace';

const visible = ref(false);
const keyword = ref('');
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

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" @close="close" title="风险源" width="70vw" align-center>
    <div class="p-2.5 flex justify-center">
      <el-input v-model="keyword" :prefix-icon="Search" placeholder="搜索风险源" class="_filter w-1/3" clearable />
    </div>
    <el-divider class="m-0" />
    <el-tabs tab-position="left" type="border-card" class="_risks">
      <el-tab-pane v-for="industry in risks" :key="industry.id" :label="industry.name" class="pb-5">
        <template v-for="level in industry.children" :key="level.id">
          <div class="bg-blue-400 pl-2.5 h-8 text-white flex items-center">{{ level.name }}</div>
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
._filter :deep(.el-input__wrapper) {
  border-radius: 9999px;
}
._risks {
  border: 0;
  height: 70vh;
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
