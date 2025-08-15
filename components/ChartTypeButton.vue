<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { ElImage } from 'element-plus';

interface Props {
  startUrl?: string;
  endUrl?: string;
  fit?: any;
  showFirst?: boolean;
}

const props = defineProps<Props>()
const emit = defineEmits(['switchType'])
const showType = ref<boolean>(false)

onMounted(() => {
  showType.value = props.showFirst
})

function switchType() {
  showType.value = !showType.value
  emit('switchType', showType.value)
}

</script>

<template>
  <el-image v-if="!showType" class="chart-type-switchbox" :src="props.startUrl" :fit="props.fit" @click="switchType" />
  <el-image v-else class="chart-type-switchbox" :src="props.endUrl" :fit="props.fit" @click="switchType" />
</template>

<style>
.chart-type-switchbox {
  margin: 5px;
  width: 25px;
  height: 25px;
  cursor: pointer;
}
</style>