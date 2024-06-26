<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { workspaceApi } from '@/api';
import { WorkspaceRiskSource } from '@/api/interface';
import { MapClass } from '@bcc/utils';

// 地图实例
let M: any;
// 地图工具类
const MapUtils: MapClass = new MapClass();
onMounted(async () => {
  const center: [number, number] = [116.22874, 40.07758];
  riskSources.value = (await workspaceApi.markers()).data;

  M = MapUtils.Init('map', center, 18);
  M.addOverLay(MapUtils.Marker(center));
});

// 当前正在拖拽的风险源
let draggingSource: WorkspaceRiskSource | undefined;
// 当前选中的风险源
const currentSource = ref();
let catching = false;
// 风险源列表
const riskSources = ref<WorkspaceRiskSource[]>([]);
// 已标注风险源列表
const checkedSources = ref<WorkspaceRiskSource[]>([]);
// 拖拽标注风险源
const ondragstart = (event: DragEvent) => {
  draggingSource = riskSources.value.find((risk: WorkspaceRiskSource) => {
    return risk.id === (event.target as HTMLElement)?.dataset.id;
  });
};
const ondragover = (event: DragEvent) => event.preventDefault();
const ondrop = (event: DragEvent) => {
  if ((event.target as HTMLElement).id === 'map' && draggingSource) {
    const marker = MapUtils.Marker(
      MapUtils.ContainerPointToLngLat(event.offsetX, event.offsetY),
      draggingSource.type,
      draggingSource
    );

    M.addOverLay(marker);
    marker.enableDragging();
    marker.addEventListener('dragstart', () => (catching = true));
    marker.addEventListener('dragend', () => (catching = false));
    marker.addEventListener('mouseover', ({ target }) => {
      currentSource.value = target.options.title;
    });
    marker.addEventListener('mouseout', () => {
      if (!catching) currentSource.value = null;
    });

    if (checkedSources.value.some(checked => checked.id === draggingSource?.id)) removeSource(draggingSource.id);
    checkedSources.value.push(draggingSource);
  }
};

// 移除风险源
const removeSource = (id: string) => {
  const overlay = M.getOverlays().find((overlay: any) => overlay.options.title.id === id);
  M.removeOverLay(overlay);
  checkedSources.value = checkedSources.value.filter(checked => checked.id !== id);
};

// 重置
const reset = () => {
  checkedSources.value = [];
  M.getOverlays()
    .filter((overlay: any) => {
      return overlay.options.title.id;
    })
    .forEach((overlay: any) => {
      M.removeOverLay(overlay);
    });
};

// 保存
const save = () => {
  const params = checkedSources.value.map(checked => {
    const lnglat = M.getOverlays()
      .find((overlay: any) => overlay.options.title.id === checked.id)
      .getLngLat();
    return {
      lnglat: [lnglat.lng, lnglat.lat],
      ...checked
    };
  });

  console.log(params);
};
</script>

<template>
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
            <el-icon
              v-if="checkedSources.map((c: WorkspaceRiskSource) => c.id).includes(r.id)"
              @click="removeSource(r.id)"
              class="text-lg text-red-500 cursor-pointer"
            >
              <CircleClose />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="p-2.5 flex">
        <el-button @click="reset" class="flex-1">重置</el-button>
        <el-button @click="save" class="flex-1" type="primary">保存</el-button>
      </div>
    </div>
    <el-divider direction="vertical" class="m-0 h-full" />
  </div>
  <div :ondragover="ondragover" :ondrop="ondrop" id="map" class="flex-1">
    <transition name="fade">
      <el-alert
        v-if="currentSource"
        :title="currentSource.label"
        :closable="false"
        class="px-4 h-8 w-auto flex items-center -translate-x-1/2 absolute top-2.5 left-1/2 z-[500]"
      />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import '@bcc/utils/styles/tianditu.scss';
@import '@bcc/utils/styles/transition.scss';
</style>
