<script setup>
import { ref } from 'vue';

const typeList = [
  { value: 'user', neme: '用户登录分析' },
  { value: 'jtrac', neme: 'jtrac上传分析' }
]
const showType = ref(typeList[0].value);

function listClickHandler(str) {
  showType.value = str;
}
</script>
<template>
  <div style="display:flex;width: 100%;">
    <div>
      <Menu :typeList="typeList" :defaultType="typeList[0].value" @menuChange="listClickHandler" />
    </div>
    <div class="listRight">
      <UserAnalyseView v-if="showType === typeList[0].value" />
      <JtracAnalyseView v-else/>
    </div>
  </div>
</template>

<style>

.flex-display {
  display: flex;
}

.listbox {
  display: flex;
  width: 200px;
  min-width: 200px;
  height: 100%;
  flex-shrink: 0;
}

.listRight {
  margin-left: 10px;
  width: 0;
  flex: 1;
}
</style>
