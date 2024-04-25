<script lang="ts" setup>
import CompanyComponent from './views/company.vue';
import RiskComponent from './views/risk.vue';
import GradingComponent from './views/grading.vue';
import ResourceComponent from './views/resource.vue';
import AbilityComponent from './views/ability.vue';
import ReportComponent from './views/report.vue';
</script>

<template>
  <el-tabs type="border-card" class="h-full tab-content-flex">
    <company-component label="单位信息汇总" lazy />
    <risk-component label="风险源列表" lazy />
    <grading-component label="单位诊断分级列表" lazy />
    <resource-component label="应急资源列表" lazy />
    <ability-component label="应急能力列表" lazy />
    <report-component label="评估报告列表" lazy />
  </el-tabs>
</template>
