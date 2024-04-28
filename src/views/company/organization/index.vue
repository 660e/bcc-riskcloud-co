<script lang="ts" setup>
import { ref } from 'vue';

import DeptComponent from './views/dept.vue';
import PostComponent from './views/post.vue';
import StaffComponent from './views/staff.vue';

const active = ref(2);
</script>

<template>
  <el-tabs v-model="active" type="border-card" class="h-full tab-content-flex">
    <dept-component :name="0" label="部门管理" class="pro-table--no-card h-full" lazy />
    <post-component :name="1" label="岗位管理" class="pro-table--no-card h-full" lazy />
    <staff-component :name="2" label="人员管理" class="pro-table--no-card h-full" lazy />
  </el-tabs>
</template>
