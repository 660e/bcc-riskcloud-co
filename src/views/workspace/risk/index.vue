<script lang="ts" setup>
import { type Component, ref } from 'vue';

import StepsComponent from './components/steps.vue';

import Step1 from './views/step-1/index.vue';
import Step2 from './views/step-2/index.vue';
import Step3 from './views/step-3/index.vue';
import Step4 from './views/step-4/index.vue';
import Step5 from './views/step-5/index.vue';
import Step6 from './views/step-6/index.vue';
import Step7 from './views/step-7/index.vue';

const active = ref(1);
const StepComponent: Component[] = [Step1, Step2, Step3, Step4, Step5, Step6, Step7];

const prev = () => {
  active.value = active.value - 1;
};
const next = () => {
  if (active.value === StepComponent.length) {
    console.log('submit');
  } else {
    active.value = active.value + 1;
  }
};
</script>

<template>
  <div class="h-full flex flex-col space-y-2.5">
    <steps-component :active="active" @prev="prev" @next="next" class="card" />
    <component :is="StepComponent[active - 1]" />
  </div>
</template>
