<script lang="ts" name="find-password" setup>
import { reactive, ref } from 'vue';

const active = ref(0);
const forms = reactive({
  username: '',
  password: '',
  checkPassword: '',
  code: ''
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

      <div class="space-y-5">
        <el-input v-model="forms.username" :readonly="active === 1" size="large">
          <template #prepend>
            <div class="w-20">手机号/邮箱</div>
          </template>
        </el-input>

        <template v-if="active === 1">
          <el-input v-model="forms.password" size="large">
            <template #prepend>
              <div class="w-20">新密码</div>
            </template>
          </el-input>
          <el-input v-model="forms.checkPassword" size="large">
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

        <el-button :disabled="!forms.username" @click="next" type="primary" class="w-full" size="large">下一步</el-button>
      </div>
    </div>
  </div>
</template>
