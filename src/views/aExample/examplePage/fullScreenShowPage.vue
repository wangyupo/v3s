<template>
  <div class="home w-full h-full grid grid-cols-12 gap-3">
    <div class="col-span-3 grid grid-rows-12 gap-y-3">
      <div class="row-span-4 border border-gray-300">
        <RhChartLB :option="option" type="lb"></RhChartLB>
      </div>
      <div class="row-span-4 border border-gray-300">
        <RhChartLB :option="option1" type="lb"></RhChartLB>
      </div>
      <div class="row-span-4 border border-gray-300">
        <RhChartLB :option="option2" type="lb"></RhChartLB>
      </div>
    </div>
    <div class="col-span-6 grid grid-rows-12 gap-y-3">
      <div class="row-span-8 border border-gray-300 relative">
        <el-button type="primary" class="absolute left-0 top-0 z-10" @click="fn_api">更新数据</el-button>
        <RhChartLB ref="mapRef" :option="optionMap" type="map"></RhChartLB>
      </div>
      <div class="row-span-4 grid grid-cols-12 gap-3">
        <div class="col-span-6 border border-gray-300">
          <RhChartLB :option="option3" type="pie"></RhChartLB>
        </div>
        <div class="col-span-6 border border-gray-300">
          <RhChartLB :option="option4" type="pie"></RhChartLB>
        </div>
      </div>
    </div>
    <div class="col-span-3 grid grid-rows-12 gap-y-3">
      <div class="row-span-4 border border-gray-300">
        <RhChartLB :option="option5" type="lb_row"></RhChartLB>
      </div>
      <div class="row-span-4 border border-gray-300">
        <RhChartLB :option="option6" type="lb_row"></RhChartLB>
      </div>
      <div class="row-span-4 border border-gray-300">
        <RhChartLB :option="option7" type="lb_row"></RhChartLB>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { generateRandomArray, generateRandomString } from "@/utils/index.js";
import chinaGeoJson from "@/assets/map/china.json";
import * as echarts from "echarts";

import RhChartLB from "@/components/RhChart/index.vue";

const option = ref({});
const option1 = ref({});
const option2 = ref({});
const option3 = ref({});
const option4 = ref({});
const option5 = ref({});
const option6 = ref({});
const option7 = ref({});
const mapRef = ref();
const optionMap = ref({});

onMounted(() => {
  createMap();
  fn_api();
});

// 创建地图
const createMap = () => {
  echarts.registerMap("china", chinaGeoJson);
  optionMap.value = {
    series: [{ type: "map", map: "china", label: { show: true } }],
  };
};

const fn_api = () => {
  const categories = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const seriesData = generateRandomArray(7);
  const seriesData1 = generateRandomArray(7);
  const seriesData3 = generateRandomArray(7).map(i => {
    return { name: generateRandomString(3, 8), value: i };
  });
  const seriesData4 = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)).map(i => {
    return { name: generateRandomString(3, 8), value: i };
  });
  option.value = {
    xAxis: { data: categories },
    series: [{ name: "Count", type: "bar", data: seriesData }],
  };
  option1.value = {
    xAxis: { data: categories },
    series: [{ name: "Count", type: "line", data: seriesData }],
  };
  option2.value = {
    xAxis: { data: categories },
    series: [
      { name: "Count", type: "bar", data: seriesData },
      { name: "Number", type: "line", data: seriesData1 },
    ],
  };
  option3.value = {
    series: [{ name: "Count", data: seriesData3 }],
  };
  option4.value = {
    series: [{ name: "Number", data: seriesData4 }],
  };
  option5.value = {
    yAxis: { data: categories },
    series: [{ name: "Number", type: "bar", data: seriesData }],
  };
  option6.value = {
    yAxis: { data: categories },
    series: [
      { name: "Count", type: "bar", stack: "total", data: seriesData1 },
      { name: "Number", type: "bar", stack: "total", data: seriesData },
    ],
  };
  option7.value = {
    yAxis: { data: categories },
    series: [
      { name: "Count", type: "bar", data: seriesData1 },
      { name: "Number", type: "bar", data: seriesData },
    ],
  };
};
</script>

<style lang="scss" scoped></style>
