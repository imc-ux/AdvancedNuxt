<script lang="ts" setup>
import { ElButton, ElIcon } from 'element-plus';

interface Props {
  btnIcon?: any;
  disabled?: boolean;
  showIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  btnIcon: null,
  disabled: false,
  showIcon: true,
});

</script>

<template>
  <el-button class="btn" :disabled="props.disabled">
    <slot />
    <el-icon v-if="props.showIcon" class="el-icon--right">
      <props.btnIcon /> 
    </el-icon>
  </el-button>
</template>

<style>
.btn {
  color: #08adaa;
  border-color: #08adaa;
  margin-bottom: 4px;
  font-size: 13px;
  font-weight: 400;
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif, 微软雅黑;
  margin-top: 5px;
  border: 1px solid #08adaa;
  background-color: #fff;
  height: 30px;
  width: 100px;
  min-height: 0rem;
  border-radius: 0;
}

.btn:hover {
  color: #fff;
  border-color: #08adaa;
  margin-bottom: 4px;
  font-size: 13px;
  font-weight: 400;
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif, 微软雅黑;
  margin-top: 5px;
  border: 1px solid #08adaa;
  background-color: #08adaa;
  height: 30px;
  width: 100px;
  min-height: 0rem;
  border-radius: 0;
}

.el-button {
  --el-button-hover-text-color: #08adaa;
  --el-button-hover-bg-color: #fff;
  --el-button-hover-border-color: #08adaa;
}

.el-button+.el-button {
  margin-left: 3px;
}
</style>
