/**
 * Echarts 默认配置
 * 在组件使用时传入 type 字段，以应用默认配置，如：<RhChart type="lb" />
 * 示例代码见 /src/views/aExample/exampleComponent/chartBar.vue
 */
const config = {
  // Line（折线图） 或 Bar （柱状图） 竖向 默认配置
  lb: {
    grid: { bottom: 30 },
    tooltip: {},
    legend: { top: 10 },
    xAxis: { type: "category" },
    yAxis: { type: "value" },
    series: [],
  },
  // Line（折线图） 或 Bar （柱状图） 横向 默认配置
  lb_row: {
    grid: { bottom: 30 },
    tooltip: {},
    legend: { top: 10 },
    yAxis: { type: "category" },
    xAxis: { type: "value" },
    series: [],
  },
  // Pie（饼图） 默认配置
  pie: {
    tooltip: { trigger: "item" },
    legend: { top: "5%", left: "center" },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: "#fff", borderWidth: 2 },
        label: { show: false, position: "center" },
        emphasis: {
          label: { show: true, fontSize: 40, fontWeight: "bold" },
        },
        labelLine: { show: false },
        data: [],
      },
    ],
  },
};

export default config;
