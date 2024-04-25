<script lang="ts" name="login" setup>
import loginImage from '@/assets/images/login.jpg';
import LoginForm from './components/form.vue';
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <div class="flex rounded overflow-hidden border border-gray-300">
      <el-image :src="loginImage" fit="cover" class="w-96" />
      <login-form class="w-96" />
    </div>
  </div>
</template>
