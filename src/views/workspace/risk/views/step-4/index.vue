<script lang="ts" setup>
import { ref } from 'vue';

import EmergencyTeam from './views/team.vue';
import EmergencyExpert from './views/expert.vue';
import EmergencyEquipment from './views/equipment.vue';
import EmergencySupply from './views/supply.vue';

const active = ref(0);
</script>

<template>
  <div class="card flex-1">
    <el-tabs v-model="active" type="border-card" class="workspace__risk__step__tabs--full">
      <emergency-team :name="0" label="应急队伍" class="pro-table--no-card h-full flex" />
      <emergency-expert :name="1" label="应急专家" class="pro-table--no-card h-full flex" />
      <emergency-equipment :name="2" label="应急装备" class="pro-table--no-card h-full flex" />
      <emergency-supply :name="3" label="应急物资" class="pro-table--no-card h-full flex" />
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
@import '../index.scss';
</style>
