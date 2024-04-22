// 折线/柱状图配置
const config = {
  lb: {
    tooltip: {},
    legend: {},
    xAxis: { type: "category" },
    yAxis: { type: "value" },
    series: [],
  },
  lb_row: {
    tooltip: {},
    legend: {},
    yAxis: { type: "category" },
    xAxis: { type: "value" },
    series: [],
  },
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
