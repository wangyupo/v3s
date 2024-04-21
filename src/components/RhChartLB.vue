<template>
  <!-- echarts 折线、柱状图组件（由 props.option.series 实现折线、柱状图） -->
  <div class="relative w-full h-full overflow-hidden">
    <div ref="chartRef" class="absolute top-0 bottom-0 left-0 right-0"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import * as echarts from "echarts";
import { debounce, merge } from "lodash-es";

const props = defineProps({
  option: {
    type: Object,
    default: () => ({}),
  },
});

// echarts 图表默认配置
const defaultOption = {
  tooltip: {},
  legend: {},
  xAxis: { type: "category" },
  yAxis: { type: "value" },
  series: [],
};
const chartRef = ref(); // echarts图表dom对象
let chartInstance = null; // echarts实例
let resizeObserver = null; // 用于监听父级div大小变化的 ResizeObserver 实例

// 在 props.option 变化时，重新初始化图表
watch(
  () => props.option,
  debounce(() => {
    if (!chartInstance) return;
    const mergedOption = merge(defaultOption, props.option);
    chartInstance.setOption(mergedOption);
  }, 150)
);

// 组件挂载完成后执行
onMounted(() => {
  // 1、初始化图表
  initLineChart();
  // 2、监听 echarts图表 父元素的大小变化
  setupResizeObserver();
});

// 初始化图表
const initLineChart = debounce(() => {
  if (!chartRef.value) return;

  const chartDom = chartRef.value;
  chartInstance = echarts.init(chartDom);

  // 合并组件内部的option与外部传入的option
  const mergedOption = merge(defaultOption, props.option);
  chartInstance.setOption(mergedOption);
}, 150);

// 初始化 ResizeObserver
const setupResizeObserver = () => {
  if (resizeObserver) return; // 如果已经设置过，防止重复设置

  const debounceResize = debounce(entries => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      chartInstance?.resize();
    }
  }, 300);

  resizeObserver = new ResizeObserver(debounceResize);

  if (chartRef.value) {
    resizeObserver.observe(chartRef.value.parentElement); // 监听父元素的大小变化
  }
};

// 组件实例被卸载之后调用
onUnmounted(() => {
  resizeObserver?.disconnect(); // 取消监听父元素的大小变化
  chartInstance?.dispose(); // 销毁 echarts 实例
});
</script>

<style scoped></style>
