<script lang="ts" name="tianditu" setup>
import { onMounted, ref } from 'vue';
import { CloudMarkerCollection, MapAnnotation, OnePicture, SensitiveTargets } from '@bcc/ui';
import { TDT } from '@bcc/utils';

interface RiskSource {
  id: number;
  label: string;
}

interface Company {
  lnglat: TDT.LngLat | null;
  radius?: number;
  targets?: TDT.Marker[];
  sources?: RiskSource[];
}

const company = ref<Company>({
  lnglat: null
});
const data = ref(0);

const active = ref(4);
const activeChange = (value: number) => {
  switch (value) {
    case 1: // 周边敏感目标
      company.value = {
        lnglat: [116.22858, 40.07734],
        radius: 200,
        targets: [
          { id: 1, label: 'Target-001', lnglat: [116.22685, 40.07829] },
          { id: 2, label: 'Target-002', lnglat: [116.22733, 40.07677] }
        ]
      };
      break;
    case 2: // 地图标注
      company.value = {
        lnglat: [116.22858, 40.07734],
        sources: [
          { id: 1, label: 'Risk-001' },
          { id: 2, label: 'Risk-002' },
          { id: 3, label: 'Risk-003' },
          { id: 4, label: 'Risk-004' }
        ]
      };
      break;
    case 4:
      data.value = 1;
      break;
  }
};

onMounted(() => activeChange(4));
</script>

<template>
  <div class="card h-full flex flex-col">
    <el-radio-group v-model="active" @change="activeChange" class="p-2.5">
      <el-radio-button :value="0" label="海量点位" />
      <el-radio-button :value="1" label="周边敏感目标" />
      <el-radio-button :value="2" label="地图标注" />
      <!-- <el-radio-button :value="3" label="图片标注" /> -->
      <el-radio-button :value="4" label="风险一张图" />
    </el-radio-group>
    <el-divider class="m-0" />

    <!-- 海量点位 -->
    <cloud-marker-collection v-if="active === 0" class="flex-1" />
    <!-- 周边敏感目标 -->
    <sensitive-targets v-if="active === 1" :company="company" class="flex-1 h-0" />
    <!-- 地图标注 -->
    <map-annotation v-if="active === 2" :company="company" class="flex-1 h-0" />

    <!-- 风险一张图 -->
    <one-picture v-if="active === 4" :data="data" class="flex-1" />
  </div>
</template>
