<script lang="ts" setup>
import { withDefaults } from 'vue';

withDefaults(defineProps<{ active: number }>(), { active: 1 });
defineEmits(['next', 'prev']);
</script>

<template>
  <div class="flex p-2.5">
    <div class="w-40">
      <el-button v-if="active > 1" @click="$emit('prev')" type="primary">
        <el-icon><ArrowLeftBold /></el-icon>
        <div class="pl-1">上一步</div>
      </el-button>
    </div>
    <div class="flex-1 flex justify-center">
      <div
        v-for="(e, i) in ['风险源辨识评估', '风险源标注', '应急资源调查', '应急能力评估', '生成评估信息', '签字确认']"
        :key="i"
        :class="{ 'text-red-600': active > i }"
      >
        <span>{{ i + 1 }}</span>
        <span>{{ e }}</span>
      </div>
    </div>
    <div class="w-40 flex justify-end">
      <el-button @click="$emit('next')" type="primary">
        <div class="pr-1">{{ active === 6 ? '提交' : '下一步' }}</div>
        <el-icon><ArrowRightBold /></el-icon>
      </el-button>
    </div>
  </div>
</template>
