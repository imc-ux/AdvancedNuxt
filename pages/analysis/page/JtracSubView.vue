<script lang="ts" setup>
import { provide, ref, onMounted } from 'vue';
import { format, differenceInDays, addDays } from 'date-fns';
import {
  ChartComponent as EjsChart,
  SeriesCollectionDirective as ESeriesCollection,
  SeriesDirective as ESeries,
  Legend,
  ColumnSeries,
  LineSeries,
  Category,
  Tooltip,
} from '@syncfusion/ej2-vue-charts';
import { ButtonComponent as EjsButton } from '@syncfusion/ej2-vue-buttons';
import { DropDownListComponent as EjsDropdownlist } from '@syncfusion/ej2-vue-dropdowns';
import { MultiSelectComponent as EjsMultiselect } from '@syncfusion/ej2-vue-dropdowns';
import { DateRangePickerComponent as EjsDaterangepicker } from '@syncfusion/ej2-vue-calendars';
import { GridComponent as EjsGrid, ColumnsDirective as EColumns, ColumnDirective as EColumn } from '@syncfusion/ej2-vue-grids';
import column from '@/static/images/column.png';
import line from '@/static/images/line.png';
import { useJtracSubViewStore } from '../../../stores';

const countItemData = [
  { name: '前台负责人', id: 'A' },
  { name: '状态', id: 'B' },
  { name: '系统区分', id: 'C' },
];

const today = new Date();
const startDate = ref(addDays(new Date(), -7));
const endDate = ref(new Date());
const showUserType = ref(false);
const lineType = ref(false);
const selectCount = ref<any>('B');
const selectUser = ref<any>([]);
const countItemFields = { text: 'name', value: 'id' };
const userfields = { text: 'name', value: 'id' };
const jtracStore = useJtracSubViewStore();
const primaryXAxis = ref<any>({ valueType: 'Category', interval: 1 });
const primaryXYAxis = ref<any>({
  valueType: 'Category',
  title: '计数',
});
const tooltip = ref<any>({
  enable: true,
  format: '${point.x} : <b>${point.y}</b>',
});
const marker = ref<any>({ visible: true, width: 10, height: 10, shape: 'Diamond' });
const title = '上传数据分析';
provide('chart', [ColumnSeries, Category, Legend, Tooltip, LineSeries]);

onMounted(() => {
  const info: any = {};
  info.blockflag = 'N';
  info.usertype = 'U';
  info.iStart = 0;
  info.iPageCount = 20;
  jtracStore.getUserList(info);
});

function onCountItemChangeHandler(data) {
  if (data.value === 'A') {
    showUserType.value = true;
  } else {
    showUserType.value = false;
  }
}

function onImgClickHandler(data) {
  if (data === 'column') {
    lineType.value = true;
  } else {
    lineType.value = false;
  }
}

function onSearchHandlerClick() {
  jtracStore.dayList = enumerateDaysBetweenDates(startDate.value, endDate.value);
  jtracStore.type = selectCount.value;
  jtracStore.selectUser = selectUser.value;
  const info: any = {};
  info.fromDate = startDate.value;
  info.toDate = endDate.value;
  info.type = selectCount.value;
  jtracStore.getJtracStatsList(info);
}

function enumerateDaysBetweenDates(startDate: any, endDate: any) {
  const days = differenceInDays(new Date(endDate), new Date(startDate));
  let arr: any = [];
  for (let i = 0; i <= days; i++) {
    const data: any = {};
    data.name = format(addDays(new Date(startDate), i), 'yyyy-MM-dd');
    data.file = `date${i}`;
    arr.push(data);
  }
  return arr;
}

function onResetHandlerClick() {
  startDate.value = addDays(new Date(), -7);
  endDate.value = new Date();
  selectCount.value = 'B';
  selectUser.value = [];
}
</script>

<template>
  <div style="width: 100%">
    <div style="display: flex" class="mp-top-box">
      <div style="display: flex; flex-grow: 1; width: 200px">
        <span style="width: 60px; margin-left: 10px">时间</span>
        <div style="width: 100%; height: 36px; margin-left: 5px; margin-right: 5px">
          <ejs-daterangepicker
            v-model:startDate="startDate"
            v-model:endDate="endDate"
            v-model:max="today"
            :showClearButton="false"
            style="height: 28px"
          ></ejs-daterangepicker>
        </div>
      </div>
      <div style="display: flex; flex-grow: 1; width: 600px">
        <span style="width: 120px; margin-left: 10px">计数项目</span>
        <div style="width: 100%; margin-left: 5px; margin-right: 5px">
          <ejs-dropdownlist
            id="combobox"
            :dataSource="countItemData"
            :fields="countItemFields"
            v-model:value="selectCount"
            @change="onCountItemChangeHandler"
            :showClearButton="false"
            style="height: 28px"
          ></ejs-dropdownlist>
        </div>
      </div>

      <div style="display: flex; flex-grow: 1" v-show="showUserType">
        <span style="width: 120px; margin-left: 10px">前台负责人</span>
        <div style="width: 400px; margin-left: 5px; margin-right: 5px">
          <ejs-multiselect
            id="multiselect"
            :dataSource="jtracStore.userListResult"
            :fields="userfields"
            v-model:value="selectUser"
            placeholder="--请选择--"
          ></ejs-multiselect>
        </div>
      </div>
    </div>
    <div style="display: flex; margin-top: 5px">
      <div style="justify-content: flex-start; display: flex; flex-grow: 1">
        <img
          v-if="lineType"
          style="width: 25px; height: 25px; cursor: pointer"
          :src="column"
          :fit="'fill'"
          @click="() => onImgClickHandler('line')"
        />
        <img
          v-else
          style="width: 25px; height: 25px; cursor: pointer; margin-left: 5px"
          :src="line"
          :fit="'fill'"
          @click="() => onImgClickHandler('column')"
        />
      </div>
      <div style="justify-content: flex-end; display: flex; margin-top: 5px">
        <ejs-button type="submit" @click="onSearchHandlerClick">Search</ejs-button>
        <ejs-button type="reset" @click="onResetHandlerClick" style="margin-left: 5px">Reset</ejs-button>
      </div>
    </div>
    <div style="width: 100%; overflow-x: auto; padding-bottom: 10px">
      <div :style="jtracStore?.headerDivWidth" v-show="jtracStore?.jtracChartData && jtracStore?.jtracChartData.length > 0">
        <ejs-chart :width="jtracStore?.headerGridWidth" height="350px" v-if="lineType" :title="title" :primaryXAxis="primaryXAxis" :tooltip="tooltip">
          <e-series-collection>
            <e-series
              v-for="item in jtracStore?.jtracChartHeads"
              :dataSource="jtracStore?.jtracChartData"
              type="Line"
              xName="name"
              :yName="item.yName"
              :name="item.name"
              :marker="marker"
            >
            </e-series>
          </e-series-collection>
        </ejs-chart>
        <ejs-chart v-else :width="jtracStore?.headerGridWidth" height="350px" :title="title" :primaryXAxis="primaryXYAxis" :tooltip="tooltip">
          <e-series-collection>
            <e-series
              v-for="item in jtracStore?.jtracChartHeads"
              :dataSource="jtracStore?.jtracChartData"
              type="Column"
              xName="name"
              :yName="item.yName"
              :name="item.name"
            ></e-series>
          </e-series-collection>
        </ejs-chart>
      </div>
      <ejs-grid
        v-if="jtracStore?.jtracGridsData?.length > 0"
        :width="jtracStore?.headerGridWidth"
        ref="grid"
        :dataSource="jtracStore?.jtracGridsData"
      >
        <e-columns>
          <e-column
            v-for="item in jtracStore?.dayList"
            :field="item.file"
            :headerText="item.name"
            textAlign="Center"
            width="100"
            minWidth="100"
          ></e-column>
        </e-columns>
      </ejs-grid>
    </div>
  </div>
</template>
<style>
#container {
  height: 350px;
}

.e-ddl-hidden {
  color: #000;
}
</style>
