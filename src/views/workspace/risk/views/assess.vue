<script lang="ts" setup>
import { ref } from 'vue';
import FormsComponent from '../components/forms.vue';

const formsComponentRef = ref();
const save = () => {
  formsComponentRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log(formsComponentRef.value.forms);
    }
  });
};
</script>

<template>
  <div class="card h-full flex flex-col">
    <div class="flex-1 overflow-y-auto pt-5">
      <forms-component ref="formsComponentRef">
        <div>Lorem ipsum dolor sit amet.</div>
      </forms-component>
    </div>

    <el-divider class="m-0" />
    <div class="flex justify-center py-2.5">
      <el-button @click="save" type="primary">保存</el-button>
    </div>
  </div>
</template>
