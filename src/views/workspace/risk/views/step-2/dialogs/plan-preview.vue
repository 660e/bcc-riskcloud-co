<script lang="ts" setup>
import { ref } from 'vue';
import { useWrapperFit } from '../hooks';
import { WorkspaceRiskSource } from '@/api/interface';
import html2canvas from 'html2canvas';

const legend = [
  { name: '重大风险源', color: '#f56c6c', type: 'danger' },
  { name: '较大风险源', color: '#e6a23c', type: 'warning' },
  { name: '一般风险源', color: '#409eff', type: 'primary' },
  { name: '低风险源', color: '#67c23a', type: 'success' }
];
const visible = ref(false);
const riskSources = ref<WorkspaceRiskSource[]>([]);

const open = (sources: WorkspaceRiskSource[]) => {
  riskSources.value = sources.filter(source => source.position);
  visible.value = true;
};

const markerStyle = (position: [number, number] | undefined) => {
  return position ? { top: `${position[1]}%`, left: `${position[0]}%` } : { display: 'none' };
};

const screenRef = ref();
const screenshot = () => {
  html2canvas(screenRef.value).then(canvas => {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = image;
    link.click();
  });
};

// 平面图自适应
const wrapperRef = ref();
const imgRef = ref();
const { fit, wrapperStyle } = useWrapperFit(wrapperRef, imgRef);

defineExpose({ open });
</script>

<template>
  <div>
    <el-dialog v-model="visible" title="预览" class="flex flex-col" fullscreen>
      <div class="flex-1 flex" ref="screenRef">
        <div class="flex-1 bg-gray-300 flex justify-center items-center" ref="wrapperRef">
          <div :style="wrapperStyle" class="opacity-0 duration-300 relative">
            <img :style="wrapperStyle" @load="fit" src="../bg.jpg" ref="imgRef" />
            <div class="w-full h-full absolute top-0 left-0 z-10">
              <div
                v-for="(r, i) in riskSources"
                :key="r.id"
                :data-id="r.id"
                :style="markerStyle(r.position)"
                class="plan-marker__location"
              >
                <span :style="{ color: legend.find(l => l.type === r.type)?.color }">{{ i + 1 }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="min-w-48 p-2.5 space-y-2">
          <dl v-for="item in legend" :key="item.color" class="text-xs space-y-2">
            <dt
              v-if="riskSources.filter(r => r.type === item.type).length"
              :style="{ backgroundColor: item.color }"
              class="text-white rounded leading-none px-2.5 py-1 text-center"
            >
              {{ item.name }}
            </dt>
            <dd v-for="r in riskSources.filter(r => r.type === item.type)" :key="r.id" class="leading-none">
              {{ riskSources.findIndex(e => e.id === r.id) + 1 }}. {{ r.label }}
            </dd>
          </dl>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <el-button @click="visible = false">关闭</el-button>
          <el-button @click="screenshot" type="primary">截图</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-dialog) {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    flex: 1;
    display: flex;
    .plan-marker__location {
      background: url(@bcc/utils/src/assets/location.png);
      height: 37px;
      width: 28px;
      transform: translate(-14px, -37px);
      position: absolute;
      z-index: 3;
      span {
        height: 28px;
        line-height: 1;
        font-size: 12px;
        font-weight: 700;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
