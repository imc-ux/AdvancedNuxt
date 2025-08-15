<script setup>
import { ref } from 'vue';
import { ListBoxComponent as EjsListbox } from '@syncfusion/ej2-vue-dropdowns';
import OnlineSubView from './page/OnlineSubView.vue';
import JtracSubView from './page/JtracSubView.vue';
import { initialTheme } from '../../api/util';

const showIndex = ref(true);

const data = [
  { text: '用户登录分析', id: 'code1' },
  { text: 'jtrac上传分析', id: 'code2' },
];

onMounted(() => {
  initialTheme();
  window.addEventListener('message', themeChangeHandler, false);
});

onUnmounted(() => {
  window.removeEventListener('message', themeChangeHandler, false);
});

function themeChangeHandler(e) {
  if (e.data.type === 'theme-changed') {
    document.documentElement.setAttribute('data-bs-theme', e.data.data);
  }
}

function listClickHandler(e) {
  if (e.target.id === 'code1') {
    showIndex.value = true;
  } else {
    showIndex.value = false;
  }
}

// ====================测试主题==============================
// const defaultTheme = 'ux-dark';

// let theme = '';

// function changeTheme(themeName) {
//   // 现在的主题，添加data-bs-theme属性
//   theme = themeName;
//   document.documentElement.setAttribute('data-bs-theme', themeName);
// }

// function changeThemeMode(themeMode) {
//   const currentTheme = theme;
//   const themeName = currentTheme !== defaultTheme ? currentTheme.replace(/dark|light/, themeMode) : currentTheme;
//   changeTheme(themeName);
// }

// function onThemeSwitchChangeHandler(e) {
//   if (e.target.checked) {
//     changeTheme('ux-green-light');
//   } else {
//     changeTheme('ux-dark');
//   }
// }

// function onThemeModeSwitchChangeHandler(e) {
//   if (e.target.checked) {
//     changeThemeMode('dark');
//   } else {
//     changeThemeMode('light');
//   }
// }

// ====================测试主题==============================
</script>

<template>
  <div style="display: flex; width: 100%">
    <div class="listbox" @click="listClickHandler">
      <ejs-listbox :dataSource="data"></ejs-listbox>
    </div>
    <div class="listRight">
      <OnlineSubView v-show="showIndex" />
      <JtracSubView v-show="!showIndex" />
    </div>
    <!-- 测试用===================================  -->
    <!-- <div>
      <input type="checkbox" role="switch" id="switchCheckDefault" @change="onThemeSwitchChangeHandler" />
      主题
      <input type="checkbox" role="switch" id="switchCheckDefault" @change="onThemeModeSwitchChangeHandler" />
      亮暗
    </div> -->
    <!-- 测试用===================================  -->
  </div>
</template>

<style>
@import '../../assects/ej2-base/material.css';
@import '../../assects/ej2-buttons/material.css';
@import '../../assects/ej2-inputs/material.css';
@import '../../assects/ej2-popups/material.css';
@import '../../assects/ej2-dropdowns/material.css';
@import '../../assects/ej2-lists/material.css';
@import '../../assects/ej2-vue-dropdowns/material.css';
@import '../../assects/ej2-vue-calendars/material.css';
@import '../../assects/ej2-navigations/material.css';
@import '../../assects/ej2-splitbuttons/material.css';
@import '../../assects/ej2-vue-grids/material.css';

.flex-display {
  display: flex;
}

.listbox {
  display: flex;
  width: 200px;
  min-width: 200px;
  height: 100%;
  flex-shrink: 0;
  background-color: var(--iux-tab-bg);
}

.listRight {
  margin-left: 10px;
  width: 0;
  flex: 1;
}

body {
  background-color: var(--iux-body-bg);
}

.e-listbox-wrapper {
  /* border: 1px solid #e0e0e0; */
  border: 1px solid var(--iux-analysis-tab-border);
}

.e-listbox-wrapper .e-list-item {
  background-color: var(--iux-analysis-tab-bg);
  /* background-color: #fff; */
  color: var(--iux-analysis-tab-color);
  /* color: rgba(0, 0, 0, 0.87); */
}

.e-listbox-wrapper .e-list-item:hover:not(.e-selected):not(.e-disabled) {
  background-color: var(--iux-analysis-tab-hover-bg);
  /* background-color: #eee; */
  color: var(--iux-analysis-tab-hover-color);
  /* color: rgba(0, 0, 0, 0.87); */
}

.e-listbox-wrapper .e-list-item.e-selected {
  background-color: var(--iux-analysis-tab-active-bg);
  /* background-color: #f5f5f5; */
  color: var(--iux-analysis-tab-active-color);
  /* color: rgba(0, 0, 0, 0.87); */
}

.search-condition-box {
  border: 1px solid var(--iux-analysis-search-border);
  /* border: 1px solid #cacaca; */
  color: var(--iux-analysis-search-color);
}

.e-input-group,
.e-input-group.e-control-wrapper {
  color: rgba(0, 0, 0, 0.87);
}

.e-input-group:not(.e-success):not(.e-warning):not(.e-error):not(.e-float-icon-left),
.e-input-group.e-float-icon-left:not(.e-success):not(.e-warning):not(.e-error) .e-input-in-wrap,
.e-input-group.e-control-wrapper:not(.e-success):not(.e-warning):not(.e-error):not(.e-float-icon-left),
.e-input-group.e-control-wrapper.e-float-icon-left:not(.e-success):not(.e-warning):not(.e-error) .e-input-in-wrap,
.e-float-input.e-float-icon-left:not(.e-success):not(.e-warning):not(.e-error) .e-input-in-wrap,
.e-float-input.e-control-wrapper.e-float-icon-left:not(.e-success):not(.e-warning):not(.e-error) .e-input-in-wrap {
  border-color: var(--iux-analysis-input-border);
  /* border-color: rgba(0, 0, 0, 0.42); */
}

.e-multi-select-wrapper .e-delim-values {
  -webkit-text-fill-color: var(--iux-analysis-input-color);
  /* -webkit-text-fill-color: rgba(0, 0, 0, 0.87); */
  color: var(--iux-analysis-input-color);
  /* color: rgba(0, 0, 0, 0.87); */
}

.e-multi-select-wrapper .e-chips-close.e-close-hooker {
  /* color: #ffffff; */
  color: var(--iux-analysis-input-color);
}

.e-input-group:not(.e-float-icon-left):not(.e-float-input)::before,
.e-input-group:not(.e-float-icon-left):not(.e-float-input)::after,
.e-input-group.e-float-icon-left:not(.e-float-input) .e-input-in-wrap::before,
.e-input-group.e-float-icon-left:not(.e-float-input) .e-input-in-wrap::after,
.e-input-group.e-control-wrapper:not(.e-float-icon-left):not(.e-float-input)::before,
.e-input-group.e-control-wrapper:not(.e-float-icon-left):not(.e-float-input)::after,
.e-input-group.e-control-wrapper.e-float-icon-left:not(.e-float-input) .e-input-in-wrap::before,
.e-input-group.e-control-wrapper.e-float-icon-left:not(.e-float-input) .e-input-in-wrap::after {
  /* background: #08adaa; */
  background: var(--iux-analysis-input-focus-border);
}

.e-multi-select-wrapper .e-chips {
  background-color: var(--iux-analysis-tag-bg);
  /* background-color: #eee; */
}

.e-multi-select-wrapper .e-chips > .e-chipcontent {
  -webkit-text-fill-color: var(--iux-analysis-tag-color);
  /* -webkit-text-fill-color: rgba(0, 0, 0, 0.87); */
  color: var(--iux-analysis-tag-color);
  /* color: rgba(0, 0, 0, 0.87); */
}

.e-input-group,
.e-input-group.e-control-wrapper {
  /* color: rgba(0, 0, 0, 0.87); */
  color: var(--iux-analysis-input-color);
}

.e-ddl.e-popup {
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.e-dropdownbase .e-list-item.e-item-focus {
  background-color: var(--iux-analysis-option-focus-bg);
  /* background-color: #eee; */
}

.e-dropdownbase .e-list-item {
  /* color: rgba(0, 0, 0, 0.87); */
  color: var(--iux-analysis-option-color);
  background-color: var(--iux-analysis-option-bg);
  /* background-color: #fff; */
}

.e-dropdownbase .e-list-item.e-hover {
  /* color: rgba(0, 0, 0, 0.87); */
  color: var(--iux-analysis-option-color);
  background-color: var(--iux-analysis-option-hover-bg);
  /* background-color: #eee; */
}

.e-dropdownbase .e-list-item.e-active,
.e-dropdownbase .e-list-item.e-active.e-hover {
  background-color: var(--iux-analysis-option-hover-bg);
  /* background-color: #eee; */
  /* border-color: #fff; */
  color: var(--iux-analysis-option-color);
  /* color: #08adaa; */
}

.e-input-group .e-input-group-icon,
.e-input-group.e-control-wrapper .e-input-group-icon {
  color: var(--iux-analysis-icon-color);
  /* color: rgba(0, 0, 0, 0.54); */
}

.e-input-group:not(.e-disabled) .e-input-group-icon:hover,
.e-input-group.e-control-wrapper:not(.e-disabled) .e-input-group-icon:hover {
  color: var(--iux-analysis-icon-color);
  /* color: rgba(0, 0, 0, 0.54); */
}

.e-date-range-wrapper .e-input-group-icon.e-icons.e-active {
  /* color: #08adaa; */
  color: var(--iux-analysis-icon-active-color);
}

.e-daterangepicker.e-popup {
  /* background: #fff; */
  background: var(--iux-analysis-date-option-bg);
}

.e-daterangepicker.e-popup .e-range-header {
  background: var(--iux-analysis-date-option-bg);
  /* background: #fff; */
}

.e-daterangepicker.e-popup .e-calendar {
  background-color: var(--iux-analysis-date-option-bg);
  /* background-color: #fff; */
}

.e-daterangepicker.e-popup .e-footer {
  background-color: var(--iux-analysis-date-option-bg);
  /* background-color: #fff; */
}

.e-daterangepicker.e-popup .e-change-icon {
  color: var(--iux-analysis-date-option-color);
  /* color: rgba(0, 0, 0, 0.74); */
}

.e-calendar .e-content td.e-selected span.e-day,
.e-bigger.e-small .e-calendar .e-content td.e-selected span.e-day {
  background-color: var(--iux-analysis-day-active-bg);
  /* background-color: #08adaa; */
  color: var(--iux-analysis-date-selected-color);
  /* color: #fff; */
}

.e-calendar .e-content td.e-today:hover span.e-day {
  background-color: var(--iux-analysis-date-hover-bg);
  /* background-color: #eee; */
  color: var(--iux-analysis-tody-color);
  /* color: #08adaa; */
}

.e-daterangepicker.e-popup .e-calendar .e-start-date.e-selected.e-range-hover.e-today span.e-day {
  background-color: var(--iux-analysis-day-active-bg);
  /* background-color: #08adaa; */
  color: var(--iux-analysis-date-selected-color);
  /* color: #fff; */
}

.e-calendar .e-content span {
  color: var(--iux-analysis-option-color);
  /* color: rgba(0, 0, 0, 0.87); */
}

.e-daterangepicker.e-popup .e-calendar .e-header .e-title {
  color: var(--iux-analysis-date-option-color);
}

.e-daterangepicker.e-popup .e-start-label,
.e-daterangepicker.e-popup .e-end-label {
  color: var(--iux-analysis-date-option-color);
}

.e-daterangepicker.e-popup .e-calendar .e-header .e-title:hover {
  color: var(--iux-analysis-option-hover-color);
  /* color: rgba(0, 0, 0, 0.87); */
}

.e-calendar .e-content td:hover span.e-day {
  background-color: var(--iux-analysis-date-hover-bg);
}

.e-calendar th {
  color: var(--iux-analysis-option-color);
}

.e-calendar .e-date-icon-prev,
.e-calendar .e-date-icon-next {
  color: var(--iux-analysis-date-option-color);
  /* color: rgba(0, 0, 0, 0.54); */
}

.e-daterangepicker.e-popup .e-day-span {
  color: var(--iux-analysis-date-option-color);
}

.e-calendar .e-header .e-prev:hover > span,
.e-calendar .e-header .e-next:hover > span {
  color: var(--iux-analysis-option-hover-color);
  /* color: rgba(0, 0, 0, 0.75); */
}

.e-daterangepicker.e-popup .e-separator {
  background-color: var(--iux-analysis-option-devider);
  /* background-color: rgba(0, 0, 0, 0.12); */
}

.e-daterangepicker.e-popup .e-calendar-container .e-left-container {
  border-right: var(--iux-analysis-option-devider);
  /* border-right: 1px solid rgba(0, 0, 0, 0.12); */
}

.e-daterangepicker.e-popup .e-calendar .e-content .e-range-hover,
.e-bigger.e-small .e-daterangepicker.e-popup .e-calendar .e-content .e-range-hover,
.e-bigger.e-small.e-daterangepicker.e-popup .e-calendar .e-content .e-range-hover {
  background-color: var(--iux-analysis-date-range-hover-bg);
  /* background-color: #eee; */
  color: var(--iux-analysis-year-color);
  /* color: rgba(0, 0, 0, 0.87); */
}

.e-daterangepicker.e-popup .e-calendar .e-content .e-range-hover span {
  background-color: var(--iux-analysis-date-range-hover-bg);
}

.e-bigger.e-small .e-daterangepicker.e-popup .e-calendar .e-content .e-range-hover span,
.e-bigger.e-small.e-daterangepicker.e-popup .e-calendar .e-content .e-range-hover span {
  background-color: var(--iux-analysis-option-hover-bg);
  /* background-color: #eee; */
  color: var(--iux-analysis-year-color);
  /* color: rgba(0, 0, 0, 0.87); */
}

.e-daterangepicker.e-popup .e-calendar .e-end-date.e-selected.e-range-hover span.e-day,
.e-daterangepicker.e-popup .e-calendar .e-start-date.e-selected.e-range-hover span.e-day,
.e-bigger.e-small .e-daterangepicker.e-popup .e-calendar .e-end-date.e-selected.e-range-hover span.e-day,
.e-bigger.e-small .e-daterangepicker.e-popup .e-calendar .e-start-date.e-selected.e-range-hover span.e-day,
.e-bigger.e-small.e-daterangepicker.e-popup .e-calendar .e-end-date.e-selected.e-range-hover span.e-day,
.e-bigger.e-small.e-daterangepicker.e-popup .e-calendar .e-start-date.e-selected.e-range-hover span.e-day {
  /* background-color: #08adaa; */
  background-color: var(--iux-analysis-day-active-bg);
  /* color: #fff; */
}

.e-daterangepicker.e-popup .e-calendar .e-range-hover.e-today:hover span.e-day,
.e-daterangepicker.e-popup .e-calendar .e-range-hover.e-focused-date.e-today span.e-day,
.e-daterangepicker.e-popup .e-calendar .e-range-hover.e-start-date.e-selected.e-today span.e-day,
.e-daterangepicker.e-popup .e-calendar .e-range-hover.e-end-date.e-selected.e-today span.e-day,
.e-bigger.e-small .e-daterangepicker.e-popup .e-calendar .e-range-hover.e-today:hover span.e-day,
.e-bigger.e-small .e-daterangepicker.e-popup .e-calendar .e-range-hover.e-focused-date.e-today span.e-day,
.e-bigger.e-small .e-daterangepicker.e-popup .e-calendar .e-range-hover.e-start-date.e-selected.e-today span.e-day,
.e-bigger.e-small .e-daterangepicker.e-popup .e-calendar .e-range-hover.e-end-date.e-selected.e-today span.e-day,
.e-bigger.e-small.e-daterangepicker.e-popup .e-calendar .e-range-hover.e-today:hover span.e-day,
.e-bigger.e-small.e-daterangepicker.e-popup .e-calendar .e-range-hover.e-focused-date.e-today span.e-day,
.e-bigger.e-small.e-daterangepicker.e-popup .e-calendar .e-range-hover.e-start-date.e-selected.e-today span.e-day,
.e-bigger.e-small.e-daterangepicker.e-popup .e-calendar .e-range-hover.e-end-date.e-selected.e-today span.e-day {
  /* border: 1px solid #08adaa; */
  border: 1px solid var(--iux-analysis-day-active-border);
}

.e-daterangepicker.e-popup .e-calendar .e-content .e-other-month.e-range-hover,
.e-daterangepicker.e-popup .e-calendar .e-content .e-other-month.e-selected,
.e-bigger.e-small .e-daterangepicker.e-popup .e-calendar .e-content .e-other-month.e-range-hover,
.e-bigger.e-small .e-daterangepicker.e-popup .e-calendar .e-content .e-other-month.e-selected,
.e-bigger.e-small.e-daterangepicker.e-popup .e-calendar .e-content .e-other-month.e-range-hover,
.e-bigger.e-small.e-daterangepicker.e-popup .e-calendar .e-content .e-other-month.e-selected {
  background-color: var(--iux-analysis-date-option-bg);
  /* background-color: #fff; */
  /* color: rgba(0, 0, 0, 0.38); */
  /* color: rgba(0, 0, 0, 0.38); */
}

.e-bigger.e-small .e-daterangepicker.e-popup .e-calendar .e-content.e-month .e-today.e-range-hover span,
.e-bigger.e-small.e-daterangepicker.e-popup .e-calendar .e-content.e-month .e-today.e-range-hover span {
  background-color: var(--iux-analysis-option-hover-bg);
  /* background-color: #eee; */
  border: 1px solid var(--iux-analysis-day-active-border);
  /* border: 1px solid #08adaa; */
  color: var(--iux-analysis-tody-color);
  /* color: #08adaa; */
}

.e-daterangepicker.e-popup .e-calendar .e-content.e-month .e-today.e-range-hover span {
  background-color: var(--iux-analysis-day-active-bg);
}

.e-daterangepicker.e-popup .e-calendar .e-content.e-month .e-today.e-range-hover span {
  border: 1px solid var(--iux-analysis-day-active-border);
  /* border: 1px solid #08adaa; */
  color: var(--iux-analysis-date-selected-color);
  /* color: #08adaa; */
}

.e-bigger.e-small .e-calendar .e-content td.e-today span.e-day,
.e-bigger.e-small .e-calendar .e-content td.e-focused-date.e-today span.e-day {
  border: 1px solid var(--iux-analysis-tody-border);
  /* border: 1px solid #08adaa; */
  color: var(--iux-analysis-tody-color);
  /* color: #08adaa; */
}

.e-calendar .e-content td.e-selected:hover span.e-day {
  color: var(--iux-analysis-date-selected-color);
}

.e-calendar .e-content td.e-today span.e-day,
.e-calendar .e-content td.e-focused-date.e-today span.e-day {
  color: var(--iux-analysis-date-selected-color);
}

.e-calendar .e-content td.e-selected.e-focused-date span.e-day,
.e-calendar .e-content td.e-today.e-selected:hover span.e-day,
.e-calendar .e-content td.e-selected:hover span.e-day,
.e-calendar .e-content td.e-selected.e-focused-date span.e-day {
  background-color: var(--iux-analysis-day-active-bg);
  /* background-color: #08adaa; */
  /* color: #fff; */
}

.e-calendar .e-content td.e-today span.e-day {
  border: 1px solid var(--iux-analysis-tody-border);
  color: var(--iux-analysis-tody-color);
  /* border: 1px solid #08adaa; */
  /* color: #08adaa; */
}

.e-daterangepicker.e-popup .e-calendar .e-content .e-range-hover span {
  color: var(--iux-analysis-option-color);
}

.e-calendar .e-content td.e-today.e-selected span.e-day,
.e-calendar .e-content td.e-today:hover span.e-day,
.e-calendar .e-content td.e-focused-date.e-today:hover span.e-day {
  border: 1px solid var(--iux-analysis-day-active-border);
  /* border: 1px solid #08adaa; */
  /* box-shadow: inset 0 0 0 2px #fff; */
}

.e-calendar .e-content.e-year td > span.e-day,
.e-calendar .e-content.e-decade td > span.e-day,
.e-bigger.e-small .e-calendar .e-content.e-year td > span.e-day,
.e-bigger.e-small .e-calendar .e-content.e-decade td > span.e-day {
  background: var(--iux-analysis-year-bg);
  /* background: #fff; */
}

.e-calendar .e-content.e-year td:hover span.e-day,
.e-calendar .e-content.e-decade td:hover span.e-day,
.e-bigger.e-small .e-calendar .e-content.e-year td:hover span.e-day,
.e-bigger.e-small .e-calendar .e-content.e-decade td:hover span.e-day {
  background-color: var(--iux-analysis-date-range-hover-bg);
  /* background-color: var(--iux-analysis-option-hover-bg); */
  /* background-color: #eee; */
}

.e-calendar .e-content td:hover span.e-day,
.e-calendar .e-content td:focus span.e-day,
.e-bigger.e-small .e-calendar .e-content td:hover span.e-day,
.e-bigger.e-small .e-calendar .e-content td:focus span.e-day {
  /* background-color: #eee; */
  /* color: rgba(0, 0, 0, 0.87); */
  color: var(--iux-analysis-year-color);
}

.e-calendar .e-content td.e-focused-date:hover span.e-day,
.e-bigger.e-small .e-calendar .e-content td.e-focused-date:hover span.e-day {
  /* background-color: #eee; */
  /* color: rgba(0, 0, 0, 0.87); */
  color: var(--iux-analysis-year-color);
}

.e-daterangepicker.e-popup .e-calendar .e-range-hover:not(.e-selected):hover span.e-day {
  background-color: var(--iux-analysis-date-range-hover-bg);
  /* background-color: #c8c8c8; */
  color: var(--iux-analysis-date-option-color);
  /* color: rgba(0, 0, 0, 0.87); */
}

.e-calendar .e-content td.e-today.e-selected span.e-day {
  background-color: var(--iux-analysis-day-active-bg);
  /* background-color: #08adaa; */
  color: var(--iux-analysis-date-selected-color);
  /* color: #fff; */
}

.e-daterangepicker.e-popup .e-calendar .e-end-date.e-selected.e-range-hover span.e-day,
.e-daterangepicker.e-popup .e-calendar .e-start-date.e-selected.e-range-hover span.e-day {
  color: var(--iux-analysis-date-selected-color);
}

.e-btn.e-flat,
.e-css.e-btn.e-flat {
  color: var(--iux-datepicker-btn-avtive-color);
  /* color: rgba(0, 0, 0, 0.87); */
}

.e-btn.e-flat.e-primary,
.e-css.e-btn.e-flat.e-primary {
  /* color: #08adaa; */
  color: var(--iux-datepicker-btn-avtive-color);
}

.e-btn.e-flat.e-primary:hover,
.e-css.e-btn.e-flat.e-primary:hover {
  background: var(--iux-datepicker-btn-hover-bg);
  /* background: rgba(227, 22, 91, 0.04); */
  color: var(--iux-datepicker-btn-avtive-color);
  /* color: #08adaa; */
}

.e-btn.e-flat:hover,
.e-css.e-btn.e-flat:hover {
  background: var(--iux-datepicker-btn-hover-bg);
  /* background: rgba(0, 0, 0, 0.0348); */
  color: var(--iux-datepicker-btn-avtive-color);
  /* color: rgba(0, 0, 0, 0.87); */
}

.e-btn,
.e-css.e-btn {
  background: var(--iux-analysis-btn-bg);
  /* background: #fafafa; */
  /* box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12); */
  color: var(--iux-analysis-btn-color);
  /* color: rgba(0, 0, 0, 0.87); */
}

.e-btn:focus,
.e-css.e-btn:focus {
  /* background: rgba(0, 0, 0, 0.18); */
  background: var(--iux-analysis-btn-bg);
  /* color: rgba(0, 0, 0, 0.87); */
  color: var(--iux-analysis-btn-color);
  /* box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12); */
}

.e-grid .e-gridheader {
  border-bottom-color: var(--iux-analysis-table-border);
  /* border-bottom-color: #e0e0e0; */
  border-top-color: var(--iux-analysis-table-border);
  /* border-top-color: #e0e0e0; */
  color: var(--iux-analysis-table-color);
  /* color: rgba(0, 0, 0, 0.54); */
}

.e-grid .e-headercontent {
  border-color: var(--iux-analysis-table-border);
}

.e-grid .e-table {
  background-color: var(--iux-analysis-table-bg);
  /* background-color: #fff; */
}

.e-grid .e-headercell,
.e-grid .e-detailheadercell {
  background-color: var(--iux-analysis-table-bg);
  /* background-color: #fff; */
  border-color: var(--iux-analysis-table-border);
  /* border-color: #e0e0e0; */
}

.e-grid .e-rowcell:not(.e-editedbatchcell):not(.e-updatedtd),
.e-grid .e-detailrowcollapse:not(.e-editedbatchcell):not(.e-updatedtd),
.e-grid .e-detailrowexpand:not(.e-editedbatchcell):not(.e-updatedtd),
.e-grid .e-gridcontent .e-rowdragdrop:not(.e-editedbatchcell):not(.e-updatedtd),
.e-grid .e-gridheader .e-rowdragdrop:not(.e-editedbatchcell):not(.e-updatedtd),
.e-grid .e-emptyrow:not(.e-editedbatchcell):not(.e-updatedtd) {
  color: var(--iux-analysis-table-color);
  /* color: rgba(0, 0, 0, 0.87); */
}

.e-grid {
  border-color: var(--iux-analysis-table-border);
  /* border-color: #e0e0e0; */
}

.e-grid.e-gridhover
  .e-row
  tr:not(.e-disable-gridhover):not(.e-editedrow):not(.e-detailrow):hover
  .e-rowcell:not(.e-cellselectionbackground):not(.e-active):not(.e-updatedtd):not(.e-indentcell),
.e-grid.e-gridhover
  .e-row:not(.e-disable-gridhover):not(.e-editedrow):not(.e-detailrow):hover
  .e-rowcell:not(.e-cellselectionbackground):not(.e-active):not(.e-updatedtd):not(.e-indentcell),
.e-grid.e-gridhover
  .e-row:not(.e-disable-gridhover):not(.e-detailrow):hover
  .e-detailrowcollapse:not(.e-cellselectionbackground):not(.e-active):not(.e-updatedtd):not(.e-indentcell),
.e-grid.e-gridhover
  .e-row:not(.e-disable-gridhover):not(.e-detailrow):hover
  .e-rowdragdrop:not(.e-cellselectionbackground):not(.e-active):not(.e-updatedtd):not(.e-indentcell),
.e-grid.e-rtl
  .e-gridhover
  .e-row:not(.e-disable-gridhover):not(.e-detailrow):hover
  .e-rowdragdrop:not(.e-cellselectionbackground):not(.e-active):not(.e-updatedtd):not(.e-indentcell),
.e-grid.e-gridhover
  .e-row:not(.e-disable-gridhover):not(.e-detailrow):hover
  .e-detailrowexpand:not(.e-cellselectionbackground):not(.e-active):not(.e-updatedtd):not(.e-indentcell) {
  background-color: var(--iux-analysis-table-hover-bg);
  /* background-color: #eee; */
  color: var(--iux-analysis-table-color);
  /* color: #000; */
}

.e-multi-select-wrapper input[type='text'] {
  color: var(--iux-analysis-input-color);
}

.e-multi-select-wrapper input[type='text']::-webkit-input-placeholder {
  color: var(--iux-analysis-input-color);
}

.e-input-group:hover:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled):not(.e-float-icon-left),
.e-input-group.e-control-wrapper:hover:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled):not(.e-float-icon-left),
.e-float-input.e-control-wrapper:hover:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled):not(.e-float-icon-left),
.e-float-input:hover:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled):not(.e-float-icon-left),
.e-input-group.e-float-icon-left:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled) .e-input-in-wrap:hover,
.e-input-group.e-control-wrapper.e-float-icon-left:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled) .e-input-in-wrap:hover,
.e-float-input.e-float-icon-left:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled) .e-input-in-wrap:hover,
.e-float-input.e-control-wrapper.e-float-icon-left:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled) .e-input-in-wrap:hover,
.e-float-input:hover:not(.e-input-group):not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled) input:not([disabled]),
.e-float-input:hover:not(.e-input-group):not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled) textarea:not([disabled]),
.e-float-input.e-control-wrapper:hover:not(.e-input-group):not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled) input:not([disabled]),
.e-float-input.e-control-wrapper:hover:not(.e-input-group):not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled) textarea:not([disabled]),
.e-float-input.e-control-wrapper.e-float-icon-left:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled) .e-input-in-wrap:hover {
  border-color: var(--iux-analysis-input-hover-border);
}
</style>
