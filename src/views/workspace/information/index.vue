<script lang="ts" setup>
import { ref } from 'vue';

import CompanyComponent from './views/company.vue';
import RiskComponent from './views/risk.vue';
import GradingComponent from './views/grading.vue';
import ResourceComponent from './views/resource.vue';
import AbilityComponent from './views/ability.vue';
import ReportComponent from './views/report.vue';

const active = ref('company');
</script>

<template>
  <el-tabs v-model="active" type="border-card" class="h-full tabs-flex no-card">
    <el-tab-pane name="company" label="单位信息汇总" class="h-full overflow-y-auto flex">
      <company-component v-if="active === 'company'" />
    </el-tab-pane>
    <el-tab-pane name="risk" label="风险源列表" class="h-full flex">
      <risk-component v-if="active === 'risk'" />
    </el-tab-pane>
    <el-tab-pane name="grading" label="单位诊断分级列表" class="h-full flex">
      <grading-component v-if="active === 'grading'" />
    </el-tab-pane>
    <el-tab-pane name="resource" label="应急资源列表" class="h-full flex">
      <resource-component v-if="active === 'resource'" />
    </el-tab-pane>
    <el-tab-pane name="ability" label="应急能力列表" class="h-full flex">
      <ability-component v-if="active === 'ability'" />
    </el-tab-pane>
    <el-tab-pane name="report" label="评估报告列表" class="h-full flex">
      <report-component v-if="active === 'report'" />
    </el-tab-pane>
  </el-tabs>
</template>
