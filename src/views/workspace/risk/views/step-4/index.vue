<script lang="ts" setup>
import { ref } from 'vue';

import EmergencyTeam from './views/team.vue';
import EmergencyExpert from './views/expert.vue';
import EmergencyEquipment from './views/equipment.vue';
import EmergencySupply from './views/supply.vue';

const active = ref('team');
</script>

<template>
  <el-tabs v-model="active" type="border-card" class="flex-1 h-0 tabs-flex no-card">
    <el-tab-pane label="应急队伍" name="team" class="h-full flex pt-2.5">
      <emergency-team v-if="active === 'team'" />
    </el-tab-pane>
    <el-tab-pane label="应急专家" name="expert" class="h-full flex pt-2.5">
      <emergency-expert v-if="active === 'expert'" />
    </el-tab-pane>
    <el-tab-pane label="应急装备" name="equipment" class="h-full flex pt-2.5">
      <emergency-equipment v-if="active === 'equipment'" />
    </el-tab-pane>
    <el-tab-pane label="应急物资" name="supply" class="h-full flex pt-2.5">
      <emergency-supply v-if="active === 'supply'" />
    </el-tab-pane>
  </el-tabs>
</template>
