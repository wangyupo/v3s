<template>
  <!-- echarts 组件（由 props.option.series 实现） -->
  <div class="relative w-full h-full overflow-hidden">
    <div ref="chartRef" class="absolute top-0 bottom-0 left-0 right-0"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import * as echarts from "echarts";
import { debounce, merge, cloneDeep } from "lodash-es";
import config from "./config.js";

const props = defineProps({
  // 图表配置项
  option: {
    type: Object,
    default: () => ({}),
  },
  // 地图类型，通用类型由 ./config.js 文件维护。
  type: String,
});

const chartRef = ref(); // echarts图表 dom 对象
let chartInstance = null; // echarts实例
let resizeObserver = null; // 用于监听父级 div 大小变化的 ResizeObserver 实例
const dataIndex = ref(); // echarts选中的数据项的 index（通常用于点击地图外部取消选中）

// 在 props.option 变化时，重新初始化图表
watch(
  () => props.option,
  debounce(() => {
    if (!chartInstance) return;
    initLineChart();
  }, 150)
);

// 组件挂载完成后执行
onMounted(() => {
  // 1、初始化图表
  initLineChart();
  // 2、监听 echarts图表 父元素的大小变化
  setupResizeObserver();
});

// 初始化图表/更新图表数据
const initLineChart = debounce(() => {
  if (!chartRef.value) return;

  if (!chartInstance) {
    const chartDom = chartRef.value;
    chartInstance = echarts.init(chartDom);
  }

  // 合并组件内部的option与外部传入的option
  const mergedOption = config[props.type] ? merge(cloneDeep(config[props.type]), props.option) : props.option;
  chartInstance.setOption(mergedOption);

  /* 地图相关 START */
  if (props.type == "map") {
    // ECharts 实例上的事件系统添加一个监听器
    chartInstance.on(
      "click",
      debounce(params => {
        dataIndex.value = params.dataIndex; // 记录当前点击数据项的 index
      }, 200)
    );
    // 获取 ECharts 底层的渲染器 ZRender 实例，并添加事件监听
    chartInstance.getZr().on(
      "click",
      debounce(params => {
        if (params.target) return;
        chartInstance.dispatchAction({ type: "unselect", dataIndex: dataIndex.value });
      }, 200)
    );
  }
  /* 地图相关 END */
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

defineExpose({ chartInstance });
</script>

<style scoped></style>
