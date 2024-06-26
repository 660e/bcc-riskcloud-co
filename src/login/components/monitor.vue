<script lang="ts" name="login-monitor" setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { FormInstance, FormRules } from 'element-plus';
import { FullScreen, Lock, User } from '@element-plus/icons-vue';
import { getCode, loginApi } from '@/api/modules/login';
import { useUserStore } from '@/stores/modules/user';
import { useTabsStore } from '@/stores/modules/tabs';
import { useKeepAliveStore } from '@/stores/modules/keep-alive';
import { initDynamicRouter } from '@/routers/modules/dynamicRouter';
import { HOME_URL } from '@/config';

const $router = useRouter();
const $userStore = useUserStore();
const $tabsStore = useTabsStore();
const $keepAliveStore = useKeepAliveStore();

const formsRef = ref<FormInstance>();
const forms = reactive({
  username: 'co_admin',
  password: '123456',
  code: '9999',
  uuid: ''
});
const rules = reactive<FormRules>({
  username: [{ required: true, message: '请填写账号' }],
  password: [{ required: true, message: '请填写密码' }],
  code: [{ required: true, message: '请填写验证码' }]
});
const codeImage = ref('');
const refreshCode = async () => {
  const response: any = await getCode();
  codeImage.value = `data:image/gif;base64,${response.img}`;
  forms.uuid = response.uuid;
};
const login = () => {
  formsRef.value?.validate(async valid => {
    if (valid) {
      // 执行登录接口
      const { data } = await loginApi(forms);
      $userStore.setToken(data.access_token);

      // 添加动态路由
      await initDynamicRouter();

      // 清空 tabs、keep-alive 数据
      $tabsStore.setTabs([]);
      $keepAliveStore.setKeepAliveName([]);

      // 跳转到首页
      $router.push(HOME_URL);
    }
  });
};

onMounted(() => refreshCode());
</script>

<template>
  <el-form :model="forms" :rules="rules" @keyup.enter="login" ref="formsRef" class="space-y-5">
    <el-form-item prop="username">
      <el-input v-model="forms.username" :prefix-icon="User" placeholder="账号" size="large" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="forms.password" :prefix-icon="Lock" placeholder="密码" size="large" type="password" show-password />
    </el-form-item>
    <div class="flex space-x-5">
      <el-form-item prop="code" class="flex-1" style="margin-bottom: 0">
        <el-input v-model="forms.code" :prefix-icon="FullScreen" placeholder="验证码" size="large" />
      </el-form-item>
      <el-image :src="codeImage" @click="refreshCode" class="cursor-pointer h-10" />
    </div>
    <div class="space-y-2">
      <el-button @click="login" type="primary" class="w-full" size="large">登录</el-button>
      <div class="flex">
        <span>忘记密码？</span>
        <el-button @click="$router.push({ name: 'find-password' })" type="primary" link>立即找回</el-button>
        <div class="flex-1"></div>
        <span>没有账号？</span>
        <el-button @click="$router.push({ name: 'register' })" type="primary" link>立即注册</el-button>
      </div>
    </div>
  </el-form>
</template>
