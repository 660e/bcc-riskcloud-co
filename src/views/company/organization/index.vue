<script lang="ts" setup>
import { ref } from 'vue';

import DeptComponent from './views/dept.vue';
import PostComponent from './views/post.vue';
import StaffComponent from './views/staff.vue';

const active = ref(0);
</script>

<template>
  <el-tabs v-model="active" type="border-card" class="h-full tabs-flex no-card">
    <dept-component :name="0" label="部门管理" lazy />
    <post-component :name="1" label="岗位管理" lazy />
    <staff-component :name="2" label="人员管理" lazy />
  </el-tabs>
</template>
