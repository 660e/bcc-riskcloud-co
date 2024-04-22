<script lang="ts" setup>
import { ref } from 'vue';
import { getRiskMarkers } from '@/api/modules/workspace';
import { WorkspaceRiskSource } from '@/api/interface';
import { useWrapperFit } from '../views/step-2/hooks';

const init = async () => {
  riskSources.value = (await getRiskMarkers()).data;
};

// 当前正在拖拽的风险源
let draggingSource: WorkspaceRiskSource | undefined;
let draggingSourceOffset = [0, 0];
// 风险源列表
const riskSources = ref<WorkspaceRiskSource[]>([]);
// 标注风险源
const containerRef = ref();
const ondragstart = (event: DragEvent) => {
  const { offsetX, offsetY } = event;
  const { clientHeight, clientWidth, dataset } = event.target as HTMLElement;
  draggingSource = riskSources.value.find((risk: WorkspaceRiskSource) => risk.id === dataset.id);
  draggingSourceOffset = dataset.type === 'marker' ? [clientWidth / 2 - offsetX, clientHeight - offsetY] : [0, 0];
};
const ondragover = (event: DragEvent) => event.preventDefault();
const ondrop = (event: DragEvent) => {
  if ((event.target as HTMLElement).id === 'container' && draggingSource) {
    draggingSource.position = [
      ((event.offsetX + draggingSourceOffset[0]) / containerRef.value.clientWidth) * 100,
      ((event.offsetY + draggingSourceOffset[1]) / containerRef.value.clientHeight) * 100
    ];
  }
};
const markerStyle = (position: [number, number] | undefined) => {
  return position ? { top: `${position[1]}%`, left: `${position[0]}%` } : { display: 'none' };
};

// 预览
const previewRef = ref();
const preview = () => previewRef.value.open(riskSources.value);

// 保存
const save = () => {
  console.log(riskSources.value);
};

// 平面图自适应
const wrapperRef = ref();
const imgRef = ref();
const { fit, wrapperStyle } = useWrapperFit(wrapperRef, imgRef);

defineExpose({ init });
</script>

<template>
  <el-tab-pane v-bind="$attrs">
    <div class="w-72 flex">
      <div class="flex-1 flex flex-col">
        <div class="flex-1 overflow-y-auto">
          <div class="pt-2.5">
            <div
              v-for="r in riskSources"
              :key="r.id"
              :data-id="r.id"
              :ondragstart="ondragstart"
              draggable="true"
              class="h-8 px-2.5 cursor-grab select-none flex items-center justify-between"
              style="color: var(--el-text-color-regular)"
            >
              <span>{{ r.label }}</span>
              <el-icon v-if="r.position" @click="r.position = undefined" class="text-lg text-red-500 cursor-pointer">
                <CircleClose />
              </el-icon>
            </div>
          </div>
        </div>
        <div class="p-2.5 flex">
          <el-button @click="riskSources.forEach((r: WorkspaceRiskSource) => (r.position = undefined))" class="flex-1">
            重置
          </el-button>
          <el-button @click="preview" class="flex-1">预览</el-button>
          <el-button @click="save" class="flex-1" type="primary">保存</el-button>
        </div>
      </div>
      <el-divider direction="vertical" class="m-0 h-full" />
    </div>
    <div class="flex-1 bg-gray-300 flex justify-center items-center" ref="wrapperRef">
      <div :style="wrapperStyle" class="opacity-0 duration-300 relative">
        <img :style="wrapperStyle" @load="fit" src="../views/step-2/bg.jpg" ref="imgRef" />
        <div
          :ondragover="ondragover"
          :ondrop="ondrop"
          id="container"
          ref="containerRef"
          class="w-full h-full absolute top-0 left-0 z-10"
        >
          <div
            v-for="r in riskSources"
            :key="r.id"
            :data-id="r.id"
            :style="markerStyle(r.position)"
            :ondragstart="ondragstart"
            :class="[`plan-marker__marker--${r.type}`]"
            data-type="marker"
            draggable="true"
            class="plan-marker__marker"
          ></div>
        </div>
      </div>
    </div>
  </el-tab-pane>
</template>

<style lang="scss" scoped>
.plan-marker__marker {
  cursor: pointer;
  height: 41px;
  width: 25px;
  transform: translate(-12.5px, -41px);
  position: absolute;
  z-index: 3;
  &--danger {
    background: url(@bcc/utils/src/assets/tianditu/marker-danger.svg);
  }
  &--primary {
    background: url(@bcc/utils/src/assets/tianditu/marker-primary.svg);
  }
  &--success {
    background: url(@bcc/utils/src/assets/tianditu/marker-success.svg);
  }
  &--warning {
    background: url(@bcc/utils/src/assets/tianditu/marker-warning.svg);
  }
}
</style>
