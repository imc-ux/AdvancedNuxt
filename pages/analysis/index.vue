<script setup>
import { ref } from 'vue';
import { ListBoxComponent as EjsListbox } from '@syncfusion/ej2-vue-dropdowns';
import OnlineSubView from './page/OnlineSubView.vue';
import JtracSubView from './page/JtracSubView.vue';

const showIndex = ref(true);

const data = [
  { text: '用户登录分析', id: 'code1' },
  { text: 'jtrac上传分析', id: 'code2' },
];

function listClickHandler(e) {
  if (e.target.id === 'code1') {
    showIndex.value = true;
  } else {
    showIndex.value = false;
  }
}
</script>

<template>
  <div style="display:flex;width: 100%;">
    <div class="listbox" @click="listClickHandler">
      <ejs-listbox :dataSource="data"></ejs-listbox>
    </div>
    <div class="listRight">
      <OnlineSubView v-show="showIndex" />
      <JtracSubView v-show="!showIndex" />
    </div>
  </div>
</template>

<style>
@import "../../assects/ej2-base/material.css";
@import '../../assects/ej2-buttons/material.css';
@import "../../assects/ej2-inputs/material.css";
@import '../../assects/ej2-popups/material.css';
@import "../../assects/ej2-dropdowns/material.css";
@import '../../assects/ej2-lists/material.css';
@import "../../assects/ej2-vue-dropdowns/material.css";
@import "../../assects/ej2-vue-calendars/material.css";
@import "../../assects/ej2-navigations/material.css";
@import "../../assects/ej2-splitbuttons/material.css";
@import "../../assects/ej2-vue-grids/material.css";

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
