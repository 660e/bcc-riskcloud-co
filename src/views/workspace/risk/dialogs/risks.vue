<script lang="ts" setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { getRisks } from '@/api/modules/workspace';
import { flattenTree } from '@bcc/utils';

const visible = ref(false);
const keyword = ref('');
const risks = ref();
const checkList = ref<any[]>([]);

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

const counter = (data: any) => {
  return flattenTree(data.children).filter((e: any) => e.checked).length;
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" @close="close" title="风险源" width="80vw" align-center>
    <div class="p-2.5 flex justify-center">
      <el-input v-model="keyword" :prefix-icon="Search" placeholder="搜索风险源" class="_filter w-1/3" clearable />
    </div>
    <el-divider class="m-0" />
    <el-tabs tab-position="left" type="border-card" class="_risks">
      <el-tab-pane v-for="industry in risks" :key="industry.id" class="pb-5">
        <template #label>
          <div class="text-sm flex items-center justify-between w-40 overflow-hidden">
            <span>{{ industry.name }}</span>
            <span
              v-if="counter(industry)"
              class="bg-blue-400 text-white px-2 rounded text-xs flex justify-center items-center self-stretch"
            >
              {{ counter(industry) }}
            </span>
          </div>
        </template>
        <template v-for="level in industry.children" :key="level.id">
          <div class="bg-blue-400 pl-2.5 h-8 text-white flex items-center">{{ level.name }}</div>
          <el-collapse>
            <el-collapse-item
              v-for="group in level.children"
              v-show="group.children.some((place: any) => place.children.some((risk: any) => risk.name.includes(keyword)))"
              :key="group.id"
              class="px-2.5"
            >
              <template #title>
                <div class="flex-1 pr-5 text-sm flex items-center justify-between">
                  <span>{{ group.name }}</span>
                  <span
                    v-if="counter(group)"
                    class="bg-blue-400 text-white px-2 rounded text-xs flex justify-center items-center self-stretch"
                  >
                    {{ counter(group) }}
                  </span>
                </div>
              </template>
              <div
                v-for="place in group.children"
                v-show="place.children.some((risk: any) => risk.name.includes(keyword))"
                :key="place.id"
              >
                <div>{{ place.name }}</div>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox
                    v-for="risk in place.children"
                    v-show="risk.name.includes(keyword)"
                    :key="risk.id"
                    :label="risk.name"
                    :value="risk.id"
                    @change="(value: boolean) => (risk.checked = value)"
                  />
                </el-checkbox-group>
              </div>
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
