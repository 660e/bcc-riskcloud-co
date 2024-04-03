<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { MapClass, TDT } from '@bcc/utils';
import { getDictDataType } from '@/api/modules/system';
import { System } from '@/api/interface';
import { ElMessageBox } from 'element-plus';

// 地图实例
let M: any;
// 敏感目标范围实例
let rangeCircle: any;
// 敏感目标范围缓存
let rangeCache: number;

// 地图工具类
const MapUtils: MapClass = new MapClass();
// 敏感目标范围
const rangeRadius = ref(0);
// 选项
const options = reactive<{ [key: string]: System.Dict[] }>({
  range: [] // 敏感目标范围
});
// 公司基本信息
const companyInformation = ref();
// 敏感目标列表
const targets = ref();
// 已标注敏感目标列表
const checkedTargets = ref([]);

onMounted(async () => {
  companyInformation.value = {
    lnglat: [116.22874, 40.07758],
    radius: 200,
    targets: [
      { id: 1, label: 'Target-001', lnglat: [116.22685, 40.07829] },
      { id: 2, label: 'Target-002', lnglat: [116.22733, 40.07677] }
    ]
  };
  targets.value = [
    { id: 1, label: 'Target-001', lnglat: [116.22685, 40.07829] },
    { id: 2, label: 'Target-002', lnglat: [116.22733, 40.07677] },
    { id: 3, label: 'Target-003', lnglat: [116.22988, 40.07792] },
    { id: 4, label: 'Target-004', lnglat: [116.22924, 40.07646] }
  ];

  rangeRadius.value = companyInformation.value.radius;
  rangeCache = rangeRadius.value;
  rangeCircle = MapUtils.Circle(companyInformation.value.lnglat, rangeCache, { weight: 1 });
  checkedTargets.value = companyInformation.value.targets;

  M = MapUtils.Init('map', companyInformation.value.lnglat);
  M.addOverLay(MapUtils.Marker(companyInformation.value.lnglat));
  M.addOverLay(rangeCircle);

  setRangeRadius(rangeCache);
  checkedTargetsChange(checkedTargets.value);

  options.range = (await getDictDataType('sensitive_target_range')).data;
});

// 设置敏感目标范围
const setRangeRadius = (radius: number) => {
  rangeCircle.setRadius(radius);
  M.setViewport(Object.values(rangeCircle.getBounds()));
};

// 敏感目标范围改变时
const rangeRadiusChange = (radius: number) => {
  ElMessageBox.confirm('调整风险范围将清空已标注的敏感目标', '系统提示', { type: 'warning' })
    .then(() => {
      checkAllTargetsChange(false);
      setRangeRadius(radius);
      rangeCache = radius;
    })
    .catch(() => {
      rangeRadius.value = rangeCache;
    });
};

// 全选
const isIndeterminate = ref(true);
const checkAllTargets = ref(false);
const checkAllTargetsChange = (check: boolean) => {
  checkedTargets.value = check ? targets.value : [];
  checkedTargetsChange(check ? targets.value : []);
};
const checkedTargetsChange = (checked: TDT.Marker[]) => {
  // 获取所有标注（排除中心点Marker和范围Circle）
  const activated: any[] = M.getOverlays().filter((overlay: any) => {
    return overlay.getType() === 2 && overlay.options.title.id;
  });

  // 获取标注列表与地图标注差异
  const diff1 = checked.filter(c => !activated.some(a => a.options.title.id === c.id));
  const diff2 = activated.filter(a => !checked.some(c => c.id === a.options.title.id));

  // 根据差异添加或移除标注
  if (diff1.length > diff2.length) {
    diff1.forEach((target: TDT.Marker) => {
      const marker = MapUtils.Marker(target.lnglat, target.icon || 'danger', target);
      M.addOverLay(marker);
      // if (target.drag) addDragEvent(marker);
    });
  } else if (diff1.length < diff2.length) {
    diff2.forEach((overlay: any) => M.removeOverLay(overlay));
  }

  checkAllTargets.value = checked.length === targets.value.length;
  isIndeterminate.value = checked.length > 0 && checked.length < targets.value.length;
};

// 保存
const save = () => {
  console.log('save');
};
</script>

<template>
  <div class="card h-full flex">
    <div class="w-72 flex">
      <div class="flex-1 flex flex-col">
        <div class="flex-1 overflow-y-auto">
          <el-checkbox-group v-model="checkedTargets" @change="checkedTargetsChange" class="pt-2.5">
            <el-checkbox v-for="e in targets" :key="e.id" :value="e" class="px-2.5 m-0 font-normal flex">
              <span>{{ e.label }}</span>
            </el-checkbox>
          </el-checkbox-group>
          <div style="height: 2000px"></div>
        </div>
        <div class="p-2.5 flex">
          <el-checkbox v-model="checkAllTargets" :indeterminate="isIndeterminate" @change="checkAllTargetsChange" label="全选" />
          <el-button @click="save" type="primary" class="flex-1 ml-2.5">保存</el-button>
        </div>
      </div>
      <el-divider direction="vertical" class="m-0 h-full" />
    </div>
    <div class="flex-1" id="map">
      <el-radio-group v-model="rangeRadius" @change="rangeRadiusChange" class="absolute top-2.5 left-2.5" style="z-index: 1000">
        <el-radio-button v-for="e in options.range" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
      </el-radio-group>
    </div>
  </div>
</template>
