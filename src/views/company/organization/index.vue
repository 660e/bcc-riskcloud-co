<script lang="ts" setup>
import { ref } from 'vue';

import DeptComponent from './views/dept.vue';
import PostComponent from './views/post.vue';
import StaffComponent from './views/staff.vue';

const active = ref('dept');
</script>

<template>
  <el-tabs v-model="active" type="border-card" class="h-full tabs-flex no-card">
    <el-tab-pane name="dept" label="部门管理" class="h-full flex">
      <dept-component v-if="active === 'dept'" />
    </el-tab-pane>
    <el-tab-pane name="post" label="岗位管理" class="h-full flex">
      <post-component v-if="active === 'post'" />
    </el-tab-pane>
    <el-tab-pane name="staff" label="人员管理" class="h-full flex">
      <staff-component v-if="active === 'staff'" />
    </el-tab-pane>
  </el-tabs>
</template>
