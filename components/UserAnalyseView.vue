<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { DateModelType } from 'element-plus';
import radar from '@/static/images/radar.png';
import radarfill from '@/static/images/radarfill.png';
import line from '@/static/images/line.png';
import column from '@/static/images/column.png';
import { useStatisticStore } from '../stores';
import { ShowAlert } from './alert';
import { Settings } from '../constant/Service';
import { format, differenceInSeconds, addDays } from "date-fns";
import { dateTyle } from './DateRange.vue';

interface Props {
}

interface onlineInformationList {
  formatOnlineDate?: string,
  formatOfflineDate?: string,
  formatOnlineTime?: string,
  formatOfflineTime?: string,
  diffOnline?: number,
  onlineTime?: number,
  offlineTime?: number
}

const statisticState = useStatisticStore();

const props = defineProps<Props>()
const TODAY = format(new Date(), 'yyyy-MM-dd');
const COLOR = [
  '#6874e6',
  '#bd4c54',
  '#cfc642',
  '#86d1e4',
  '#f5ac4e',
  '#be5dd9',
  '#7cbb23',
  '#66cc99',
  '#fb9fe7',
  '#339933',
  '#ff019c',
  '#663d67',
  '#7ffe4c',
  '#676652',
  '#3301b2',
];
const timeParts = [
  { name: '0:00-1:00', from: '0:00:00', to: '1:00:00', code: 0 },
  { name: '1:00-2:00', from: '1:00:00', to: '2:00:00', code: 1 },
  { name: '2:00-3:00', from: '2:00:00', to: '3:00:00', code: 2 },
  { name: '3:00-4:00', from: '3:00:00', to: '4:00:00', code: 3 },
  { name: '4:00-5:00', from: '4:00:00', to: '5:00:00', code: 4 },
  { name: '5:00-6:00', from: '5:00:00', to: '6:00:00', code: 5 },
  { name: '6:00-7:00', from: '6:00:00', to: '7:00:00', code: 6 },
  { name: '7:00-8:00', from: '7:00:00', to: '8:00:00', code: 7 },
  { name: '8:00-9:00', from: '8:00:00', to: '9:00:00', code: 8 },
  { name: '9:00-10:00', from: '9:00:00', to: '10:00:00', code: 9 },
  { name: '10:00-11:00', from: '10:00:00', to: '11:00:00', code: 10 },
  { name: '11:00-12:00', from: '11:00:00', to: '12:00:00', code: 11 },
  { name: '12:00-13:00', from: '12:00:00', to: '13:00:00', code: 12 },
  { name: '13:00-14:00', from: '13:00:00', to: '14:00:00', code: 13 },
  { name: '14:00-15:00', from: '14:00:00', to: '15:00:00', code: 14 },
  { name: '15:00-16:00', from: '15:00:00', to: '16:00:00', code: 15 },
  { name: '16:00-17:00', from: '16:00:00', to: '17:00:00', code: 16 },
  { name: '17:00-18:00', from: '17:00:00', to: '18:00:00', code: 17 },
  { name: '18:00-19:00', from: '18:00:00', to: '19:00:00', code: 18 },
  { name: '19:00-20:00', from: '19:00:00', to: '20:00:00', code: 19 },
  { name: '20:00-21:00', from: '20:00:00', to: '21:00:00', code: 20 },
  { name: '21:00-22:00', from: '21:00:00', to: '22:00:00', code: 21 },
  { name: '22:00-23:00', from: '22:00:00', to: '23:00:00', code: 22 },
  { name: '23:00-23:59', from: '23:00:00', to: '23:59:59', code: 23 },
]

const userList = ref<any[]>([]);
const searchInfo = ref<any>(null);
const userOnlineInfoArr = ref<any>([]);
const selectUsers = ref<string[]>([]);
const resultItem = ref<any[]>([]); 
const gridheadTexts = ref<any[]>([]); 
const gridData = ref<any[]>([]);
const dateValue = ref<dateTyle>(['', '']);
const dateFrom = ref<string>('');
const dateTo = ref<string>('');
const isFill = ref<boolean>(false); 
const isLine = ref<boolean>(false); 
const dateType = ref<boolean>(false); 
const chartType = ref<string>('');
const chartLegend = ref<any[]>([]);
const dimensions = ref<string[]>([]);
const source = ref<any[]>([]);
const series = ref<any[]>([]);
const chartWidthStr = ref<string>('');
const chartWidth = ref<number>(0);
const gridDataList = ref<any[]>([]);
const gridValue = ref<any[]>([]);

onMounted(() => {
  const info: any = {};
  info.blockflag = "N";
  info.usertype = "U";
  info.iStart = 0;
  info.iPageCount = 20;
  statisticState.getUserList(info);
  dateValue.value = [TODAY, TODAY];
  dateFrom.value = TODAY;
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
    if (name === Settings.GetUserOnlineTime) {
      const respond = store.$state.getUserOnlineTimeResult;
      if (!respond) {
        return;
      }
      if (!respond.error) {
        const results = respond.data;
        for (let i = 0; i < results?.length; i++) {
          if (results[i].list.length === 0) {
            results.splice(i, 1);
            i--;
          }
        }
        let map: Map<string, any[]> = new Map<string, any[]>();
        let mapDate: Map<string, string> = new Map<string, string>();
        let mapRadar: Map<string, any[]> = new Map<string, any[]>();
        let dates: string[] = [];
        let key: string = '';
        let dateKey: string = '';
        results?.forEach((data: any, index: number) => {
          data.color = COLOR[index];
          data.listNew = recurTimeMerge(data.list, 'onlineTime', 'offlineTime');
          data.listNew.forEach((info: onlineInformationList) => {
            info.formatOnlineDate = dateFormat(info.onlineTime as number);
            info.formatOfflineDate = dateFormat(info.offlineTime as number);
            info.formatOnlineTime = timeFormat(info.onlineTime as number);
            info.formatOfflineTime = timeFormat(info.offlineTime as number);
            info.diffOnline = differenceInSeconds(info.offlineTime as number, info.onlineTime as number);
            if (info.formatOnlineDate === info.formatOfflineDate) {
              key = `${data.id}@${dateFormat(info.offlineTime as number)}`;
              dateKey = dateFormat(info.offlineTime as number);
              if (!map.get(key)) {
                map.set(key, [info]);
              } else {
                map.get(key)?.push(info);
              }
              if (!mapDate.get(dateKey)) {
                mapDate.set(dateKey, dateKey);
                dates.push(dateKey);
              }
            } else { 
              const dValueDate = differenceInSeconds(new Date(info.formatOnlineDate).getTime(), new Date(info.formatOfflineDate).getTime());
              const dateLength = dValueDate - 1;
              for (let i = 0; i < dateLength; i++) {
                const dateFromTime = addDays(new Date(info.formatOnlineDate + '0:00:00').getTime(), i + 1);
                const dateToTime = addDays(new Date(info.formatOnlineDate + '23:59:00').getTime(), i + 1);
                const dateInfo: onlineInformationList = {};
                dateInfo.onlineTime = dateFromTime.getTime();
                dateInfo.offlineTime = dateToTime.getTime();
                dateInfo.formatOnlineDate = dateFormat(dateInfo.onlineTime);
                dateInfo.formatOfflineDate = dateFormat(dateInfo.offlineTime);
                dateInfo.formatOnlineTime = timeFormat(dateInfo.onlineTime);
                dateInfo.formatOfflineTime = timeFormat(dateInfo.offlineTime);
                dateInfo.diffOnline = differenceInSeconds(dateInfo.offlineTime, dateInfo.onlineTime);
                if (searchInfo.value.fromDate <= dateInfo.formatOnlineDate && dateInfo.formatOnlineDate <= searchInfo.value.toDate) {
                  key = `${data.id}@${dateInfo.formatOfflineDate}`;
                  dateKey = dateInfo.formatOfflineDate;
                  if (!map.get(key)) {
                    map.set(key, [dateInfo]);
                  } else {
                    map.get(key)?.push(dateInfo);
                  }
                  if (!mapDate.get(dateKey)) {
                    mapDate.set(dateKey, dateKey);
                    dates.push(dateKey);
                  }
                }
              }
              if (searchInfo.value.fromDate <= info.formatOnlineDate && info.formatOnlineDate <= searchInfo.value.toDate) {
                const toDate = `${info.formatOnlineDate} 23:59:59`;
                const dateToTime = new Date(toDate).getTime();
                const dateToInfo: onlineInformationList = {};
                dateToInfo.onlineTime = info.onlineTime;
                dateToInfo.offlineTime = dateToTime;
                dateToInfo.formatOnlineDate = dateFormat(dateToInfo.onlineTime as number);
                dateToInfo.formatOfflineDate = dateFormat(dateToInfo.offlineTime as number);
                dateToInfo.formatOnlineTime = timeFormat(dateToInfo.onlineTime as number);
                dateToInfo.formatOfflineTime = timeFormat(dateToInfo.offlineTime as number);
                dateToInfo.diffOnline = differenceInSeconds(dateToInfo.offlineTime as number, dateToInfo.onlineTime as number);
                key = `${data.id}@${dateToInfo.formatOfflineDate}`;
                dateKey = dateToInfo.formatOfflineDate;
                if (!map.get(key)) {
                  map.set(key, [dateToInfo]);
                } else {
                  map.get(key)?.push(dateToInfo);
                }
                if (!mapDate.get(dateKey)) {
                  mapDate.set(dateKey, dateKey);
                  dates.push(dateKey);
                }
              }
              if (searchInfo.value.fromDate <= info.formatOfflineDate && info.formatOfflineDate <= searchInfo.value.toDate) {
                const fromDate = `${info.formatOfflineDate} 0:00:00`;
                const dateFromTime = new Date(fromDate).getTime();
                const dateFromInfo: onlineInformationList = {};
                dateFromInfo.onlineTime = dateFromTime;
                dateFromInfo.offlineTime = info.offlineTime;
                dateFromInfo.formatOnlineDate = dateFormat(dateFromInfo.onlineTime as number);
                dateFromInfo.formatOfflineDate = dateFormat(dateFromInfo.offlineTime as number);
                dateFromInfo.formatOnlineTime = timeFormat(dateFromInfo.onlineTime as number);
                dateFromInfo.formatOfflineTime = timeFormat(dateFromInfo.offlineTime as number);
                dateFromInfo.diffOnline = differenceInSeconds(dateFromInfo.offlineTime as number, dateFromInfo.onlineTime as number);
                key = `${data.id}@${dateFromInfo.formatOfflineDate}`;
                dateKey = dateFromInfo.formatOfflineDate;
                if (!map.get(key)) {
                  map.set(key, [dateFromInfo]);
                } else {
                  map.get(key)?.push(dateFromInfo);
                }
                if (!mapDate.get(dateKey)) {
                  mapDate.set(dateKey, dateKey);
                  dates.push(dateKey);
                }
              }
            }
          });
        });
        userOnlineInfoArr.value = dates;
        if (dates.length === 0) {
          ShowAlert('无检索结果!', 1);
          return
        }
        if (dates.length === 1) {
          results.forEach((data: any) => {
            data.listTime = computeTimePart(dates[0], data.listNew);
            data.totalTime = computeTimeTotal(data.listTime);
            data.totalHour = computeHourTotal(computeTimeTotal(data.listTime));
            data.titleName = `${data.totalHour}  (${computeTime(data.listNew, dates[0])})`;
            data.markerRadar = { shape: 'Circle', fill: data.color, visible: true, opacity: 1, }
          })
          results.sort(compareFn('totalTime', false));
          resultItem.value = results;
        } 
        const heads: any[] = [];
        const grids: any[] = [];
        if (dates.length > 0) {
          const ob: any = {};
          if (dates.length === 1) {
            ob.name = dates[0];
          } else {
            ob.name = '';
          }
          ob.field = 'name';
          heads.push(ob);
        }
        if (dates.length === 1) {
          chartType.value = 'radar';
          dateType.value = false;
          timeParts.forEach((elem: any, index: number) => {
            const ob: any = {};
            ob.name = elem.name;
            ob.field = 'date' + index;
            heads.push(ob)
          })
          results.forEach((elem: any) => {
            const userInfo: any = {};
            userInfo.name = elem.name;
            userInfo.id = elem.id;
            elem.listTime.forEach((info: any, index: number) => {
              userInfo['date' + index] = info.diffTime;
            })
            grids.push(userInfo);
          })
        } else if (dates.length > 1) {
          chartType.value = 'bar';
          dateType.value = true;
          dates.forEach((elem: any, index: number) => {
            const ob: any = {};
            ob.name = elem;
            ob.field = `date${index}`;
            heads.push(ob)
          })
          heads.sort(compareFn('name'));
          results.forEach((elem: any) => {
            const userInfo: any = {};
            userInfo.name = elem.name;
            userInfo.id = elem.id;
            dates.forEach((info: any, index: number) => {
              const key = `${elem.id}@${info}`;
              if (map.get(key)) {
                userInfo['date' + index] = computeTimeTotal(map.get(key) ?? []);
              } else {
                userInfo['date' + index] = 0;
              }
            })
            grids.push(userInfo);
          })
        }
        gridheadTexts.value = heads;
        gridData.value = grids;
        const chartHeads: any[] = [];
        const chartColumns: any[] = [];
        results.forEach((elem, index) => {
          const headerInfo: any = {};
          headerInfo.yName = 'chart' + index;
          headerInfo.name = elem.name;
          headerInfo.color = COLOR[index];
          headerInfo.id = index;
          headerInfo.visible = true;
          headerInfo.enabled = true;
          chartHeads.push(headerInfo);
        })
        if (dates.length > 1) {
          dates?.forEach(elem => {
            const chartInfo: any = {};
            chartInfo.name = elem;
            results.forEach((info, index) => {
              const key = `${info.id}@${elem}`;
              if (map.get(key)) {
                chartInfo['chart' + index] = computeTimeTotal(map.get(key) ?? []);
              } else {
                chartInfo['chart' + index] = 0;
              }
            })
            chartColumns.push(chartInfo);
          })
          chartColumns.sort(compareFn('name'));
        } else if (dates.length === 1) {
          timeParts?.forEach((elem, ins) => {
            const chartInfo: any = {};
            chartInfo.name = elem.name;
            results.forEach((info, index) => {
              chartInfo['chart' + index] = (Number)(info.listTime[ins].diffTime);
            })
            chartColumns.push(chartInfo);
          })
        }
        chartLegend.value = chartHeads;
        gridDataList.value = [];
        chartColumns.map(function (data) { gridDataList.value.push(data.name); })
        gridValue.value = getGridData(chartHeads, chartColumns)
        dimensions.value = getDimensions(chartHeads)
        source.value = getSource(chartColumns, chartHeads)
        series.value = getSeries(chartHeads, isLine.value)
        chartWidth.value = gridDataList.value.length * 170;
        chartWidthStr.value = `width: ${gridDataList.value.length * 170}px;margin-top: 20px`;
      }
    }
  });
});

function getGridData(value: any[], dataArr: any[]) {
  const arr: any[] = [];
  value.map(function (info) {
    const obj: any = {}
    dataArr.forEach(data => {
      obj[data.name] = data[info.yName]
    })
    obj.name = info.name;
    arr.push(obj);
  })
  return arr;
}

function getDimensions(value: any[]) {
  const arr: string[] = [];
  value.map(function (data) {
    arr.push(data.name);
  })
  return ['date', ...arr];
}

function getSource(value: any[], legend: any[]) {
  const arr: any[] = [];
  value.map(function (info) {
    const obj: any = {}
    legend.forEach(data => {
      obj[data.name] = info[data.yName]
    })
    obj.date = info.name;
    arr.push(obj);
  })
  return arr;
}

function getSeries(value: any[], isLine: boolean) {
  const arr: any[] = [];
  value.map(function (data) {
    // const info: any = { type: chartType };
    const info: any = isLine ? { type: 'line' } : { type: 'bar' };
    info.color = data.color;
    arr.push(info);
  })
  return arr;
}

function dateFormat(dateValue: number): string {
  return format(dateValue, 'yyyy-MM-dd')
}

function timeFormat(dateValue: number): string {
  return format(dateValue, 'HH:mm:ss');
}

function computeTimeTotal(list: any[]) {
  let total: number = 0;
  list.forEach(elem => {
    total += elem.diffOnline;
  })
  return Number((total / 60).toFixed(2));
}

function computeHourTotal(str: number) {
  let hour = Math.floor(str / 60);
  let minutes = str - 60 * hour;
  let min = Math.floor(minutes);
  let sec = Math.floor((minutes - min) * 60);
  return `${hour}:${min}'${sec}"`;
}

function computeTime(list: any[], date: string) {
  let timeStr = '';
  if (list.length > 0) {
    if (list[0].formatOnlineDate === list[list.length - 1].formatOfflineDate) {
      timeStr = `${list[0].formatOnlineTime}~${list[list.length - 1].formatOfflineTime}`;
    } else {
      if (list[0].formatOnlineDate === date) {
        timeStr = `${list[0].formatOnlineTime}~23:59:59`;
      } else if (date === list[list.length - 1].formatOfflineDate) {
        timeStr = `00:00:00~${list[list.length - 1].formatOfflineTime}`;
      }
    }
  }
  return timeStr;
}

function computeTimePart(date: string, list: any[]) {
  const listTime: any[] = [];
  timeParts.forEach((data: any) => {
    const timeInfo: any = {};
    timeInfo.name = data.name;
    timeInfo.code = data.code;
    const strFrom = `${date} ${data.from}`;
    const strTo = `${date} ${data.to}`;
    const dateFrom = new Date(strFrom).getTime();
    const dateTo = new Date(strTo).getTime();
    timeInfo.dateFrom = dateFrom;
    timeInfo.dateTo = dateTo;
    let diffOnline = 0;
    list.forEach((info: any) => {
      if (info.onlineTime > dateFrom && info.offlineTime < dateTo) {
        diffOnline += differenceInSeconds(info.offlineTime, info.onlineTime);
      } else if (info.onlineTime < dateTo && info.onlineTime > dateFrom && info.offlineTime > dateTo) {
        diffOnline += differenceInSeconds(dateTo, info.onlineTime);
      } else if (info.offlineTime > dateFrom && info.offlineTime < dateTo && info.onlineTime < dateFrom) {
        diffOnline += differenceInSeconds(info.offlineTime, dateFrom);
      } else if (info.onlineTime < dateFrom && info.offlineTime > dateTo) {
        diffOnline += differenceInSeconds(dateTo, dateFrom);
      }
    })
    timeInfo.diffOnline = diffOnline;
    timeInfo.diffTime = Number((diffOnline / 60).toFixed(2));
    listTime.push(timeInfo);
  })
  return listTime;
}

function recurTimeMerge(list: any[], startTime: string, endTime: string): any[] {
  let lists = list.sort(compareFn(startTime));
  let arr: any[] = [];
  let obj = { [startTime]: '', [endTime]: '' };
  for (let item of lists) {
    if (!obj[startTime] && !obj[endTime]) {
      obj = { [startTime]: item[startTime], [endTime]: item[endTime] };
      if (item[startTime] === lists[lists.length - 1][startTime] && item[endTime] === lists[lists.length - 1][endTime]) {
        arr.push(obj);
      }
    } else if (obj[startTime] <= item[startTime] && obj[endTime] >= item[startTime]) {
      obj[endTime] = item[endTime];
      if (item[startTime] === lists[lists.length - 1][startTime] && item[endTime] === lists[lists.length - 1][endTime]) {
        arr.push(obj);
      }
    } else if (obj[startTime] <= item[startTime] && obj[endTime] < item[startTime]) {
      arr.push(obj);
      obj = { [startTime]: item[startTime], [endTime]: item[endTime] };
      if (item[startTime] === lists[lists.length - 1][startTime] && item[endTime] === lists[lists.length - 1][endTime]) {
        arr.push({ [startTime]: item[startTime], [endTime]: item[endTime] })
      }
    }
  }
  return arr;
}

function compareFn(value: string, sort: boolean = true) {
  return function (front: any[], back: any[]) {
    let frontValue = front[value];
    let backValue = back[value];
    if (!isNaN(Number(frontValue)) && !isNaN(Number(backValue))) {
      frontValue = Number(frontValue);
      backValue = Number(backValue);
    }
    if (frontValue < backValue) {
      return sort ? -1 : 1;
    } else if (frontValue > backValue) {
      return sort ? 1 : -1;
    } else {
      return 0;
    }
  }
}

function onSelectChangeHandler(userArr: string[]) {
  selectUsers.value = userArr;
}

function onDateChangeHandler(dateArr: dateTyle) {
  dateValue.value = dateArr;
  dateFrom.value = dateValue.value[0] as string ?? '';
  dateTo.value = dateValue.value[1] as string ?? '';
}

function onRadarChartTypeButtonClickHandler(type: boolean) {
  isFill.value = type;
}

function onChartTypeButtonClickHandler(type: boolean) {
  isLine.value = type;
  series.value = getSeries(chartLegend.value, type)

}

function onSearchHandlerClick() {
  if (!dateFrom.value ) {
    ShowAlert('请选择日期区间', 1);
    return;
  }
  if (!dateTo.value) {
    ShowAlert('请选择日期区间', 1);
    return;
  }
  const info: any = {};
  const users = selectUsers.value.toString();
  if (!users) {
    info.id = '';
  } else {
    info.id = users;
  }
  info.fromDate = dateFrom.value;
  info.toDate = dateTo.value;
  searchInfo.value = info;
  statisticState.getUserOnlineTime(info);
}

function onResetHandlerClick() {
  selectUsers.value = [];
  dateValue.value = [TODAY, TODAY];
  dateFrom.value = TODAY;
  dateTo.value = TODAY;
}

</script>

<template>
  <div class="box-top">
    <div class="box-display-item">
      <div class="box-width">
        <div class="box-width-80">
          用户
        </div>
        <div class="box-width-380">
          <Select class="multiple-select" v-model:selectValue="selectUsers" :dataList="userList" placeholder="All"
            @selectChange="onSelectChangeHandler" :multiple="true" />
        </div>
      </div>
      <div class="box-flex-grow">
        <div class="box-width-80">
          <span>日期区间</span>
        </div>
        <div class="box-flex-margin">
          <DateRange v-model:date="dateValue" @dateChange="onDateChangeHandler" format="YYYY/MM/DD"
            valueFormat="YYYY-MM-DD" />
        </div>
      </div>
    </div>
    <div class="display-full-width">
      <div class="justify-flex">
        <ChartTypeButton v-if="!dateType" :showFirst="isFill" :startUrl="radarfill" :endUrl="radar" :fit="'fill'"
          @switchType="onRadarChartTypeButtonClickHandler" />
        <ChartTypeButton v-else :showFirst="isLine" :startUrl="line" :endUrl="column" :fit="'fill'"
          @switchType="onChartTypeButtonClickHandler" />
      </div>
      <div class="justify-flex-end">
        <Button class='btn-icon' @click="onSearchHandlerClick">Search</Button>
        <Button class='btn-icon marginLeft' @click="onResetHandlerClick">Reset</Button>
      </div>
    </div>
  </div>
  <div v-if="userOnlineInfoArr.length > 0">
    <div v-if="chartType === 'radar'">
      <div class="radar-box" v-for="item in resultItem" :key="item.id">
        <RadarChart :isFillUp="isFill" :dataList="item" :id="item.id" />
      </div>
    </div>
    <div v-if="chartType === 'bar'">
      <div class="bar-chart-title">
        <span>用户登录分析 —— 时间(分钟)</span>
      </div>
      <Chart :dimensions="dimensions" :source="source" :series="series" :chartWidth="chartWidth" :isLine="isLine"
        :key="chartWidth" />
      <DataGrid :style="chartWidthStr" :dataList="gridDataList" :gridDataList="gridValue" :key="gridDataList" />
    </div>
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

.box-width {
  display: flex;
  width: 60%;
}

.box-width-80 {
  width: 80px;
  margin-left: 10px;
  color: #606266;
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif, 微软雅黑;
  font-size: 14px;
  font-weight: 600;
  line-height: 32px;
}

.box-width-380 {
  min-width: 380px;
}

.box-flex-grow {
  display: flex;
  flex-grow: 1;
}

.box-flex-margin {
  margin-left: 0.3125rem;
  margin-right: 0.3125rem;
  flex-grow: 1;
}

.display-full-width {
  display: flex;
  width: 100%
}

.multiple-select {
  width: 150%;
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
  margin:5px;
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

.bar-chart-title {
  width: 360px;
  display: flex;
  justify-content: center;
  font-size: x-large;
  font-weight: 550;
  padding-left: 5px;
  color: #606266;
}

</style>