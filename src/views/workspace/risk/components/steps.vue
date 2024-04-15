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
    <div class="flex-1 flex justify-center items-center">
      <div
        v-for="(e, i) in ['风险源辨识评估', '风险源标注', '应急资源调查', '应急能力评估', '生成评估信息', '签字确认']"
        :key="i"
        :style="{ backgroundColor: active > i ? 'var(--el-color-primary)' : '' }"
        class="flex-1 self-stretch flex justify-center items-center space-x-2 bg-gray-200"
        style="
          clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%, 16px 50%, 0 0);
          margin-left: -10px;
        "
      >
        <span class="w-5 h-5 bg-white rounded-full flex justify-center items-center">{{ i + 1 }}</span>
        <span :class="{ 'text-white': active > i }">{{ e }}</span>
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
