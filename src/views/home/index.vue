<script lang="ts" setup>
import { $c } from '@bcc/utils';

console.log($c.encrypt(Math.random()));
</script>

<template>
  <div class="card h-full flex justify-center items-center">
    <div></div>
    <div>/src/views{{ $route.path }}/index.vue</div>
  </div>
</template>
