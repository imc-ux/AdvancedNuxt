<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import line from '@/static/images/line.png';
import column from '@/static/images/column.png';
import { useStatisticStore } from '../stores';
import { ShowAlert } from './alert';
import { Settings } from '../constant/Service';
import { format, differenceInDays, addDays } from "date-fns";
import { dateTyle } from './DateRange.vue';

interface Props {
}

const countItemList = [
  { name: '前台负责人', id: 'A' },
  { name: '状态', id: 'B' },
  { name: '系统区分', id: 'C' },
];
const typeList = [
  { type: '待上传', code: 'A', color: '#282C34' },
  { type: '已传45', code: 'B', color: '#08ADAA' },
  { type: '已传IDC', code: 'C', color: '#5470C6' },
]
const TODAY = format(new Date(), 'yyyy-MM-dd');
const WEEK_BEFORE = format((new Date).getTime() - 7 * 24 * 60 * 60 * 1000, 'yyyy-MM-dd');

const props = defineProps<Props>()
const statisticState = useStatisticStore();

const dateFrom = ref<string>('');
const dateTo = ref<string>('');
const selectCount = ref<any>('B');
const chartWidthStr = ref<string>('');
const chartWidth = ref<number>(0); 
const selectUsers = ref<string[]>([]);
const userList = ref<any[]>([]);
const dateValue = ref<dateTyle>(['', '']);
const showUserType = ref<boolean>(false);
const isLine = ref<boolean>(false);
const dimensions = ref<string[]>([]);
const source = ref<any[]>([]);
const series = ref<any[]>([]);
const gridDataList = ref<any[]>([]);
const gridValue = ref<any[]>([]);

onMounted(() => {
  const info: any = {};
  info.blockflag = "N";
  info.usertype = "U";
  info.iStart = 0;
  info.iPageCount = 20;
  statisticState.getUserList(info);
  dateValue.value = [WEEK_BEFORE, TODAY];
  dateFrom.value = WEEK_BEFORE;
  dateTo.value = TODAY;
})

onUnmounted(() => {
  unsubscribe();
});

const unsubscribe = statisticState.$onAction(({ name, store, after }) => {
  after(() => {
    if (name === Settings.GetUserList) {
      const respond = store.$state.userListResult;
      if (!respond) {
        return;
      }
      if (!respond.error) {
        userList.value = respond.data;
      }
    }
    if (name === Settings.GetJtracStatsList) {
      const respond = store.$state.getJtracStatsListResult;
      if (!respond) {
        return;
      }
      if (!respond.error) {
        if (respond.data.length > 0) {
          const currentDates = enumerateDaysBetweenDates(dateFrom.value, dateTo.value);
          currentDates.map(date => { source.value?.push({ date: date.name }) });
          if (selectCount.value === 'A') {
            if (selectUsers.value?.length === 0) {
              respond.data.forEach((data, index) => {
                dimensions.value?.push(data.name)
                source.value.map(el => {
                  el[dimensions.value[index]] = 0;
                })
              })
            } else {
              const currentData: any[] = [];
              respond.data.map(function (data) {
                if (selectUsers.value.includes(data.type)) currentData.push(data);
              })
              currentData.forEach((data, index) => {
                dimensions.value?.push(data.name)
                source.value.map(el => {
                  el[dimensions.value[index]] = 0;
                })
              })
              source.value
            }
          } else if (selectCount.value === 'B') {
            respond.data.forEach((data, index) => {
              typeList.forEach(info => {
                if (info.code === data.type) dimensions.value?.push(info.type)
              })
              source.value.map(el => {
                el[dimensions.value[index]] = 0;
              })
            })
          } else {
            respond.data.forEach((data, index) => {
              dimensions.value?.push(data.name)
              source.value.map(el => {
                el[dimensions.value[index]] = 0;
              })
            })
          }
          if (selectCount.value === 'A' && selectUsers.value.length > 0) {
            const currentList: any[] = []; 
            respond.data.map(function (data){
              if (selectUsers.value.includes(data.type)) currentList.push(data);
            })
            currentList.forEach((data, index) => {
              data.jtracList.forEach(list => {
                list[dimensions.value[index]] = list.totalCount;
                delete list.totalCount;
              })
              source.value.map(el => {
                if (data.jtracList.find(item => item.date === el.date)) {
                  el[dimensions.value[index]] = Number(data.jtracList.find(item => item.date === el.date)[dimensions.value[index]]);
                }
              })
            }) 
          } else {
            respond.data.forEach((data, index) => {
              data.jtracList.forEach(list => {
                list[dimensions.value[index]] = list.totalCount;
                delete list.totalCount;
              })
              source.value.map(el => {
                if (data.jtracList.find(item => item.date === el.date)) {
                  el[dimensions.value[index]] = Number(data.jtracList.find(item => item.date === el.date)[dimensions.value[index]]);
                }
              })
            })             
          }
          series.value = getSeries(dimensions.value, isLine.value);
          gridDataList.value = [];
          currentDates.map((data: any) => gridDataList.value.push(data.name));
          gridValue.value = getGridData();
          chartWidth.value = source.value.length * 170;
          chartWidthStr.value = `width: ${source.value.length * 170}px;margin-top: 20px`;
          if (dimensions.value.length > 0) {
            dimensions.value = ['date', ...dimensions.value];
          }
          if (gridValue.value.length === 0) {
            ShowAlert('无检索结果!', 1);
            return
          }
        } else {
          ShowAlert('无检索结果!', 1);
          return
        }
      }
    }
  });
});

function getGridData() {
  const arr: any[] = [];
  dimensions.value.map((gridLine) => {
    const obj: any = {};
    source.value.forEach(data => {
      obj[data.date] = data[gridLine]
    })
    obj.name = gridLine;
    arr.push(obj);
  })
  return arr;
}

function getSeries(value: any[], isLine: boolean) {
  const arr: any[] = [];
  value.map(function (data) {
    if (data !== 'date') {
      const info: any = isLine ? { type: 'line' } : { type: 'bar' };
      info.color = typeList.find(item => item.type === data)?.color;
      arr.push(info);
    }
  })
  return arr;
}

function onDateChangeHandler(dateArr: dateTyle) {
  dateValue.value = dateArr;
  dateFrom.value = dateValue.value[0] as string ?? '';
  dateTo.value = dateValue.value[1] as string ?? '';
}

function onCountItemChangeHandler(countType: string) {
  if (countType === 'A') {
    showUserType.value = true;
  } else {
    showUserType.value = false;
  }
  selectCount.value = countType;
}

function onChartTypeButtonClickHandler(type: boolean) {
  isLine.value = type;
  series.value = getSeries(dimensions.value, type);
}

function onSelectChangeHandler(userArr: string[]) {
  selectUsers.value = userArr;
}

function onSearchHandlerClick() {
  dimensions.value = [];
  source.value = [];
  const info: any = {};
  info.fromDate = dateFrom.value;
  info.toDate = dateTo.value;
  info.type = selectCount.value;
  statisticState.getJtracStatsList(info);
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
  dateValue.value = [WEEK_BEFORE, TODAY];
  dateFrom.value = WEEK_BEFORE;
  dateTo.value = TODAY;
  selectCount.value = 'B';
  showUserType.value = false;
  selectUsers.value = [];
}

</script>

<template>
  <div class="box-top">
    <div class="box-display-item">
      <div class="box-display-grow">
        <div class="box-width-80 box-title">
          <span>时间</span>
        </div>
        <div class="box-flex-margin">
          <DateRange v-model:date="dateValue" @dateChange="onDateChangeHandler" format="YYYY/MM/DD"
            valueFormat="YYYY-MM-DD" />
        </div>
      </div>
      <div class="box-width-700">
        <div class="box-width-100 box-title">
          计数项目
        </div>
        <div class="box-min-width box-flex-margin">
          <Select class="search-select" v-model:selectValue="selectCount" :dataList="countItemList" placeholder="All"
            @selectChange="onCountItemChangeHandler" :multiple="false" />
        </div>
      </div>
      <div class="select-box-width">
        <div class="box_flex" v-show="showUserType">
          <div class="box-width-100 box-title">
            前台负责人
          </div>
          <div class="last-box-width">
            <Select class="search-select" v-model:selectValue="selectUsers" :dataList="userList" placeholder="All"
              @selectChange="onSelectChangeHandler" :multiple="true" />
          </div>
        </div>
      </div>
    </div>
    <div class="display-full-width">
      <div class="justify-flex">
        <ChartTypeButton :showFirst="isLine" :startUrl="line" :endUrl="column" :fit="'fill'"
          @switchType="onChartTypeButtonClickHandler" />
      </div>
      <div class="justify-flex-end">
        <Button class='btn-icon' @click="onSearchHandlerClick">Search</Button>
        <Button class='btn-icon marginLeft' @click="onResetHandlerClick">Reset</Button>
      </div>
    </div>
  </div>
  <div v-if="dimensions.length > 0">
    <div class="jtrac-bar-chart-title">
      <span>上传数据分析</span>
    </div>
    <Chart :dimensions="dimensions" :source="source" :series="series" :chartWidth="chartWidth" :isLine="isLine"
      :key="chartWidth" />
    <DataGrid :style="chartWidthStr" :dataList="gridDataList" :gridDataList="gridValue" :key="gridDataList" />
  </div>
</template>

<style>
.box-top {
  width: 100%;
  min-width: 1267px;
}

.box-display-item {
  display: flex;
  height: 50px;
  border: 1px solid #cacaca;
  align-items: center;
}

.box-width-700 {
  display: flex;
  width: 700px;
}

.select-box-width {
  display: flex;
  width: 100%;
}

.box_flex {
  display: flex;
  width: 100%;
}

.box-title {
margin-left: 10px;
  color: #606266;
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif, 微软雅黑;
  font-size: 14px;
  font-weight: 600;
  line-height: 32px;
}

.box-width-80 {
  width: 80px;
}

.box-width-100 {
  width: 100px;
}

.box-min-width {
  min-width: 380px;
}

.last-box-width {
  width: 80%
}

.box-display-grow {
  display: flex;
  flex-grow: 0.5;
}

.box-flex-margin {
  margin-left: 0.3125rem;
  margin-right: 5.5rem;
  flex-grow: 1;
}

.display-full-width {
  display: flex;
  width: 100%
}

.search-select {
  width: 100%;
  max-height: 32px;
}

.justify-flex {
  justify-content: flex-start;
  display: flex;
  flex-grow: 1
}

.justify-flex-end {
  justify-content: flex-end;
  display: flex;
}

.btn-icon>span>i {
  height: 0px;
  width: 0px;
}

.icon-button-margin {
  color: #fff;
  background-color: #08ADAA;
  margin: 5px;
}

.icon-button-margin:hover {
  color: #fff;
  background-color: #08ADAA;
  margin: 5px;
}

.marginLeft {
  margin-left: 5px;
}

.radar-box {
  display: inline-block;
  width: 360px;
  height: 400px;
}

.el-select-dropdown__item.selected {
  color: #08ADAA;
  font-weight: 700;
}

.jtrac-bar-chart-title {
  width: 190px;
  display: flex;
  justify-content: center;
  font-size: x-large;
  font-weight: 550;
  padding-left: 5px;
  color: #606266;
}
</style>