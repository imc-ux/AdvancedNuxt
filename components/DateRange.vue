<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { ElDatePicker, DateModelType } from 'element-plus';
import { format } from "date-fns";

export type dateTyle = [DateModelType, DateModelType];
interface Props {
  date: dateTyle;
  placeholder?: string;
  format?: string;
  valueFormat?: string;
}


const props = defineProps<Props>()
const emit = defineEmits(['dateChange'])
const date = ref<dateTyle>(props.date)

watch(
  () => props.date,
  () => {
    date.value = props.date;
  }
)

onMounted(() => {
  const today = format(new Date(), 'yyyy-MM-dd');
  date.value = [today, today];
})


function dateChange() {
  emit('dateChange', date.value)
}

</script>

<template>
  <div class="block">
    <el-date-picker v-model="date" type="daterange" range-separator="~" :placeholder="props.placeholder"
      @change="dateChange" :format="props.format" :value-format="props.valueFormat" :clearable="false" />
  </div>
</template>

<style>
.el-range-editor.is-active {
  box-shadow: 0 0 0 1px #08ADAA inset;
}

.el-date-editor.el-input__wrapper:hover {
  box-shadow: 0 0 0 1px #08ADAA inset;
}

.el-input__wrapper {
  border-radius: 0px;
  box-shadow: 0 0 0 1px #cacaca inset;
}

.el-date-table td.end-date .el-date-table-cell__text,
.el-date-table td.start-date .el-date-table-cell__text {
  background-color: #08ADAA;
}

.el-date-table td.today .el-date-table-cell__text {
  color: #08ADAA;
}

.el-picker-panel__icon-btn:hover {
  color: #08ADAA;
}

.el-date-range-picker {
  --el-datepicker-hover-text-color: #08ADAA;
}
</style>