<script lang="ts" name="login" setup>
import { ref } from 'vue';
import LoginMonitor from './components/monitor.vue';
import LoginPhone from './components/phone.vue';

const current = ref(1);
</script>

<template>
  <div class="h-screen overflow-hidden bg-cover flex justify-center items-center relative _login">
    <div class="relative">
      <div class="w-screen absolute left-1/2 bottom-full -translate-x-1/2 flex justify-center pb-5">
        <img src="@/assets/images/login-title.png" class="h-32" />
      </div>
      <div class="bg-white rounded w-[420px] p-5">
        <div class="flex text-base _tabs">
          <div :class="{ current: current === 0 }" @click="current = 0">验证码登录</div>
          <div :class="{ current: current === 1 }" @click="current = 1">密码登录</div>
        </div>
        <div class="p-5">
          <login-phone v-show="current === 0" />
          <login-monitor v-show="current === 1" />
        </div>
      </div>
    </div>

    <div class="w-full absolute left-0 bottom-5 flex justify-center space-x-5 text-white">
      <span>建设单位：成都市应急管理局</span>
      <span>技术支持：北京市计算中心有限公司</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
._login {
  background-image: url('@/assets/images/login.png');
  ._tabs > div {
    cursor: pointer;
    margin-right: 20px;
    &::after {
      content: '';
      display: block;
      height: 3px;
      width: 100%;
      margin-top: 5px;
      border-radius: 9999px;
    }
    &.current {
      color: var(--el-color-primary);
      &::after {
        background-color: var(--el-color-primary);
      }
    }
  }
}
</style>
