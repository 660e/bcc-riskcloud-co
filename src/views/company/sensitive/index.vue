<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { getDictDataType } from '@/api/modules/system';
import { System } from '@/api/interface';
import { MapClass } from '@bcc/utils';

// 地图工具类
const MapUtils: MapClass = new MapClass();
// 选项
const options = reactive<{ [key: string]: System.Dict[] }>({
  sensitiveTargetRange: [] // 敏感目标范围
});
// 公司基本信息
const companyInformation = ref();
// 周边敏感目标列表
const targetList = ref();

onMounted(async () => {
  companyInformation.value = {
    lnglat: [116.22874, 40.07758],
    radius: 200,
    targets: [
      { id: 1, label: 'Target-001', lnglat: [116.22685, 40.07829] },
      { id: 2, label: 'Target-002', lnglat: [116.22733, 40.07677] }
    ]
  };
  targetList.value = [
    { id: 1, label: 'Target-001', lnglat: [116.22685, 40.07829] },
    { id: 2, label: 'Target-002', lnglat: [116.22733, 40.07677] },
    { id: 3, label: 'Target-003', lnglat: [116.22988, 40.07792] },
    { id: 4, label: 'Target-004', lnglat: [116.22924, 40.07646] }
  ];

  MapUtils.Init('map', companyInformation.value.lnglat);

  options.sensitiveTargetRange = (await getDictDataType('sensitive_target_range')).data;
});
</script>

<template>
  <div class="card h-full flex">
    <div class="w-72 flex">
      <div class="flex-1 flex flex-col">
        <div class="flex-1 overflow-y-auto">
          <div style="height: 2000px"></div>
        </div>
        <div class="p-2.5 flex">
          <el-checkbox label="全选" />
          <el-button type="primary" class="flex-1 ml-2.5">保存</el-button>
        </div>
      </div>
      <el-divider direction="vertical" class="m-0 h-full" />
    </div>
    <div class="flex-1" id="map">
      <el-radio-group class="absolute top-2.5 left-2.5" style="z-index: 1000">
        <el-radio-button v-for="e in options.sensitiveTargetRange" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
      </el-radio-group>
    </div>
  </div>
</template>
