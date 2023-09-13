<!-- <script lang="ts" setup>
import { ElTabs, ElTabPane, ElInput } from 'element-plus';

interface Props {
  typeArr?: any;
  index?: string;
  inputValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  typeArr: [],
  index: '0',
  showIcon: '',
});

const handleTabsEdit = (
  targetName: any,
  action: 'remove' | 'add'
) => {
  if (action === 'add') {
    const newTabName = `${++tabIndex.value}`;
    editableTabs.push({
      title: input.value,
      name: newTabName,
    })
    editableTabsValue.value = newTabName;
  } else if (action === 'remove') {
    const tabs = editableTabs;
    let activeName = editableTabsValue.value;
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
        }
      })
    }
    editableTabsValue.value = activeName;
    editableTabs.splice(targetName, 1)
  }
}

</script>

<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    editable
    @edit="handleTabsEdit"
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
    </el-tab-pane>
    <el-input v-model="input" class="add_types" placeholder="add type" />
  </el-tabs>
</template>

<style>
.el-select {
  height: 30px;
  margin-top: 4px;
  margin-bottom: 4px;
}

.select {
  justify-content: start;
  display: inline-block;
}

.el-input__wrapper {
  border: 1px solid #cacaca;
  border-radius: 0;
  box-shadow: 0px 0px 0px 0px;
  padding: 0px 3px;
}

.el-input {
  --el-select-border-color-hover: 1px solid #08adaa;
  --el-select-input-focus-border-color: 1px solid #08adaa;
  --el-input-focus-border-color: 1px solid #08adaa;
}

.el-select-dropdown__item.selected {
  color: #000;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif,"微软雅黑";
  font-weight: 400;
}

.el-select-dropdown__item {
  color: #000;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif,"微软雅黑";
  font-weight: 400;
}

.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
  color: #fff;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif,"微软雅黑";
  background-color: #08adaa;
  font-weight: 400;
}

.el-popper__arrow::before {
  width: 0px;
  height: 0px;
}

.el-popper.is-light {
  border: 1px solid #cacaca;
  border-radius: 0;
  box-shadow: 0px 0px 0px 0px;
}

.el-select-dropdown__list {
  margin: 0px !important;
}

.el-tabs__header {
  margin: 0;
}

.el-tabs--card>.el-tabs__header .el-tabs__nav {
  border: 1px solid #cacaca;
  border-bottom: none;
  border-radius: 0;
  box-sizing: border-box;
}

.el-tabs--card>.el-tabs__header .el-tabs__item {
  border-bottom: 1px solid #cacaca;
  border-left: 1px solid #cacaca;
}

.el-tabs--card>.el-tabs__header {
  border-bottom: 1px solid #cacaca;
}

.el-tabs__new-tab {
  border: 1px solid #08adaa;
}

.el-icon {
  --color: #08adaa;
}

.el-tabs__item.is-active {
  color: #08adaa;
}

.el-tabs__item:hover {
  color: #fff;
  background-color: #08adaa;
  cursor: pointer;
}

.el-tabs__item:hover>.el-icon {
  --color: #fff;
}

.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: #cacaca;
  color: #fff;
  background-color: #08adaa;
}

.add_types {
  width: 200px;
  height: 30px;
  position: fixed;
  top: 14px;
  right: 35px;
  z-index: 11;
}

.el-tabs__content {
  overflow: hidden;
  position: relative;
  text-align: right;
}

.el-input__wrapper:hover {
  box-shadow: 0px 0px 0px 0px;
  border: 1px solid #08adaa;
}

.el-input__wrapper.is-focus {
  border: 1px solid #08adaa;
}
</style> -->
