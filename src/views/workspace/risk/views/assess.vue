<script lang="ts" setup>
import FormsComponent from '../components/forms.vue';

const save = () => {
  console.log('save');
};
</script>

<template>
  <div class="card h-full flex flex-col">
    <div class="flex-1 overflow-y-auto pt-5 flex justify-center">
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
