<script lang="ts" setup>
import { QuillEditor, Delta } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { Back, Plus, Folder } from '@element-plus/icons-vue';
import { onMounted, onUnmounted, ref, reactive, watch } from 'vue';
import { useSettingsStore } from '../../stores';
import { Settings } from '../../constant/Service';
import { ElUpload, ElOption, ElTabs, ElTabPane, ElInput } from 'element-plus';
import type { TabPaneName, TabsPaneContext } from 'element-plus';
import { SaveTemplateInfo } from '@@/vo';
import { ShowAlert } from '../../components/alert';
import { CommonAlert } from '../../constant/alert/base';
import { subMenuTypes } from '../../constant/commonConstant.ts';
import { deepCopy } from '../../api/util';

const router = useRouter();
const settingState = useSettingsStore();

const templateList = ref([]);
const activeTabName = ref('');
const editorContent = ref('');
const testEditorContent = ref('');
const typeInput = ref('');

let orgTemplateList = [];
let onMountedFlag = true;

onMounted(() => {
  searchAllMenuTemplate();
  window.addEventListener('message', themeChangeHandler, false);
  initialTheme();
});

onUnmounted(() => {
  unsubscribe();
  window.removeEventListener('message', themeChangeHandler, false);
});

watch(activeTabName, (newVal: string) => {
  const showContent = templateList.value.find(item => item.type === newVal)?.template ?? '';
  editorContent.value = setQuillDeltaData(showContent);
});

const unsubscribe = settingState.$onAction(({ name, store, after }) => {
  after(() => {
    if (name === Settings.GetValidateMenuTemplate) {
      const respond = store.$state.getMenuTemplateResult;
      if (!respond) {
        return;
      }
      if (respond.error) {
        return;
      }
      templateList.value = deepCopy(respond.data);
      orgTemplateList = deepCopy(respond.data);
      activeTabName.value = respond.data[0].type;
      editorContent.value = setQuillDeltaData(respond.data[0].template);
    }
    if (name === Settings.AddTemplate) {
      const respond = store.$state.addTemplateResult;
      if (!respond) {
        return;
      }
      if (respond.error) {
        return;
      }
      ShowAlert(CommonAlert.SAVE_DATA);
      searchAllMenuTemplate();
    }
    if (name === Settings.DeleteMenuTemplate) {
      const respond = store.$state.deleteMenuTemplateResult;
      if (!respond) {
        return;
      }
      if (respond.error) {
        return;
      }
      ShowAlert(CommonAlert.DELETE_SUCCESS);
      searchAllMenuTemplate();
    }
  });
});

const QuillEditorOptions = {
  modules: {
    syntax: {
      highlight: (text: string) => {
        return hljs.highlightAuto(text).value;
      },
    },
    toolbar: [['code-block', 'blockquote']],
  },
  formats: ['code-block'],
};

function themeChangeHandler(e) {
  if (e.data.type === 'theme-changed') {
    document.documentElement.setAttribute('data-bs-theme', e.data.data);
  }
}

function initialTheme(params: type) {
  const currentTheme = getCurrentTheme();
  document.documentElement.setAttribute('data-bs-theme', currentTheme);
}

function searchAllMenuTemplate() {
  settingState.getValidateMenuTemplate('');
}

function onGoBackBtnClickHandler() {
  router.back();
}

function setQuillDeltaData(data: string) {
  return new Delta().insert(data, { 'code-block': 'xml' }).insert('\n', { 'code-block': 'xml' });
}

// function onTabChangeHandler(name: TabPaneName) {
//   const showContent = templateList.value.find(item => item.type === name)?.template ?? '';
//   editorContent.value = showContent;
// }

function onTemplateSaveBtnClickHandler() {
  const saveInfo: SaveTemplateInfo = {};
  saveInfo.type = activeTabName.value;
  let stringContent = '';
  editorContent.value.forEach(item => {
    if (typeof item.insert === 'string') {
      stringContent += item.insert;
    }
  });
  saveInfo.template = stringContent;
  settingState.addTemplate(saveInfo);
}

function onAddBtnClickHandler() {
  if (!typeInput.value) {
    ShowAlert(CommonAlert.TYPE_REQUIRED, 1);
    return;
  }
  if (templateList.value.findIndex(item => item.type === typeInput.value) >= 0) {
    ShowAlert(CommonAlert.REPEATED_DATA, 1);
    return;
  }
  const newTemplate: SaveTemplateInfo = {};
  newTemplate.type = typeInput.value;
  newTemplate.template = '';
  templateList.value.push(newTemplate);
  activeTabName.value = typeInput.value;
}

function onTabRemoveBtnClickHandler(name: TabPaneName) {
  ShowAlert(CommonAlert.CONFIRM_DELETE, 2, onAlertCloseHandler, true);
  function onAlertCloseHandler(data) {
    if (data === 'Y') {
      if (orgTemplateList.findIndex(item => item.type === name) >= 0) {
        settingState.deleteMenuTemplate(name);
      } else {
        const spliceIndex = templateList.value.findIndex(item => item.type === name);
        templateList.value.splice(spliceIndex, 1);
      }
      activeTabName.value = templateList.value[0].type;
    }
  }
}
</script>

<template>
  <ClientOnly>
    <div>
      <Button class="add_types_btn" :btnIcon="Plus" @click="onAddBtnClickHandler"></Button>
      <el-tabs v-model="activeTabName" type="card" class="demo-tabs" @tab-remove="onTabRemoveBtnClickHandler">
        <el-tab-pane
          v-for="item in templateList"
          :key="item.nid"
          :label="item.type"
          :name="item.type"
          :closable="!subMenuTypes.includes(item.type)"
        ></el-tab-pane>
        <el-input v-model="typeInput" class="add_types" placeholder="add type" />
      </el-tabs>
    </div>

    <div flex w-full justify-between>
      <Button :btnIcon="Back" @click="onGoBackBtnClickHandler">返回菜单设置</Button>
      <Button :btnIcon="Folder" @click="onTemplateSaveBtnClickHandler">保存</Button>
    </div>
    <!-- :toolbar="['code-block']" -->
    <QuillEditor theme="snow" :options="QuillEditorOptions" v-model:content="editorContent" />
  </ClientOnly>
</template>

<style scoped></style>
