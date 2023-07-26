<template>
  <!-- 大屏示例页面 -->
  <RhLargeScreenWrapper>
    <div class="flex items-center justify-center h-[94px] text-[42px] flex-shrink-0">
      xxxx默认标题
      <Decoration5 style="width: 1100px; height: 70px" class="absolute top-[38px]" />
    </div>
    <div class="flex justify-between p-3 pt-0">
      <div>
        <div class="w-[459px] h-[332px] flex-shrink-0">
          <div class="w-full h-full" ref="chart"></div>
        </div>
        <div class="mt-3 w-[459px] h-[332px] flex-shrink-0"></div>
        <div class="mt-3 w-[459px] h-[273px] flex-shrink-0"></div>
      </div>

      <div class="flex flex-col mx-[14px] w-[941px] flex-shrink-0">
        <div class="flex-1"></div>
        <div class="flex justify-between">
          <div class="mt-3 w-[459px] h-[273px] flex-shrink-0"></div>
          <div class="mt-3 w-[459px] h-[273px] flex-shrink-0"></div>
        </div>
      </div>

      <div>
        <div class="w-[459px] h-[332px] flex-shrink-0">
          <div class="w-full h-full"></div>
        </div>
        <div class="mt-3 w-[459px] h-[332px] flex-shrink-0"></div>
        <div class="mt-3 w-[459px] h-[273px] flex-shrink-0"></div>
      </div>
    </div>
  </RhLargeScreenWrapper>
</template>

<script setup>
import * as echarts from "echarts";
import RhLargeScreenWrapper from "@/components/RhLargeScreenWrapper.vue";
import { onMounted, ref } from "vue";

const chart = ref();
onMounted(() => {
  var myChart = echarts.init(chart.value);
  var option;

  option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };

  option && myChart.setOption(option);
});
</script>

<style lang="scss" scoped></style>
