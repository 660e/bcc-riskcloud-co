<script lang="ts" setup>
import { type Component, ref } from 'vue';

import StepsComponent from './components/steps.vue';
import Step1 from './step-1.vue';
import Step2 from './step-2.vue';
import Step3 from './step-3.vue';
import Step4 from './step-4.vue';
import Step5 from './step-5.vue';
import Step6 from './step-6.vue';

const active = ref(1);
const activeComponent: Component[] = [Step1, Step2, Step3, Step4, Step5, Step6];

const prev = () => {
  active.value = active.value - 1;
};
const next = () => {
  if (active.value === 6) {
    console.log('submit');
  } else {
    active.value = active.value + 1;
  }
};
</script>

<template>
  <div class="h-full flex flex-col space-y-2.5">
    <steps-component :active="active" @prev="prev" @next="next" class="card" />
    <div class="card flex-1">
      <component :is="activeComponent[active - 1]" />
    </div>
  </div>
</template>
