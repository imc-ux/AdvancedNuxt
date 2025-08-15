<script lang='ts' setup>
import * as echarts from "echarts";
import { onMounted, watch, ref } from 'vue';

interface Props {
  chartWidth?: number;
  dimensions: string[]
  source?: any[];
  series?: any[];
}

const props = defineProps<Props>()
const myChart = echarts;
const chartId = ref<string>(Math.random().toString());
const chartWidth = ref<number>(props.chartWidth ?? 0);


const dimensions = ref<string[]>(props.dimensions ?? []);
const source = ref<any[]>(props.source ?? []);
const series = ref<any[]>(props.series ?? []);

watch(props, (newProps) => {
  chartId.value = Math.random().toString()
  dimensions.value = newProps.dimensions ?? []
  source.value = newProps.source ?? []
  series.value = newProps.series ?? []
  chartWidth.value = newProps.chartWidth ?? 0
  initChart();
})

onMounted(() => {
  initChart();
});

function initChart() {
  const chart = myChart.init(document.getElementById('chartId'), null, {
    width: chartWidth.value,
    height: 420
  });
  chart.clear();
  chart.setOption({
    legend: { bottom:'0px' },
    tooltip: {},
    grid: { show: true, containLabel: true, left: 'left'},
    dataset: {
      dimensions: dimensions.value,
      source: source.value
    },
    xAxis: {
      type: 'category',
      splitLine: {  
        show: true
      },
    },
    yAxis: {
      min: 0,
      // max: 1200,
    },
    series: series.value
  }, true);
}

</script>

<template>
  <div>
    <div id="chartId"></div>
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
  line-height: 20.8px;
}
</style>
