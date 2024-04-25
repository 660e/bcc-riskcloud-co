<script lang="ts" setup>
import { ref } from 'vue';
import { getInformationReportById } from '@/api/modules/information';
import { ColumnProps } from '@/components/pro-table/interface';
import ProTable from '@/components/pro-table/index.vue';

const visible = ref(false);

const columns: ColumnProps[] = [
  { prop: 'name', label: '评估报告' },
  { prop: 'date', label: '上传时间' },
  { prop: 'operation', label: '操作', width: 100 }
];

const open = (row: any) => {
  console.log(row);
  visible.value = true;
};

const download = (row: any) => {
  console.log(row);
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" title="报告列表" width="1200" align-center>
    <div class="pro-table--no-card">
      <pro-table :columns="columns" :request-api="getInformationReportById">
        <template #operation="scope">
          <el-button @click="download(scope.row)" type="primary" link>下载</el-button>
        </template>
      </pro-table>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
