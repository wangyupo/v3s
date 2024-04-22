<template>
  <div class="resizable p-4" style="width: var(--resize-width); height: var(--resize-height)" @mousedown="initDrag">
    <RhWrapper class="w-full h-full">
      <RhChartLB ref="chartComponent" :option="option" type="lb"></RhChartLB>
    </RhWrapper>
    <div class="handle z-40"></div>
  </div>
  <el-button type="primary" @click="fn_api">更变数据</el-button>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import RhChartLB from "@/components/RhChart/index.vue";

const option = ref({});

onMounted(() => {
  fn_api();
});

const fn_api = () => {
  const categories = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const seriesData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
  option.value = {
    xAxis: { data: categories },
    series: [{ name: "Count", type: "bar", data: seriesData }],
  };
};

/* div缩放 START */
const size = reactive({
  width: 300,
  height: 300,
});
const startPos = ref({ x: 0, y: 0 });

const initDrag = event => {
  startPos.value = { x: event.clientX, y: event.clientY };

  document.addEventListener("mousemove", doDrag);
  document.addEventListener("mouseup", stopDrag);
};

const doDrag = event => {
  const dx = event.clientX - startPos.value.x;
  const dy = event.clientY - startPos.value.y;

  size.width = Math.max(size.width + dx, 50); // 添加最小宽度限制
  size.height = Math.max(size.height + dy, 50); // 添加最小高度限制

  startPos.value = { x: event.clientX, y: event.clientY };

  event.target.style.setProperty("--resize-width", `${size.width}px`);
  event.target.style.setProperty("--resize-height", `${size.height}px`);
};

const stopDrag = () => {
  document.removeEventListener("mousemove", doDrag);
  document.removeEventListener("mouseup", stopDrag);
};
/* div缩放 END */
</script>

<style lang="scss" scoped>
.resizable {
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;
  margin: 5px;
  border: 1px solid #ddd;
  --resize-width: 300px;
  --resize-height: 300px;
}

.handle {
  width: 20px;
  height: 20px;
  background-color: #333;
  position: absolute;
  right: 5px;
  bottom: 5px;
  cursor: nwse-resize;
}
</style>
