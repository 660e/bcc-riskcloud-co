<script lang="ts" name="find-password" setup>
import { computed, reactive, ref } from 'vue';
import { LOGIN_URL } from '@/config';

const active = ref(0);
const forms = reactive({
  username: '',
  password: '',
  checkPassword: '',
  code: ''
});
const disabled = computed(() => {
  switch (active.value) {
    case 0:
      return !forms.username.trim();
    case 1:
      return !(forms.password && forms.checkPassword && forms.code && forms.password === forms.checkPassword);
    default:
      return true;
  }
});
const next = () => {
  active.value++;
};
</script>

<template>
  <div class="h-screen flex justify-center">
    <div class="py-20 space-y-10 w-[400px]">
      <el-steps :active="active" align-center>
        <el-step title="确认账号" />
        <el-step title="重置密码" />
        <el-step title="重置成功" />
      </el-steps>

      <div v-if="active < 2" class="space-y-5">
        <el-input v-model="forms.username" :readonly="active === 1" size="large">
          <template #prepend>
            <div class="w-20">手机号/邮箱</div>
          </template>
        </el-input>

        <template v-if="active === 1">
          <el-input v-model="forms.password" size="large" type="password" show-password>
            <template #prepend>
              <div class="w-20">新密码</div>
            </template>
          </el-input>
          <el-input v-model="forms.checkPassword" size="large" type="password" show-password>
            <template #prepend>
              <div class="w-20">确认密码</div>
            </template>
          </el-input>
          <el-input v-model="forms.code" size="large">
            <template #prepend>
              <div class="w-20">验证码</div>
            </template>
          </el-input>
        </template>

        <el-button :disabled="disabled" @click="next" type="primary" class="w-full" size="large">下一步</el-button>
      </div>

      <div v-else>
        <el-result icon="success" title="重置成功" sub-title="请跳转至登录页面重新登录">
          <template #extra>
            <el-button @click="$router.push({ path: LOGIN_URL })" type="primary">登录</el-button>
          </template>
        </el-result>
      </div>
    </div>
  </div>
</template>
