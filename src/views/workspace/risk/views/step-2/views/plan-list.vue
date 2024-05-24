<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { companyApi, workspaceApi } from '@/api';
import PlanMarker from './plan-marker.vue';
import image from '../bg.jpg';

const isList = ref(true);
const planId = ref();
const planList = ref();

onMounted(() => list());
watch(isList, n => n && list());

const list = async () => {
  planList.value = (await workspaceApi.plan()).data;
};
const mark = (id: string) => {
  isList.value = false;
  planId.value = id;
};
const remove = (id: string) => {
  ElMessageBox.confirm('是否删除', '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await companyApi.deleteItem(id);
      list();
      ElMessage.success(msg);
    })
    .catch(() => false);
};
</script>

<template>
  <div v-if="isList" class="flex-auto overflow-y-auto">
    <div class="p-2.5 flex flex-wrap">
      <div v-for="plan in planList" :key="plan.id" class="m-2.5 relative">
        <el-image :src="image" fit="cover" class="block w-80 h-40" />
        <div class="absolute z-10 inset-0 bg-black/50 flex justify-center items-center opacity-0 duration-300 hover:opacity-100">
          <el-button @click="mark(plan.id)" type="primary" plain>标注</el-button>
          <el-button @click="remove(plan.id)" type="danger" plain>删除</el-button>
        </div>
      </div>
      <el-upload :show-file-list="false" action="#" class="m-2.5 bg-gray-200 opacity-50 duration-300 hover:opacity-100">
        <el-icon class="w-80 h-40 text-gray-500 text-3xl"><Plus /></el-icon>
      </el-upload>
    </div>
  </div>

  <plan-marker v-else :plan-id="planId" @back="isList = true" />
</template>
