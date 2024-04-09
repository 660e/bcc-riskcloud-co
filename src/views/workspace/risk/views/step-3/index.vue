<script lang="ts" setup>
import { ref } from 'vue';

import EmergencyTeam from './views/emergency-team.vue';
import EmergencyExpert from './views/emergency-expert.vue';
import EmergencyEquipment from './views/emergency-equipment.vue';
import EmergencySupply from './views/emergency-supply.vue';

const active = ref(0);
</script>

<template>
  <div class="card flex-1">
    <el-tabs v-model="active" type="border-card" class="workspace__risk__step__tabs--full">
      <emergency-team :name="0" label="应急队伍" class="pro-table--no-card h-full flex" lazy />
      <emergency-expert :name="1" label="应急专家" class="pro-table--no-card h-full flex" lazy />
      <emergency-equipment :name="2" label="应急装备" class="pro-table--no-card h-full flex" lazy />
      <emergency-supply :name="3" label="应急物资" class="pro-table--no-card h-full flex" lazy />
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
@import '../index.scss';
</style>
