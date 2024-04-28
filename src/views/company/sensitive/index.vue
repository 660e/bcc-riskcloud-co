<script lang="ts" name="company-sensitive" setup>
import { onMounted, ref } from 'vue';
import { MapClass, TDT } from '@bcc/utils';
import { getDictDataType } from '@/api/modules/system';
import { getCompanySensitive, getCompanySensitiveInfo } from '@/api/modules/company';
import { System } from '@/api/interface';
import { ElMessage, ElMessageBox } from 'element-plus';
import CreateDialog from './dialogs/create.vue';

// 地图实例
let M: any;
// 敏感目标范围实例
let rangeCircle: any;
// 敏感目标范围缓存
let rangeCache: number;
// 当前正在拖拽的自定义敏感目标
let draggingTarget: any;

// “添加敏感目标”弹窗
const createDialogRef = ref();
// 地图工具类
const MapUtils: MapClass = new MapClass();
// 敏感目标范围
const range = ref(0);
// 敏感目标范围选项
const rangeOptions = ref<System.Dict[]>();
// 公司基本信息
const companyInformation = ref();
// 敏感目标列表
const targets = ref<TDT.Marker[]>([]);
// 已标注敏感目标列表
const checkedTargets = ref<TDT.Marker[]>([]);
// 右键菜单
const contextMenu: TDT.MenuItem[] = [
  {
    text: '添加敏感目标',
    callback: (lnglat: any) => {
      if (MapUtils.PointInCircle([lnglat.lng, lnglat.lat], companyInformation.value.lnglat, range.value)) {
        createDialogRef.value.open(lnglat);
      } else {
        ElMessage.warning('请在圆形范围内添加敏感目标');
      }
    }
  }
];

onMounted(async () => {
  companyInformation.value = (await getCompanySensitiveInfo()).data;
  targets.value = (await getCompanySensitive()).data;
  range.value = companyInformation.value.radius;
  rangeCache = range.value;
  rangeCircle = MapUtils.Circle(companyInformation.value.lnglat, rangeCache, { weight: 1 });
  checkedTargets.value = companyInformation.value.targets;

  M = MapUtils.Init('map', companyInformation.value.lnglat);
  M.addContextMenu(MapUtils.ContextMenu(contextMenu, 150));
  M.addOverLay(MapUtils.Marker(companyInformation.value.lnglat));
  M.addOverLay(rangeCircle);

  setRangeRadius(rangeCache);
  checkedTargetsChange(checkedTargets.value);

  rangeOptions.value = (await getDictDataType('sensitive_target_range')).data;
});

// 添加自定义敏感目标
const createTarget = (forms: any) => {
  const target: TDT.Marker = {
    id: new Date().getTime(),
    label: forms.label,
    lnglat: forms.lnglat,
    icon: 'warning',
    drag: true
  };
  const marker = MapUtils.Marker(target.lnglat, target.icon, target);

  M.addOverLay(marker);
  addDragEvent(marker);

  targets.value.push(target);
  checkedTargets.value.push(target);
};

// 添加拖拽事件监听
const addDragEvent = (marker: any) => {
  marker.enableDragging();
  marker.addEventListener('dragstart', ({ target }) => {
    draggingTarget = targets.value.find(t => t.id === target.options.title.id);
  });
  marker.addEventListener('dragend', ({ lnglat }) => {
    draggingTarget.lnglat = [lnglat.lng, lnglat.lat];
  });
};

// 设置敏感目标范围
const setRangeRadius = (radius: number) => {
  rangeCircle.setRadius(radius);
  M.setViewport(Object.values(rangeCircle.getBounds()));
};

// 敏感目标范围改变时
const rangeChange = (radius: number) => {
  ElMessageBox.confirm('调整风险范围将清空已标注的敏感目标', '系统提示', { type: 'warning' })
    .then(() => {
      checkAllTargetsChange(false);
      setRangeRadius(radius);
      rangeCache = radius;
    })
    .catch(() => {
      range.value = rangeCache;
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
      if (target.drag) addDragEvent(marker);
    });
  } else if (diff1.length < diff2.length) {
    diff2.forEach((overlay: any) => M.removeOverLay(overlay));
  }

  checkAllTargets.value = checked.length === targets.value.length;
  isIndeterminate.value = checked.length > 0 && checked.length < targets.value.length;
};

// 保存
const save = () => {
  console.log(checkedTargets.value);
};
</script>

<template>
  <div class="card h-full flex">
    <div class="w-72 flex">
      <div class="flex-1 flex flex-col">
        <div class="flex-1 overflow-y-auto">
          <el-checkbox-group v-model="checkedTargets" @change="checkedTargetsChange" class="pt-2.5">
            <el-checkbox v-for="e in targets" :key="e.id" :value="e" class="px-2.5 m-0 font-normal flex _targets">
              <span>{{ e.label }}</span>
              <span v-if="companyInformation.lnglat">
                {{ MapUtils.PointToPointDistance(companyInformation.lnglat, e.lnglat) }}米
              </span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="p-2.5 flex">
          <el-checkbox v-model="checkAllTargets" :indeterminate="isIndeterminate" @change="checkAllTargetsChange" label="全选" />
          <el-button @click="save" type="primary" class="flex-1 ml-2.5">保存</el-button>
        </div>
      </div>
      <el-divider direction="vertical" class="m-0 h-full" />
    </div>
    <div class="flex-1" id="map">
      <el-radio-group v-model="range" @change="rangeChange" class="absolute top-2.5 left-2.5 z-[1000]">
        <el-radio-button v-for="e in rangeOptions" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
      </el-radio-group>
    </div>

    <!-- “添加敏感目标”弹窗 -->
    <create-dialog @confirm="createTarget" ref="createDialogRef" />
  </div>
</template>

<style lang="scss" scoped>
@import '@bcc/utils/styles/tianditu.scss';
._targets :deep(.el-checkbox__label) {
  flex: 1;
  display: flex;
  justify-content: space-between;
}
</style>
