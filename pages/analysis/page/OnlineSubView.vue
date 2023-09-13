
<script setup lang="ts">
import { onMounted, onUnmounted, ref, provide } from 'vue';
import { ElImage } from 'element-plus';
import column from '@/static/images/column.png';
import line from '@/static/images/line.png';
import color_0 from '@/static/images/color_0.png';
import color_1 from '@/static/images/color_1.png';
import color_2 from '@/static/images/color_2.png';
import color_3 from '@/static/images/color_3.png';
import color_4 from '@/static/images/color_4.png';
import color_5 from '@/static/images/color_5.png';
import color_6 from '@/static/images/color_6.png';
import color_7 from '@/static/images/color_7.png';
import color_8 from '@/static/images/color_8.png';
import color_9 from '@/static/images/color_9.png';
import color_10 from '@/static/images/color_10.png';
import color_11 from '@/static/images/color_11.png';
import color_12 from '@/static/images/color_12.png';
import color_13 from '@/static/images/color_13.png';
import color_14 from '@/static/images/color_14.png';
import color_dis from '@/static/images/color_dis.png';
import line_0 from '@/static/images/line_0.png';
import line_1 from '@/static/images/line_1.png';
import line_2 from '@/static/images/line_2.png';
import line_3 from '@/static/images/line_3.png';
import line_4 from '@/static/images/line_4.png';
import line_5 from '@/static/images/line_5.png';
import line_6 from '@/static/images/line_6.png';
import line_7 from '@/static/images/line_7.png';
import line_8 from '@/static/images/line_8.png';
import line_9 from '@/static/images/line_9.png';
import line_10 from '@/static/images/line_10.png';
import line_11 from '@/static/images/line_11.png';
import line_12 from '@/static/images/line_12.png';
import line_13 from '@/static/images/line_13.png';
import line_14 from '@/static/images/line_14.png';
import line_dis from '@/static/images/line_dis.png';
import radar from '@/static/images/radar.png';
import radarfill from '@/static/images/radarfill.png';
import { format, differenceInSeconds, differenceInDays, addDays } from "date-fns";
import { ShowAlert } from '../../../components/alert';
import { analysisStore } from '../../../stores';
import { Settings } from '../../../constant/Service';
import { ButtonComponent as EjsButton } from "@syncfusion/ej2-vue-buttons";
import { MultiSelectComponent as EjsMultiselect } from "@syncfusion/ej2-vue-dropdowns";
import { DateRangePickerComponent as EjsDaterangepicker } from "@syncfusion/ej2-vue-calendars";
import { GridComponent as EjsGrid, ColumnsDirective as EColumns, ColumnDirective as EColumn } from '@syncfusion/ej2-vue-grids';
import {
    ChartComponent as EjsChart,
    SeriesCollectionDirective as ESeriesCollection,
    SeriesDirective as ESeries,
    Legend,
    ColumnSeries,
    RadarSeries,
    LineSeries,
    Category,
    Tooltip,
} from '@syncfusion/ej2-vue-charts';

const analysisState = analysisStore();
const startVal = ref<Date>(new Date());
const endVal = ref<Date>(new Date());
const showDelete = ref<boolean>(false);
const selectItem = ref<any>(null);
const usefields = { text: 'name', value: 'id' }
const selectUseName = ref<any>(null);
const gridData = ref<any[]>([]);
const gridheadTexts = ref<any[]>([]);
const chartColumnsHeads = ref<any[]>([]);
const headerGridWidth = ref<string>('100%');
const headerDivWidth = ref<string>('margin-top:5px;')
const seriesColumnsData = ref<any[]>([]);
const lineType = ref<boolean>(true);
const searchInfo = ref<any>(null);
const resultItemRef = ref<any[]>([]);
const dateItemRef = ref<any[]>([]);
const dateType = ref<boolean>(true);
const radarfillType = ref<boolean>(false);

const primaryXYAxis = ref<any>({
    valueType: 'Category',
});

const primaryXAxis = ref<any>({ valueType: 'Category', interval: 1, });

const tooltip = ref<any>({
    enable: true,
    format: "${point.x} : <b>${point.y}</b>"
});

const primaryRadioXAxis = {
    title: 'hours', interval: 1, minimum: 0, maximum: 24, majorGridLines: { width: 1 },
}

const primaryRadioYAxis = {
    minimum: 0, maximum: 60, interval: 10, majorGridLines: { width: 1 },
    title: 'minute',
    labelFormat: '{value}',
}

const colors = [
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

const legendSettings = ref<any>({ visible: true });

const marker = ref<any>({ visible: true, width: 10, height: 10, shape: 'Diamond' });

provide('chart', [RadarSeries, ColumnSeries, Category, Legend, Tooltip, LineSeries]);

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

const radarTooltip = ref<any>({
    enable: true,
    format: "${point.x} : <b>${point.y}分钟</b>"
})


onMounted(() => {
    const info: any = {};
    info.blockflag = "N";
    info.usertype = "U";
    info.iStart = 0;
    info.iPageCount = 20;
    analysisState.getUserList(info);
});

onUnmounted(() => {
    unsubscribe();
});

const unsubscribe = analysisState.$onAction(({ name, store, after }) => {
    after(() => {
        if (name === Settings.GetUserList) {
            const respond = store.$state.userListResult;
            if (!respond) {
                return;
            }
            if (!respond.error) {
                selectUseName.value = respond.data;
            }
        }
        if (name === Settings.GetUserOnlineTime) {
            const respond = store.$state.getUserOnlineTimeResult;
            if (!respond) {
                return;
            }
            if (!respond.error) {
                let results = respond.data;
                for (let i = 0; i < results?.length; i++) {
                    //删除没有时间段的用户数据
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
                //优先判断日期为一个还是多个
                results?.forEach((elem: any, index: number) => {
                    elem.color = colors[index];
                    elem.listNew = timeMergeFun(elem.list, 'onlineTime', 'offlineTime');
                    elem.listNew.forEach((info: any) => {
                        info.fmOnlineDate = dateTime(info.onlineTime);
                        info.fmOfflineDate = dateTime(info.offlineTime);
                        info.fmOnlineTime = dateHourMinute(info.onlineTime);
                        info.fmOfflineTime = dateHourMinute(info.offlineTime);
                        info.diffOnline = datedifference(info.offlineTime, info.onlineTime);
                        if (info.fmOnlineDate === info.fmOfflineDate) {
                            key = elem.id + '@' + dateTime(info.offlineTime);
                            dateKey = dateTime(info.offlineTime);
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
                            let dateDiff = differenceInDays(new Date(info.fmOnlineDate).getTime(), new Date(info.fmOfflineDate).getTime());
                            let dateLength = dateDiff - 1;
                            for (let i = 0; i < dateLength; i++) {
                                let dateFromTime = addDays(new Date(info.fmOnlineDate + '0:00:00').getTime(), i + 1);
                                let dateToTime = addDays(new Date(info.fmOnlineDate + '23:59:00').getTime(), i + 1);
                                let dateInfo: any = {};
                                dateInfo.onlineTime = dateFromTime.getTime();
                                dateInfo.offlineTime = dateToTime.getTime();
                                dateInfo.fmOnlineDate = dateTime(dateInfo.onlineTime);
                                dateInfo.fmOfflineDate = dateTime(dateInfo.offlineTime);
                                dateInfo.fmOnlineTime = dateHourMinute(dateInfo.onlineTime);
                                dateInfo.fmOfflineTime = dateHourMinute(dateInfo.offlineTime);
                                dateInfo.diffOnline = datedifference(dateInfo.offlineTime, dateInfo.onlineTime);
                                if (searchInfo.value.fromDate <= dateInfo.fmOnlineDate && dateInfo.fmOnlineDate <= searchInfo.value.toDate) {
                                    key = elem.id + '@' + dateInfo.fmOfflineDate;
                                    dateKey = dateInfo.fmOfflineDate;
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
                            if (searchInfo.value.fromDate <= info.fmOnlineDate && info.fmOnlineDate <= searchInfo.value.toDate) {
                                let toDate = info.fmOnlineDate + ' 23:59:59';
                                let dateToTime = new Date(toDate).getTime();
                                let dateToInfo: any = {};
                                dateToInfo.onlineTime = info.onlineTime;
                                dateToInfo.offlineTime = dateToTime;
                                dateToInfo.fmOnlineDate = dateTime(dateToInfo.onlineTime);
                                dateToInfo.fmOfflineDate = dateTime(dateToInfo.offlineTime);
                                dateToInfo.fmOnlineTime = dateHourMinute(dateToInfo.onlineTime);
                                dateToInfo.fmOfflineTime = dateHourMinute(dateToInfo.offlineTime);
                                dateToInfo.diffOnline = datedifference(dateToInfo.offlineTime, dateToInfo.onlineTime);
                                key = elem.id + '@' + dateToInfo.fmOfflineDate;
                                dateKey = dateToInfo.fmOfflineDate;
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
                            if (searchInfo.value.fromDate <= info.fmOfflineDate && info.fmOfflineDate <= searchInfo.value.toDate) {
                                let fromDate = info.fmOfflineDate + ' 0:00:00';
                                let dateFromTime = new Date(fromDate).getTime();
                                let dateFromInfo: any = {};
                                dateFromInfo.onlineTime = dateFromTime;
                                dateFromInfo.offlineTime = info.offlineTime;
                                dateFromInfo.fmOnlineDate = dateTime(dateFromInfo.onlineTime);
                                dateFromInfo.fmOfflineDate = dateTime(dateFromInfo.offlineTime);
                                dateFromInfo.fmOnlineTime = dateHourMinute(dateFromInfo.onlineTime);
                                dateFromInfo.fmOfflineTime = dateHourMinute(dateFromInfo.offlineTime);
                                dateFromInfo.diffOnline = datedifference(dateFromInfo.offlineTime, dateFromInfo.onlineTime);
                                key = elem.id + '@' + dateFromInfo.fmOfflineDate;
                                dateKey = dateFromInfo.fmOfflineDate;
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
                    })
                })
                dateItemRef.value = dates;
                if (dates.length === 1) {
                    results.forEach((elem: any) => {
                        elem.listTime = computeTimePart(dates[0], elem.listNew);
                        elem.totalTime = computeTimeTotal(elem.listTime);
                        elem.totalHour = computeHourTotal(computeTimeTotal(elem.listTime));
                        elem.titleName = elem.totalHour + '  (' + computeTime(elem.listNew, dates[0]) + ')';
                        elem.markerRadar = { shape: 'Circle', fill: elem.color, visible: true, opacity: 1, }
                    })
                    results.sort(compare('totalTime', false));
                    for (let i = 0; i < results.length; i++) {
                        let key: string = Math.floor(i / 4).toString();
                        if (!mapRadar.get(key)) {
                            mapRadar.set(key, [results[i]]);
                        } else {
                            mapRadar.get(key)?.push(results[i]);
                        }
                    }
                    let RadarList: any[] = [];
                    mapRadar.forEach((val) => {
                        RadarList.push(val);
                    })
                    resultItemRef.value = RadarList;
                }
                let heads: any[] = [];
                let grids: any[] = [];
                if (dates.length > 0) {
                    let ob: any = {};
                    if (dates.length === 1) {
                        ob.name = dates[0];
                    } else {
                        ob.name = '';
                    }
                    ob.field = 'name';
                    heads.push(ob);
                }
                //DataGrid数据显示 只有一个日期时为时段显示
                if (dates.length === 1) {
                    dateType.value = false;
                    timeParts.forEach((elem: any, index: number) => {
                        let ob: any = {};
                        ob.name = elem.name;
                        ob.field = 'date' + index;
                        heads.push(ob)
                    })
                    results.forEach((elem: any) => {
                        let userInfo: any = {};
                        userInfo.name = elem.name;
                        userInfo.id = elem.id;
                        elem.listTime.forEach((info: any, index: number) => {
                            userInfo['date' + index] = info.diffTime;
                        })
                        grids.push(userInfo);
                    })
                } else if (dates.length > 1) {
                    dateType.value = true;
                    dates.forEach((elem: any, index: number) => {
                        let ob: any = {};
                        ob.name = elem;
                        ob.field = 'date' + index;
                        heads.push(ob)
                    })
                    heads.sort(compare('name'));
                    results.forEach((elem: any) => {
                        let userInfo: any = {};
                        userInfo.name = elem.name;
                        userInfo.id = elem.id;
                        dates.forEach((info: any, index: number) => {
                            let key = elem.id + '@' + info;
                            if (map.get(key)) {
                                userInfo['date' + index] = computeTimeTotal(map.get(key) ?? []);
                            } else {
                                userInfo['date' + index] = 0;
                            }
                        })
                        grids.push(userInfo);
                    })
                }
                //DataGrid header Data 显示方式
                gridheadTexts.value = heads;
                gridData.value = grids;
                //chart clumn line header
                let chartHeads: any[] = [];
                let chartColumns: any[] = [];
                results.forEach((elem, index) => {
                    let headerInfo: any = {};
                    headerInfo.yName = 'chart' + index;
                    headerInfo.name = elem.name;
                    headerInfo.color = colors[index];
                    headerInfo.id = index;
                    headerInfo.visible = true;
                    headerInfo.enabled = true;
                    chartHeads.push(headerInfo);
                })
                if (dates.length > 1) {
                    dates?.forEach(elem => {
                        let chartInfo: any = {};
                        chartInfo.name = elem;
                        results.forEach((info, index) => {
                            let key = info.id + '@' + elem;
                            if (map.get(key)) {
                                chartInfo['chart' + index] = computeTimeTotal(map.get(key) ?? []);
                            } else {
                                chartInfo['chart' + index] = 0;
                            }
                        })
                        chartColumns.push(chartInfo);
                    })
                    chartColumns.sort(compare('name'));
                } else if (dates.length === 1) {
                    timeParts?.forEach((elem, ins) => {
                        let chartInfo: any = {};
                        chartInfo.name = elem.name;
                        results.forEach((info, index) => {
                            chartInfo['chart' + index] = (Number)(info.listTime[ins].diffTime);
                        })
                        chartColumns.push(chartInfo);
                    })
                }
                if (chartColumns.length > 0) {
                    headerGridWidth.value = (chartColumns.length + 1) * 120 + 10 + 'px';
                    if (dates.length > 1) {
                        headerDivWidth.value = 'margin-top:5px;width:' + ((chartColumns.length + 1) * 120 + 10) + 'px;';
                    } else if (dates.length === 1) {
                        headerDivWidth.value = 'display: flex;margin-top:5px;width:' + 350 * results.length + 'px';
                    }
                } else {
                    headerGridWidth.value = '100%';
                    if (dates.length > 1) {
                        headerDivWidth.value = 'display: flex;margin-top:5px;';
                    } else if (dates.length === 1) {
                        headerDivWidth.value = 'margin-top:5px;';
                    }
                }
                chartColumnsHeads.value = chartHeads;
                seriesColumnsData.value = chartColumns;
            }
        }
    });
});
//计算重复时间段合并
function timeMergeFun(list: any[], startTime: string, endTime: string) {
    let lists = list.sort(compare(startTime));
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
//时间段排序升序 sort true 升序 false 降序
function compare(prop, sort: boolean = true) {
    return function (obj1, obj2) {
        let val1 = obj1[prop];
        let val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) {
            return sort ? -1 : 1;
        } else if (val1 > val2) {
            return sort ? 1 : -1;
        } else {
            return 0;
        }
    }
}
//日期格式化
function dateTime(str: number) {
    return format(str, 'yyyy-MM-dd')
}
//时间格式化
function dateHourMinute(str: number) {
    return format(str, 'HH:mm:ss');
}
//计算两个时间差的秒数
function datedifference(start: number, end: number) {
    return differenceInSeconds(start, end)
}
//计算日期汇总的合计
function computeTimeTotal(list: any[]) {
    let total: number = 0;
    list.forEach(elem => {
        total += elem.diffOnline;
    })
    return Number((total / 60).toFixed(2));
}
//计算日期时分秒
function computeHourTotal(str: number) {
    let hour = Math.floor(str / 60);
    let minutes = str - 60 * hour;
    let min = Math.floor(minutes);
    let sec = Math.floor((minutes - min) * 60);
    return hour + ':' + min + '\'' + sec + '"';
}

function computeTime(list: any[], date: string) {
    let timeStr = '';
    if (list.length > 0) {
        if (list[0].fmOnlineDate === list[list.length - 1].fmOfflineDate) {
            timeStr = list[0].fmOnlineTime + '~' + list[list.length - 1].fmOfflineTime;
        } else {
            if (list[0].fmOnlineDate === date) {
                timeStr = list[0].fmOnlineTime + '~' + '23:59:59';
            } else if (date === list[list.length - 1].fmOfflineDate) {
                timeStr = '00:00:00' + '~' + list[list.length - 1].fmOfflineTime;
            }
        }
    }
    return timeStr;
}

//计算一天内时间段的方法
function computeTimePart(date: string, list: any[]) {
    let listTime: any[] = [];
    timeParts.forEach((elem: any, index: number) => {
        let timeInfo: any = {};
        timeInfo.name = elem.name;
        timeInfo.code = elem.code;
        let strFrom = date + ' ' + elem.from;
        let strTo = date + ' ' + elem.to;
        let dateFrom = new Date(strFrom).getTime();
        let dateTo = new Date(strTo).getTime();
        timeInfo.dateFrom = dateFrom;
        timeInfo.dateTo = dateTo;
        let diffOnline = 0;
        list.forEach((info: any) => {
            if (info.onlineTime > dateFrom && info.offlineTime < dateTo) {
                diffOnline += datedifference(info.offlineTime, info.onlineTime);
            } else if (info.onlineTime < dateTo && info.onlineTime > dateFrom && info.offlineTime > dateTo) {
                diffOnline += datedifference(dateTo, info.onlineTime);
            } else if (info.offlineTime > dateFrom && info.offlineTime < dateTo && info.onlineTime < dateFrom) {
                diffOnline += datedifference(info.offlineTime, dateFrom);
            } else if (info.onlineTime < dateFrom && info.offlineTime > dateTo) {
                diffOnline += datedifference(dateTo, dateFrom);
            }
        })
        timeInfo.diffOnline = diffOnline;
        timeInfo.diffTime = Number((diffOnline / 60).toFixed(2));
        listTime.push(timeInfo);
    })
    return listTime;
}

function onSearchHandlerClick() {
    let select = selectItem.value?.toString() ?? ''
    if (!startVal.value) {
        ShowAlert('请选择日期区间', 1)
        return;
    }
    if (!endVal.value) {
        ShowAlert('请选择日期区间', 1)
        return;
    }
    const info: any = {};
    if (!select) {
        info.id = '';
    } else {
        info.id = selectItem.value?.toString() ?? ''
    }
    info.fromDate = format(startVal.value, 'yyyy-MM-dd');
    info.toDate = format(endVal.value, 'yyyy-MM-dd');
    searchInfo.value = info;
    analysisState.getUserOnlineTime(info);
    radarfillType.value = false;
    lineType.value = true;
}

function onResetHandlerClick() {
    selectItem.value = null;
    startVal.value = new Date();
    endVal.value = new Date();
}

function onImgClickHandler(data: string) {
    if (data === 'line') {
        lineType.value = false;
    } else {
        lineType.value = true;
    }
}

function onRadarImgClickHandler(data: string) {
    if (data === 'fill') {
        radarfillType.value = true;
    } else {
        radarfillType.value = false;
    }
}

function onBtnItemClick(item: any, lineType: boolean) {
    if (item.visible) {
        item.visible = false;
        item.enabled = false;
    } else {
        item.visible = true;
        item.enabled = true;
    }
}

function onlegendClick(e) {
    if (chartColumnsHeads.value && chartColumnsHeads.value.length > 0) {
        chartColumnsHeads.value.forEach(elem => {
            if (elem.name === e.legendText) {
                elem.enabled = !e.series.visible;
                elem.visible = !e.series.visible;
            }
        })
    }
}

function tooltipRender(args) {
    args.text = timeParts[args.point.x].name + ' : ' + args.point.y + '分钟';
}

function getUrl(index: Number, line: boolean = false, enabled: boolean = true) {
    if (enabled) {
        if (index === 0) {
            return line ? line_0 : color_0;
        } else if (index === 1) {
            return line ? line_1 : color_1;
        } else if (index === 2) {
            return line ? line_2 : color_2;
        } else if (index === 3) {
            return line ? line_3 : color_3;
        } else if (index === 4) {
            return line ? line_4 : color_4;
        } else if (index === 5) {
            return line ? line_5 : color_5;
        } else if (index === 6) {
            return line ? line_6 : color_6;
        } else if (index === 7) {
            return line ? line_7 : color_7;
        } else if (index === 8) {
            return line ? line_8 : color_8;
        } else if (index === 9) {
            return line ? line_9 : color_9;
        } else if (index === 10) {
            return line ? line_10 : color_10;
        } else if (index === 11) {
            return line ? line_11 : color_11;
        } else if (index === 12) {
            return line ? line_12 : color_12;
        } else if (index === 13) {
            return line ? line_13 : color_13;
        } else if (index === 14) {
            return line ? line_14 : color_14;
        }
    } else {
        return line ? line_dis : color_dis;
    }
}
</script>

<template>
    <div style="width:100%">
        <div style="display: flex; height: 40px; border: 1px solid #cacaca; padding-top: 10px;">
            <div style="display: flex;width: 720px;">
                <div style="width:100px;margin-left: 5px;">
                    <span>用户</span>
                </div>
                <div style="width:600px;">
                    <ejs-multiselect width="600px" id='multiselect' v-model:value="selectItem" :dataSource='selectUseName'
                        :fields='usefields' placeholder="ALL"></ejs-multiselect>
                </div>
            </div>
            <div style="display: flex;width: 300px;">
                <div style="width:100px;margin-left: 5px;">
                    <span>日期区间</span>
                </div>
                <div style="width:180px;margin-left: 5px;margin-right: 5px;">
                    <ejs-daterangepicker width="180px" v-model:startDate="startVal" v-model:endDate="endVal"
                        :showClearButton="showDelete" placeholder="Select a Range"></ejs-daterangepicker>
                </div>
            </div>
            <div style="display: flex;flex-grow: 1;">
            </div>
        </div>
        <div style="display: flex;margin-top: 5px;width: 100%">
            <div v-if="dateType" style="justify-content: flex-start; display: flex; flex-grow: 1">
                <el-image v-if="!lineType" style="width: 25px; height: 25px; cursor: pointer" :src="column" :fit="'fill'"
                    @click="() => onImgClickHandler('column')" />
                <el-image v-else style="width: 25px; height: 25px; cursor: pointer; margin-left: 5px" :src="line"
                    :fit="'fill'" @click="() => onImgClickHandler('line')" />
            </div>
            <div v-if="!dateType" style="justify-content: flex-start; display: flex; flex-grow: 1">
                <el-image v-if="radarfillType" style="width: 25px; height: 25px; cursor: pointer" :src="radar" :fit="'fill'"
                    @click="() => onRadarImgClickHandler('none')" />
                <el-image v-else style="width: 25px; height: 25px; cursor: pointer; margin-left: 5px" :src="radarfill"
                    :fit="'fill'" @click="() => onRadarImgClickHandler('fill')" />
            </div>
            <div style="justify-content: flex-end;display: flex;margin-top: 5px;">
                <ejs-button type='submit' @click="onSearchHandlerClick">Search</ejs-button>
                <ejs-button type='reset' @click="onResetHandlerClick" style="margin-left:5px;">Reset</ejs-button>
            </div>
        </div>
        <div v-if="dateItemRef.length > 1 && seriesColumnsData.length > 0"
            style="display: flex;margin-top: 5px;width: 100%;align-items: center;">
            <span style="font-size:x-large;font-weight: 550;padding-left: 5px;">用户登录分析 —— 时间(分钟)</span>
            <div v-for="item in chartColumnsHeads"
                style="display:flex;align-items: center;margin-left: 10px;cursor: pointer"
                @click="onBtnItemClick(item, lineType)">
                <el-image v-if="lineType" style="width: 15px; height: 15px;" :src="getUrl(item.id, false, item.enabled)"
                    :fit="'fill'" />
                <el-image v-if="!lineType" style="width: 15px; height: 15px;" :src="getUrl(item.id, true, item.enabled)"
                    :fit="'fill'" />
                <span v-if="item.enabled" class="radarText">{{ item.name }}</span>
                <span v-if="!item.enabled" class="radarDisableText">{{ item.name }}</span>
            </div>
        </div>
        <div v-if="dateItemRef.length > 1" style="width: 100%;overflow-x:auto;padding-bottom: 10px;">
            <div v-if="seriesColumnsData.length > 0" :style="headerDivWidth">
                <ejs-chart v-if="!lineType" :width='headerGridWidth' height='350px' :primaryXAxis="primaryXAxis"
                    :tooltip="tooltip" :legendSettings="legendSettings" @legendClick="onlegendClick">
                    <e-series-collection>
                        <e-series v-for="item in chartColumnsHeads" :dataSource="seriesColumnsData" type="Line" xName="name"
                            :fill="item.color" :yName="item.yName" :name="item.name" :marker="marker"
                            :visible="item.visible"></e-series>
                    </e-series-collection>
                </ejs-chart>
                <ejs-chart v-if="lineType" :width='headerGridWidth' height='350px' :primaryXAxis='primaryXYAxis'
                    :tooltip="tooltip" :legendSettings="legendSettings" @legendClick="onlegendClick">
                    <e-series-collection>
                        <e-series v-for="item in chartColumnsHeads" :dataSource="seriesColumnsData" type="Column"
                            xName="name" :fill="item.color" :yName="item.yName" :name="item.name"
                            :visible="item.visible"></e-series>
                    </e-series-collection>
                </ejs-chart>
                <ejs-grid :width='headerGridWidth' v-if="gridData.length > 0" ref='grid' :dataSource='gridData'>
                    <e-columns>
                        <e-column v-for="item in gridheadTexts" :field="item.field" :headerText="item.name"
                            textAlign='Center' width=120 minWidth=120></e-column>
                    </e-columns>
                </ejs-grid>
            </div>
        </div>
        <div v-if="dateItemRef.length === 1" style="overflow-y: auto;padding-bottom: 10px;">
            <div v-for="items in resultItemRef" style="display:flex;margin-top: 5px;width:100%">
                <div style="width: 400px;" v-for="item in items">
                    <div style="width:400px; display: flex;justify-content: center;">
                        <span class="text-style" :style="'color:' + item.color">{{ item.name }}</span>
                        <span class="text-style">{{ item.titleName }}</span>
                    </div>
                    <ejs-chart width="400px" height='360px' :primaryXAxis='primaryRadioXAxis'
                        :primaryYAxis='primaryRadioYAxis' :tooltip="radarTooltip" :tooltipRender='tooltipRender'>
                        <e-series-collection>
                            <e-series v-if="!radarfillType" :dataSource='item.listTime' type='Radar' xName='code'
                                yName='diffTime' drawType='Line' :fill="item.color" width="2" :marker='item.markerRadar'>
                            </e-series>
                            <e-series v-if="radarfillType" :dataSource='item.listTime' type='Radar' xName='code'
                                yName='diffTime' drawType='StackingColumn' :fill="item.color" width="2"
                                :marker='item.markerRadar'>
                            </e-series>
                        </e-series-collection>
                    </ejs-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.text-style {
    margin-left: 5px;
    font-size: 16px;
    font-style: normal;
    font-family: Roboto;
    font-weight: 600;
    text-anchor: middle;
    transform: none;
    opacity: 1;
}

.radarText {
    margin-left: 5px;
    fill: rgb(97, 97, 97);
    font-size: 14px;
    font-style: normal;
    font-family: Roboto;
    font-weight: 400;
    text-anchor: start;
    transform: none;
    opacity: 1;
}

.radarDisableText {
    margin-left: 5px;
    fill: rgb(211, 211, 211);
    color: rgb(211, 211, 211);
    font-size: 14px;
    font-style: normal;
    font-family: Roboto;
    font-weight: 400;
    text-anchor: start;
    transform: none;
    opacity: 1;
}
</style>