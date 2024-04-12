<script lang="ts" setup>
import { getLibrary } from '@/api/modules/library';
import { ColumnProps } from '@/components/pro-table/interface';
import ProTable from '@/components/pro-table/index.vue';

const columns: ColumnProps[] = [
  { prop: 'time', label: '时间' },
  { prop: 'provinces', label: '省份', search: { el: 'input' } },
  { prop: 'industryType', label: '一级行业分类', search: { el: 'input' } },
  { prop: 'firstClass', label: '二级行业分类', search: { el: 'input' } },
  { prop: 'secondClass', label: '三级行业分类', search: { el: 'input' } },
  { prop: 'eventDescription', label: '事故描述', search: { el: 'input' } },
  { prop: 'type', label: '类型', search: { el: 'input' } }
];
</script>

<template>
  <div class="h-full flex flex-col">
    <pro-table :columns="columns" :request-api="getLibrary" />
  </div>
</template>
