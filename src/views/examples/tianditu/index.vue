<script lang="ts" name="tianditu" setup>
import { onMounted, reactive, ref } from 'vue';
import { MapAnnotation } from '@bcc/ui';
import { TLngLat } from '@bcc/utils';

import CloudMarkerCollection from './components/cloud-marker-collection.vue';

interface Annotation {
  company: {
    lnglat: TLngLat | null;
    radius: number;
  };
}

const active = ref(0);
const activeChange = (value: number) => {
  switch (value) {
    case 0: // 地图标注
      annotation.company = {
        lnglat: [116.22858, 40.07734],
        radius: 100
      };
      break;
    case 1: // 海量点位
      break;
  }
};

const annotation = reactive<Annotation>({
  company: {
    lnglat: null,
    radius: 0
  }
});

onMounted(() => activeChange(0));
</script>

<template>
  <div class="card h-full flex flex-col">
    <el-radio-group v-model="active" @change="activeChange" class="p-2.5">
      <el-radio-button :value="0" label="地图标注" />
      <el-radio-button :value="1" label="海量点位（5000+）" />
    </el-radio-group>
    <el-divider class="m-0" />

    <!-- 地图标注 -->
    <map-annotation v-if="active === 0" :company="annotation.company" class="flex-1 h-0" />

    <!-- 海量点位 -->
    <cloud-marker-collection v-if="active === 1" class="flex-1" />
  </div>
</template>
