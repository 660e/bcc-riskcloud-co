<script lang="ts" setup>
import { ref } from 'vue';
import { companyApi } from '@/api';
import { LabelTooltip } from '@bcc/components';

const visible = ref(false);
const table = ref();
const open = async () => {
  visible.value = true;
  table.value = (await companyApi.enterpriseScale()).data;
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="visible" width="800" align-center>
    <template #header>
      <label-tooltip
        label="企业规模判定标准"
        content="标准依据和说明：统计上大中小微型企业划分办法(2017) (国统字[2017]213号)"
        class="text-base"
      />
    </template>
    <div class="_table">
      <table>
        <tr>
          <th v-for="th in ['一级行业领域', '二级行业领域', '指标名称', '计量单位', '标准']" :key="th" class="py-1">{{ th }}</th>
        </tr>
        <template v-for="industry1 in table" :key="industry1.label">
          <template v-for="(industry2, index) in industry1.children" :key="industry2.label">
            <tr v-for="(tr, i) in industry2.children" :key="i" class="text-center">
              <td v-if="!index && !i" :rowspan="industry1.children.length + industry2.children.length - 1" class="py-1">
                {{ industry1.label }}
              </td>
              <td v-if="!i" :rowspan="industry2.children.length" class="py-1">{{ industry2.label }}</td>
              <td class="py-1">{{ tr.label }}</td>
              <td class="py-1">{{ tr.unit }}</td>
              <td class="py-1">{{ tr.rule }}</td>
            </tr>
          </template>
        </template>
      </table>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
._table {
  color: var(--el-text-color-regular);
  table {
    width: 100%;
    th,
    td {
      border: 1px theme('colors.gray.200') solid;
    }
    th {
      background-color: theme('colors.gray.100');
      border-top: 0;
    }
    tr:last-child td {
      border-bottom: 0;
    }
  }
}
</style>
