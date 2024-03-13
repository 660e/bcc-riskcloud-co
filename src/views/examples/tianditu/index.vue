<script lang="ts" name="tianditu" setup>
import { onMounted, reactive, ref } from 'vue';
import { CloudMarkerCollection, SensitiveTargets } from '@bcc/ui';
import { TDT } from '@bcc/utils';

interface Targets {
  company: {
    lnglat: TDT.LngLat | null;
    radius: number;
    targets: TDT.Marker[];
  };
}

const active = ref(0);
const activeChange = (value: number) => {
  switch (value) {
    case 0: // 周边敏感目标
      targets.company = {
        lnglat: [116.22858, 40.07734],
        radius: 200,
        targets: [
          { id: 1, label: 'Target-001', lnglat: [116.22685, 40.07829] },
          { id: 2, label: 'Target-002', lnglat: [116.22733, 40.07677] }
        ]
      };
      break;
    case 1: // 海量点位
      break;
  }
};

const targets = reactive<Targets>({
  company: {
    lnglat: null,
    radius: 0,
    targets: []
  }
});

onMounted(() => activeChange(0));
</script>

<template>
  <div class="card h-full flex flex-col">
    <el-radio-group v-model="active" @change="activeChange" class="p-2.5">
      <el-radio-button :value="0" label="周边敏感目标" />
      <el-radio-button :value="1" label="海量点位" />
      <!-- 
      <el-radio-button :value="2" label="地图标注" />
      <el-radio-button :value="3" label="风险一张图" /> -->
    </el-radio-group>
    <el-divider class="m-0" />

    <!-- 地图标注 -->
    <sensitive-targets v-if="active === 0" :company="targets.company" class="flex-1 h-0" />
    <!-- 海量点位 -->
    <cloud-marker-collection v-if="active === 1" class="flex-1" />
    <!-- <map-annotation  /> -->
  </div>
</template>
