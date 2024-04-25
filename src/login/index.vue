<script lang="ts" name="login" setup>
import { ref } from 'vue';
import { Monitor, Iphone } from '@element-plus/icons-vue';
import loginImage from '@/assets/images/login.jpg';
import LoginMonitor from './components/monitor.vue';
import LoginPhone from './components/phone.vue';

const title = import.meta.env.VITE_GLOB_APP_TITLE;
const usePhone = ref(false);
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <div class="relative">
      <div class="absolute bottom-full w-full text-center text-3xl pb-5">{{ title }}</div>
      <div class="flex rounded overflow-hidden border border-gray-300 relative">
        <el-image :src="loginImage" fit="cover" class="w-96" />

        <div class="p-10 w-96 relative">
          <el-tooltip :content="`使用${usePhone ? '账号密码' : '手机号'}登录`" placement="right">
            <div
              @click="usePhone = !usePhone"
              class="w-10 h-10 absolute top-0 right-0 flex justify-center items-center cursor-pointer duration-300 hover:bg-gray-200"
              style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0)"
            >
              <el-icon size="36px">
                <component :is="usePhone ? Monitor : Iphone" />
              </el-icon>
            </div>
          </el-tooltip>

          <login-phone v-show="usePhone" />
          <login-monitor v-show="!usePhone" />
        </div>
      </div>
    </div>
  </div>
</template>
