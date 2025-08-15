<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ElRow, ElCol, ElMenu, ElMenuItem } from 'element-plus';

interface Props {
  typeList?: any[];
  defaultType?: string;
}

const props = defineProps<Props>()
const emit = defineEmits(['menuChange'])

                  
function handleOpen(key: any) {
  emit('menuChange', key.index)
}

</script>

<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu :default-active="props.defaultType" class="el-menu-vertical-demo" >
        <el-menu-item v-for="(type, index) in props.typeList" :index="type.value" @click="handleOpen">
          <span>{{ type.neme }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style>
.el-col-12 {
  max-width: 100%;
  flex: 0 0 50%;
}

.el-menu {
  border: solid 1px #cacaca;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: var(--el-menu-bg-color);
  box-sizing: border-box;
}

.el-menu-item.is-active {
  color: #fff;
  background-color: #08ADAA
}

.el-menu-item.is-active:hover {
  color: #fff;
  background-color: #08ADAA
}

.el-menu-item:hover {
  background-color: #fff
}
</style>