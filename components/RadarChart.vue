<script lang='ts' setup>
import * as echarts from "echarts";
import { onMounted, watch, ref } from 'vue';

interface Props {
  dataList?: any;
  isFillUp?: boolean;
  id?: string;
}

const TIMEPARTS = [
  { name: '23:00-23:59', code: 23 },
  { name: '22:00-23:00', code: 22 },
  { name: '21:00-22:00', code: 21 },
  { name: '20:00-21:00', code: 20 },
  { name: '19:00-20:00', code: 19 },
  { name: '18:00-19:00', code: 18 },
  { name: '17:00-18:00', code: 17 },
  { name: '16:00-17:00', code: 16 },
  { name: '15:00-16:00', code: 15 },
  { name: '14:00-15:00', code: 14 },
  { name: '13:00-14:00', code: 13 },
  { name: '12:00-13:00', code: 12 },
  { name: '11:00-12:00', code: 11 },
  { name: '10:00-11:00', code: 10 },
  { name: '9:00-10:00', code: 9 },
  { name: '8:00-9:00', code: 8 },
  { name: '7:00-8:00', code: 7 },
  { name: '6:00-7:00', code: 6 },
  { name: '5:00-6:00', code: 5 },
  { name: '4:00-5:00', code: 4 },
  { name: '3:00-4:00', code: 3 },
  { name: '2:00-3:00', code: 2 },
  { name: '1:00-2:00', code: 1 },
  { name: '0:00-1:00', code: 0 },
]

const props = defineProps<Props>()
const userColor = ref<string>('')
const radarValue = ref<any>(props.dataList)
const isFill = ref<boolean>(props.isFillUp ?? false);
const myChart = echarts;

watch(props, (nweProps) => {
  radarValue.value = nweProps.dataList ?? []
  isFill.value = nweProps.isFillUp ?? false
  opt(nweProps.isFillUp);
})

onMounted(() => {
  opt(props.isFillUp);                                          
});

function opt(value: boolean) {
  if (value) {
    initChart(0.5);
  } else {
    initChart(0);
  }
}

function initChart(opacity: number) {
  userColor.value = radarValue.value.color;
  const initOption = {
    tooltip: {},
    radar: {
      shape: 'circle',
      startAngle: 105,
      axisTick: { show: true, length: 2 },
      splitNumber: 6,
      centerL: ['50%', '50%'],
      indicator: [
        { name: '0', max: 60, axisLabel: { show: true } },
        { name: '1', max: 60 },
        { name: '2', max: 60 },
        { name: '3', max: 60 },
        { name: '4', max: 60 },
        { name: '5', max: 60 },
        { name: '6', max: 60 },
        { name: '7', max: 60 },
        { name: '8', max: 60 },
        { name: '9', max: 60 },
        { name: '10', max: 60 },
        { name: '11', max: 60 },
        { name: '12', max: 60 },
        { name: '13', max: 60 },
        { name: '14', max: 60 },
        { name: '15', max: 60 },
        { name: '16', max: 60 },
        { name: '17', max: 60 },
        { name: '18', max: 60 },
        { name: '19', max: 60 },
        { name: '20', max: 60 },
        { name: '21', max: 60 },
        { name: '22', max: 60 },
        { name: '23', max: 60 },
      ].reverse()
    },
    series: buildSeries(getChartData(radarValue.value.listTime), opacity, userColor.value)
  }
  const chart = myChart.init(document.getElementById(props.id as string));
  let option = {};
  option = Object.assign(option, initOption);
  chart.clear();
  chart.setOption(option, true);
}

function buildSeries(data: any, opacity: number, color: string) {
  const helper = data.map((item: any, index: number) => {
    const arr = new Array(data.length);
    arr.splice(index, 1, item);
    return arr;
  })
  return [data, ...helper].map((item: any, index: number) => {
    return {
      type: 'radar',
      areaStyle: {
        opacity: opacity
      },
      itemStyle: {
        color: color
      },
      lineStyle: {
        color: index === 0 ? color : 'transparent'
      },
      tooltip: {
        show: index === 0 ? false : true,
        formatter: function () {
          return `${TIMEPARTS[index - 1].name} : ${data[index - 1]}分钟`;
        }
      },
      z: index === 0 ? 1 : 2,
      data: [item]
    }
  })
}

function getChartData(value: any) {
  const initValue: number[] = value.map(function (item: any) {
    return item.diffTime;
  })
  return initValue.reverse();
}

function disFn() {
  const chart = myChart.init(document.getElementById(props.id as string));
  chart.dispose();
}

</script>

<template>
  <div>
    <div class="echarts-title">
      <span class="text-style" :style="'color:' + userColor">{{ radarValue.name }}</span>
      <span class="text-style" :style="'color: #606266'">{{ radarValue.titleName }}</span>
    </div>
    <div :id="props.id" class="echarts-box"></div>
  </div>
</template>

<style>
.echarts-title {
  width: 360px;
  display: flex;
  justify-content: center;
}

.echarts-box {
  width: 360px;
  height: 360px;
}

.text-style {
  margin-left: 5px;
  font-size: 16px;
  font-style: normal;
  font-family: Roboto;
  font-weight: 600;
  text-anchor: middle;
  transform: none;
  opacity: 1;
  line-height: 20.8px;
}
</style>
