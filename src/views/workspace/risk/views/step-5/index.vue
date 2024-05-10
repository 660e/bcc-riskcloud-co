<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { getAbilityEvaluationTable } from '@/api/modules/workspace';
import { getDictDataType } from '@/api/modules/system';
import { System } from '@/api/interface';

const thead = [
  { label: '项目', width: 200 },
  { label: '评估内容', width: 400 },
  { label: '打分方法' },
  { label: '评分选择', width: 300 },
  { label: '得分', width: 100 },
  { label: '扣分情况', width: 200 }
];
const par = computed(() => {
  return table.value
    ? table.value.reduce((acc: number, cur: any) => {
        return acc + cur.children.reduce((a: number, c: any) => a + (c.type === '2' ? 0 : c.score), 0);
      }, 0)
    : 0;
});
const score = computed(() => {
  return table.value
    ? table.value.reduce((acc: number, cur: any) => {
        return acc + cur.children.reduce((a: number, c: any) => a + (c.value || 0), 0);
      }, 0)
    : 0;
});
const table = ref();
const options = reactive<{ [key: string]: System.Dict[] }>({
  evaluateType: []
});
onMounted(async () => {
  table.value = (await getAbilityEvaluationTable()).data;
  options.evaluateType = (await getDictDataType('evaluate_type')).data;
});

const sum = (data: any) => {
  return data.children.map((e: any) => e.score).reduce((a: number, c: number) => a + c);
};
const typeChange = (value: string, tr: any) => {
  switch (value) {
    case '0':
      tr.value = tr.score;
      break;
    case '2':
      tr.value = 0;
      break;
  }
};
</script>

<template>
  <div class="card flex-1 flex flex-col">
    <div class="flex items-center space-x-5 p-2.5">
      <div class="flex items-center">
        应得分：<span class="text-xl">{{ par }}</span>
      </div>
      <div class="flex items-center">
        实得分：<span class="text-xl">{{ score }}</span>
      </div>
      <div class="flex items-center">
        最终得分：<span class="text-xl">{{ par ? Math.floor((score / par) * 100) : '-' }}</span>
      </div>
      <div class="flex-1"></div>
      <el-button>导出</el-button>
    </div>
    <el-divider class="m-0" />
    <div class="_table">
      <table>
        <tr>
          <th v-for="th in thead" :key="th.label" :width="th.width" class="py-2 sticky top-0 z-10">{{ th.label }}</th>
        </tr>
        <template v-for="item in table" :key="item.id">
          <tr v-for="(tr, index) in item.children" :key="tr.id">
            <td v-if="!index" :rowspan="item.children.length" class="p-2.5 text-center">{{ item.label }}({{ sum(item) }}分)</td>
            <td class="p-2.5">{{ tr.label }}({{ tr.score }}分)</td>
            <td v-if="!index" :rowspan="item.children.length" class="p-2.5">{{ item.explain }}</td>
            <td class="text-center">
              <el-radio-group v-model="tr.type" @change="typeChange($event, tr)">
                <el-radio v-for="e in options.evaluateType" :key="e.dictValue" :label="e.dictLabel" :value="e.dictValue" />
              </el-radio-group>
            </td>
            <td class="p-2.5">
              <el-input-number
                v-model="tr.value"
                :min="0"
                :max="tr.score"
                :disabled="tr.type !== '1'"
                size="small"
                class="w-full"
              />
            </td>
            <td v-if="!index" :rowspan="item.children.length" class="relative">
              <el-input v-model="item.description" type="textarea" />
            </td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
