<script lang="ts" setup>
import {
  RefreshLeft, Folder, Plus
} from "@element-plus/icons-vue";
import { onMounted, onUnmounted, ref, reactive } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import { CommonAlert } from '../../constant/alert/base';
import { useSettingsStore } from '../../stores';
import { Settings } from '../../constant/Service';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ElUpload, ElOption, ElTabs, ElTabPane, ElInput } from 'element-plus';
import type { TabPaneName } from 'element-plus';
import { ShowAlert } from '../../components/alert';
import { add } from "lodash";
import { SERVER_URL } from '../../api/request'

const CONTENT_IMG_TYPE = /<img [^>]*src=['"]([^'"]+)[^>]*>/g;
const SRC_REGEX = /(?<=src=").*?(?=")/g;
const REMOTE_URL = `${SERVER_URL}/upload-menu-file`;
// const REMOTE_URL = `http://109.14.20.45:6636/ux/upload-menu-file`;
// const FIXED_TYPE = [
//   { title: 'business', name: '1' },
//   { title: 'notice', name: '2' },
//   { title: 'management', name: '3' },

// ];
// const CURRENT_LENGTH = FIXED_TYPE.length

const settingsState = useSettingsStore();

const content = ref<string>('');
// const type = ref<string[]>([]);
// const currentText = ref<string>('');
const input = ref<string>('');
const tabIndex = ref<number>(0);
const editableTabsValue = ref('0');
const fileUrl = ref<string>('');
const editableTabs = reactive<any[]>([]);
const fixedTabs = reactive<any[]>([]);
const currentTabs = ref<any[]>([]);
const validateData = ref<any[]>([]);


onMounted(() => {
  // const info: any = {};
  // info.userId = 'kangjiaqi';
  // info.pageId = "jtrac";
  settingsState.getAllType('');
  settingsState.getValidateNotice('');
});

onUnmounted(() => {
  unsubscribe();
});

const unsubscribe = settingsState.$onAction(({ name, store, after }) => {
  after(() => {
    if (name === Settings.GetValidateNotice) {
      const respond = store.$state.getValidateNoticeResult;
      if (!respond) {
        return;
      }
      if (!respond.error) {
        validateData.value = respond.data;
        // let currentType = '';
        // currentTabs.value.forEach(data => {
        //   if (data.name === editableTabsValue.value) {
        //     currentType = data.title;
        //   }
        // })
        // respond.data.forEach(info => {
        //   if (info.type === currentType) {
        //     content.value = info.content;
        //   }
        // })
        matching(respond.data, editableTabsValue.value)
      }
    }
    if (name === Settings.AddNewNotice) {
      const respond = store.$state.addNewNoticeResult;
      if (!respond) {
        ShowAlert(CommonAlert.INTERNET_ERROR, 3)
        return;
      }
      if (!respond.error) {
        ShowAlert(CommonAlert.SAVE_DATA)
        //保存成功通知菜单更新
        const bc = new BroadcastChannel('menu_channel');
        bc.postMessage('menuResorceChanged');
        bc.close();
      }
    }
    if (name === Settings.GetAllType) {
      const respond = store.$state.getAllTypeResult;
      if (!respond) {
        return;
      }
      if (!respond.error) {
        let type: number = 1;
        respond.data.forEach((data, index) => {
          let typeInfo: any = {};
          typeInfo.title = data;
          typeInfo.name = `${type++}`;
          if (index < 4) {
            fixedTabs.push(typeInfo);
          } else {
            editableTabs.push(typeInfo);
          }
        })
        currentTabs.value = [...fixedTabs, ...editableTabs];
        editableTabsValue.value = String(respond.data.length);
      }
    }
    if (name === Settings.DeleteNotice) {
      const respond = store.$state.deleteNoticeResult;
      if (!respond) {
        ShowAlert(CommonAlert.INTERNET_ERROR, 3)
        return;
      }
    }
  });
});


const addTab = (targetName: string) => {
  tabIndex.value = editableTabs.length + fixedTabs.length;
  let addNewtab = true;
  const newTabName = `${++tabIndex.value}`;
  editableTabs.forEach(data => {
    if (input.value === data.title) {
      ShowAlert(CommonAlert.REPEATED_DATA, 1)
      addNewtab = false;
    }
  })
  if (addNewtab) {
    editableTabs.push({
      title: input.value,
      name: newTabName,
    })
    editableTabsValue.value = newTabName;
  }
}

const removeTab = (targetName: any) => {
  const tabs = editableTabs
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }
  editableTabsValue.value = activeName;
  for (let i = 0; i < editableTabs.length; i++) {
    if (targetName === editableTabs[i].name) {
      settingsState.deleteNotice(editableTabs[i].title);
      // settingsState.deleteNotice('公告');
      editableTabs.splice(i, 1);
    }
  }
}

const changeTab = (targetName: any) => {
  // let type = '';
  // currentTabs.value.forEach(data => {
  //   if (data.name === targetName) {
  //     type = data.title;
  //   }
  // })
  // validateData.value.forEach(info => {
  //   if (info.type === type) {
  //     content.value = info.content;
  //   }
  // })
  matching(validateData.value, targetName)
}

function matching(arr: any[], key: string) {
  let currentType = '';
  currentTabs.value.forEach(data => {
    if (data.name === key) {
      currentType = data.title;
    }
  })
  arr.forEach(info => {
    if (info.type === currentType) {
      content.value = info.content;
    }
  })
}

// const handleTabsEdit = (
//   targetName: any,
//   action: 'remove' | 'add'
// ) => {
//   tabIndex.value = editableTabs.length;
//   if (action === 'add') {
//     let addNewtab = true;
//     const newTabName = `${++tabIndex.value}`;
//     editableTabs.forEach(data => {
//       if (input.value === data.title) {
//         ShowAlert(CommonAlert.REPEATED_DATA, 1)
//         addNewtab = false;
//       } 
//     })
//     if (addNewtab) {
//       editableTabs.push({
//         title: input.value,
//         name: newTabName,
//       })
//       editableTabsValue.value = newTabName;
//     }
//   } else if (action === 'remove') {
//     const tabs = editableTabs;
//     let activeName = editableTabsValue.value;
//     if (activeName === targetName) {
//       tabs.forEach((tab, index) => {
//         if (tab.name === targetName) {
//           const nextTab = tabs[index + 1] || tabs[index - 1];
//           if (nextTab) {
//             activeName = nextTab.name;
//           }
//         }
//       })
//     }
//     editableTabsValue.value = activeName;
//     for (let i = 0; i < editableTabs.length; i++) {
//       if (targetName === editableTabs[i].name) {
//         editableTabs.splice(i, 1)
//       }
//     }
//   }

//   // console.log(tabIndex)
//   // console.log(editableTabs)
// }

async function onBtnSaveClickHandler() {
  const info: any = {};
  let index: number = 0;
  index = Number(editableTabsValue.value) - 1;
  if (index < fixedTabs.length) {
    info.type = fixedTabs[index]?.title;
  } else {
    info.type = editableTabs[index - fixedTabs.length]?.title;
  }
  if (CONTENT_IMG_TYPE.test(content.value)) {
    let base64Str = getCurrentString(getCurrentString(content.value, 'after'), 'before');
    await uploadImage(dataURLtoFile(base64Str, 'jpg'));
    content.value = content.value.replace(SRC_REGEX, `${document.location.protocol}//${document.location.host}${fileUrl.value}`)
    info.content = content.value;
  } else {
    info.content = content.value;
  }
  settingsState.addNewNotice(info);
}


function onBtnResetClickHandler() {
  content.value = content.value.replace(/<[^<>]+>/g, '');
}

function getCurrentString(str: string, position: string) {
  let CurrentString = '';
  if (position === 'before') {
    CurrentString = str.substring(0, str.indexOf('"'))
  } else {
    CurrentString = str.substring(str.indexOf('"') + 1)
  }
  return CurrentString
}

function convertBase64UrlToBlob(urlData: string) {
  let bytes = window.atob(urlData.split(",")[1]); //去掉url的头，并转换为byte
  //处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], {
    type: "image/jpg",
  });
}

function dataURLtoFile(dataurl: any, filename: string) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = window.atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

async function uploadImage(file: any) {
  const formdata = new FormData();
  formdata.append('file', file);
  formdata.append('id', editableTabsValue.value);
  await fetch(REMOTE_URL, {
    method: 'POST',
    body: formdata,
  })
    .then(res => {
      return res.text();
    })
    .then(res => {
      fileUrl.value = JSON.parse(res).data;
      // console.log('==>', fileUrl.value)
    })
}


// function onSelectionChangeHandler(data: any) {
//   if(checkValue(data.delta?.ops)){
//     if (data.delta?.ops.length > 1) {
//       currentText.value = `${data.oldContents.ops[0].insert.replace(/\n/g, '')}${data.delta?.ops[1].insert}`
//     } else {

//       currentText.value = `${data.oldContents.ops[0].insert.replace(/\n/g, '')}${data.delta?.ops[0].insert}`
//     }
//     console.log(currentText.value)
//     console.log(data)
//   }
// }

// function checkValue(data: any): boolean {
//   for (let i = 0; i < data.length; i++) {
//     if (data[i].attributes) return false;
//   }
//   return true;
// }

// function uploadSuccess(response, uploadFile, uploadFiles) {

// }

// function uploadError(error, uploadFile, uploadFiles) {

// }

// const globalOptions = {
//   scrollingContainer: '#editorcontainer',
//   placeholder: '',
//   // or 'bubble'
//   modules: {
//     toolbar: {
//       handlers: {
//         'image': function (value) {
//           if (value) {
//             console.log(123)
//             // document.getElementsByClassName('.avatar-uploader')[0];
//           }
//         }
//       }
//     }
//   }
// }

</script>

<template>
  <client-only>
    <Button class='add_types_btn' :btnIcon="Plus" @click="addTab(editableTabsValue)"></Button>
    <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab" @tab-change="changeTab">
      <el-tab-pane v-for="item in fixedTabs" :key="item.name" :label="item.title" :name="item.name" :closable="false">
      </el-tab-pane>
      <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name" :closable="true">
      </el-tab-pane>
      <el-input v-model="input" class="add_types" placeholder="add type" />
    </el-tabs>
    <!-- <el-select
      class="select"
      v-model="type"
      allow-create
      filterable
      default-first-option
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select> -->
    <div class="button-group">
      <Button :btnIcon="Folder" @click="onBtnSaveClickHandler">保存</Button>
      <Button :btnIcon="RefreshLeft" @click="onBtnResetClickHandler">恢复</Button>
    </div>
    <QuillEditor theme="snow" toolbar="full" v-model:content="content" contentType="html" />
    <!-- <Quill :contentValue="content"/> -->
    <div>{{ content }}</div>
    <!-- <el-upload
      ref="upload"
      :file-list="fileList"
      class="avatar-uploader"
      action="http://109.14.6.244:7777/upload-menu-file"
      name="img"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-error="uploadError">
    </el-upload> -->
  </client-only>
</template>

<style>
.button-group {
  width: 100%;
  justify-content: flex-end;
  display: flex;
}

.rtf-frame:focus {
  content: none;
}

.ql-snow.ql-toolbar button.ql-active .ql-fill,
.ql-snow .ql-toolbar button.ql-active .ql-fill,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
.ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
.ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
  fill: #fff;
  background-color: #08adaa;
  color: #fff;
}

.ql-snow.ql-toolbar button.ql-active,
.ql-snow .ql-toolbar button.ql-active,
.ql-snow.ql-toolbar .ql-picker-label.ql-active,
.ql-snow .ql-toolbar .ql-picker-label.ql-active,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected {
  background-color: #08adaa;
  color: #fff;
}

.ql-snow.ql-toolbar button.ql-active .ql-stroke,
.ql-snow .ql-toolbar button.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
.ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
  stroke: #fff;
  background-color: #08adaa;
  color: #fff;
}

.ql-snow.ql-toolbar button:hover,
.ql-snow .ql-toolbar button:hover,
.ql-snow.ql-toolbar button:focus,
.ql-snow .ql-toolbar button:focus,
.ql-snow.ql-toolbar .ql-picker-label:hover,
.ql-snow .ql-toolbar .ql-picker-label:hover,
.ql-snow.ql-toolbar .ql-picker-item:hover,
.ql-snow .ql-toolbar .ql-picker-item:hover {
  background-color: #08adaa;
  color: #fff;
}

.ql-snow a {
  color: #08adaa;
}

.ql-snow .ql-fill,
.ql-snow .ql-stroke.ql-fill,
.ql-snow .ql-picker {
  color: #000;
}

.ql-snow .ql-stroke {
  stroke: #000
}

.ql-snow .ql-fill,
.ql-snow .ql-stroke.ql-fill {
  fill: #000;
}

.ql-container {
  height: 500px;
}






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
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif, "微软雅黑";
  font-weight: 400;
}

.el-select-dropdown__item {
  color: #000;
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif, "微软雅黑";
  font-weight: 400;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  color: #fff;
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif, "微软雅黑";
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

.el-tabs__new-tab .is-icon-plus {
  color: #08adaa;
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
  right: 42px;
  z-index: 11;
}

.add_types_btn {
  width: 30px !important;
  height: 29px !important;
  position: fixed;
  top: 9px;
  right: 5px;
  z-index: 11;
}

.add_types_btn>span>i {
  margin-left: 0px;
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

/* .el-tabs--card:nth-child(-n + 3)>.el-tabs__header .el-tabs__item.is-active.is-closable .is-icon-close {
  width: 0px;
}

.el-tabs--card:nth-child(-n + 3)>.el-tabs__header .el-tabs__item.is-closable:hover .is-icon-close {
  width: 0px;
} */</style>
