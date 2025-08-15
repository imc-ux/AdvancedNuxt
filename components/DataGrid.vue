<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';

interface Props {
  dataList?: any[];
  gridDataList?: any[];
}

const props = defineProps<Props>()
const dateList = ref<string[]>(props.dataList ?? [])
const gridDataList = ref<any[]>(props.gridDataList ?? [])

watch(props, (newProps) => {
  dateList.value = newProps.dataList ?? []
  gridDataList.value = newProps.gridDataList ?? []
})

</script>

<template>
  <el-table :data="gridDataList" border style="width: 100%">
    <el-table-column class="table-column" prop="name" fixed align="center" />
    <el-table-column class="table-column" v-for="(item, index) in dateList" :key="index" :prop="dateList[index]"
      :label="dateList[index]" align="center" />
  </el-table>
</template>

<style>
.table-column {
  color: #606266;
}

.el-table thead {
  color: #606266;
  font-weight: 500;
}
</style>