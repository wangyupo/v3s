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
        <el-checkbox v-model="autoUpdate" class="absolute left-3 top-1 z-10" @change="toggleAutoUpdate">
          自动更新数据{{ autoUpdate ? `（${countup}s）` : "" }}
        </el-checkbox>
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
import { onMounted, onUnmounted, ref } from "vue";
import { generateRandomArray, generateRandomString, generateRandomNumber } from "@/utils/index.js";
import chinaGeoJson from "@/assets/geo/china.json";
import * as echarts from "echarts";
import RhChartLB from "@/components/RhChart/index.vue";

const autoUpdate = ref(true);
const countup = ref(5);
const intervalId = ref(null);
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
  fn_api();
  toggleAutoUpdate(autoUpdate.value);
});

onUnmounted(() => {
  clearInterval(intervalId.value);
});

// 启用/取消数据自动更新
const toggleAutoUpdate = val => {
  if (!val) {
    clearInterval(intervalId.value);
    countup.value = 5;
  } else {
    intervalId.value = setInterval(() => {
      countup.value--;
      if (countup.value == 0) {
        fn_api();
        countup.value = 5;
      }
    }, 1000);
  }
};

// 创建地图
echarts.registerMap("china", chinaGeoJson);
const createMap = () => {
  const mockMapData = chinaGeoJson.features
    .filter(i => !["十段线", "南海诸岛"].includes(i.properties.name) && i.properties.center)
    .map(i => {
      return { name: i.properties.name, value: i.properties.center.concat(generateRandomNumber(1, 100)) };
    });
  optionMap.value = {
    tooltip: {
      trigger: "item",
    },
    geo: { map: "china", label: { show: true }, selectedMode: true },
    series: [
      {
        name: "pm2.5",
        type: "scatter",
        coordinateSystem: "geo",
        data: mockMapData,
        symbolSize: function (val) {
          return val[2] / 5;
        },
        encode: {
          value: 2,
        },
        label: {
          formatter: "{b}",
          position: "right",
          show: false,
        },
        emphasis: {
          label: {
            show: true,
          },
        },
      },
      {
        name: "Top 5",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: mockMapData
          .sort(function (a, b) {
            return b.value[2] - a.value[2];
          })
          .slice(0, 6),
        symbolSize: function (val) {
          return val[2] / 5;
        },
        encode: {
          value: 2,
        },
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke",
        },
        label: {
          formatter: "{b}",
          position: "right",
          show: true,
        },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "#333",
        },
        emphasis: {
          scale: true,
        },
        zlevel: 1,
      },
    ],
  };
};

const fn_api = () => {
  createMap();

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
