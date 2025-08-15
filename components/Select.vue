<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import { ElSelect, ElOption } from 'element-plus';

interface Props {
  selectValue: string[];
  dataList?: any[];
  placeholder?: string;
  multiple?: boolean;
}

const props = defineProps<Props>()
const emit = defineEmits(['selectChange'])

function selectChange(value) {
  emit('selectChange', value)
}

</script>

<template>
  <div>
    <el-select v-model="props.selectValue" :multiple="props.multiple" collapse-tags :max-collapse-tags="5"
      :placeholder="props.placeholder" @change="selectChange">
      <el-option v-for="item in props.dataList" :key="item.nid" :label="item.name" :value="item.id" />
    </el-select>
  </div>
</template>

<style>
.el-input {
  --el-input-text-color: #000;
  --el-input-border: #cacaca;
  --el-input-hover-border: #08ADAA;
  --el-input-focus-border: #08ADAA;
  --el-input-transparent-border: 0 0 0 1px transparent inset;
  --el-input-border-color: #cacaca;
  --el-input-border-radius: 0;
  --el-input-bg-color: #fff;
  --el-input-icon-color: var(--el-text-color-placeholder);
  --el-input-placeholder-color: var(--el-text-color-placeholder);
  --el-input-hover-border-color: #08ADAA;
  --el-input-clear-hover-color: #08ADAA;
  --el-input-focus-border-color: #08ADAA;
}

.el-select .el-input.is-focus .el-input__wrapper {
  box-shadow: 0 0 0 1px #08ADAA inset !important;
}

.el-select {
  width: 100%;
}

.el-select {
  --el-select-border-color-hover: #08ADAA;
  --el-select-disabled-border: #cacaca;
  --el-select-font-size: var(--el-font-size-base);
  --el-select-close-hover-color: #08ADAA;
  --el-select-input-color: var(--el-text-color-placeholder);
  --el-select-multiple-input-color: var(--el-text-color-regular);
  --el-select-input-focus-border-color: #08ADAA;
  --el-select-input-font-size: 14px;
}

.el-popper.is-light .el-popper__arrow::before {
  border: 0px;
  background: var(--el-bg-color-overlay);
  right: 0;
}

.el-popper[data-popper-placement^=bottom]>.el-popper__arrow {
  top: 5px;
}

.el-popper.is-light {
  background: var(--el-bg-color-overlay);
  border: 1px solid #cacaca;
}

.el-popper {
  --el-popper-border-radius: 0px;
}

.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  color: #08ADAA;
}

.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
  background-color: #08ADAA;
}

.el-input__wrapper {
  max-height: 32px;
}

.el-select__tags {
  max-height: 32px;
}

.el-select .el-select__tags>span {
  max-height: 32px;
}
</style>