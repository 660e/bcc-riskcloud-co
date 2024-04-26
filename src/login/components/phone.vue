<script lang="ts" name="login-phone" setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { Iphone, FullScreen } from '@element-plus/icons-vue';

const formsRef = ref<FormInstance>();
const forms = reactive({
  phone: '13800138000',
  code: '999999'
});
const rules = reactive<FormRules>({
  phone: [{ required: true, message: '请填写手机号' }],
  code: [{ required: true, message: '请填写验证码' }]
});

const timer = ref();
const remaining = ref(0);
const getCode = (countdown: number) => {
  remaining.value = countdown;
  timer.value = setInterval(() => {
    if (remaining.value) {
      remaining.value--;
      sessionStorage.setItem('timer', String(remaining.value));
    } else {
      clearTimeout(timer.value);
      sessionStorage.removeItem('timer');
    }
  }, 1000);
};

const login = () => {
  formsRef.value?.validate(async valid => {
    if (valid) {
      console.log(forms);
    }
  });
};

onMounted(() => getCode(Number(sessionStorage.getItem('timer')) || 0));
onUnmounted(() => {
  clearTimeout(timer.value);
  sessionStorage.removeItem('timer');
});
</script>

<template>
  <el-form :model="forms" :rules="rules" ref="formsRef" class="space-y-5">
    <el-form-item prop="phone">
      <el-input v-model="forms.phone" :prefix-icon="Iphone" placeholder="手机号" size="large" />
    </el-form-item>
    <div class="flex space-x-5">
      <el-form-item prop="code" class="flex-1" style="margin-bottom: 0">
        <el-input v-model="forms.code" :prefix-icon="FullScreen" placeholder="验证码" size="large" />
      </el-form-item>
      <div v-if="remaining" class="h-10 w-[110px] flex justify-center items-center bg-gray-200 text-gray-500 text-xs rounded">
        {{ remaining }}秒后重新获取
      </div>
      <el-button v-else @click="getCode(60)" size="large">获取验证码</el-button>
    </div>
    <div class="h-10"></div>
    <div class="space-y-2">
      <div class="flex justify-between">
        <div></div>
        <el-button @click="$router.push({ name: 'find-password' })" type="primary" link>忘记密码</el-button>
      </div>
      <el-button @click="login" type="primary" class="w-full" size="large">登录</el-button>
    </div>
  </el-form>
</template>
