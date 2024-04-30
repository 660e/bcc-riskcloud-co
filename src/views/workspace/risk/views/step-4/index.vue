<script lang="ts" setup>
import { ref } from 'vue';

import EmergencyTeam from './views/team.vue';
import EmergencyExpert from './views/expert.vue';
import EmergencyEquipment from './views/equipment.vue';
import EmergencySupply from './views/supply.vue';

const active = ref(0);
</script>

<template>
  <el-tabs v-model="active" type="border-card" class="flex-1 tabs-flex no-card">
    <emergency-team :name="0" label="应急队伍" class="h-full" lazy />
    <emergency-expert :name="1" label="应急专家" class="h-full" lazy />
    <emergency-equipment :name="2" label="应急装备" class="h-full" lazy />
    <emergency-supply :name="3" label="应急物资" class="h-full" lazy />
  </el-tabs>
</template>
