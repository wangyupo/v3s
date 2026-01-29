<template>
  <div>
    <div class="chart-container" :style="containerStyle" @mousedown="initDrag">
      <RhWrapper class="w-full h-full">
        <RhChart :option="option" type="lb" />
      </RhWrapper>
      <!-- 拖拽手柄 -->
      <div class="resize-handle">
        <el-icon><Rank /></el-icon>
      </div>
    </div>

    <div class="mt-4 flex items-center gap-3">
      <el-button type="primary" @click="fn_api">更新数据</el-button>
      <span class="text-sm text-gray-400">拖拽右下角可调整图表大小</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { Rank } from "@element-plus/icons-vue";
import RhChart from "@/components/RhChart/index.vue";

const option = ref({});
const size = reactive({ width: 400, height: 300 });
const startPos = ref({ x: 0, y: 0 });

const containerStyle = computed(() => ({
  width: `${size.width}px`,
  height: `${size.height}px`,
}));

onMounted(() => fn_api());

const fn_api = () => {
  const categories = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const seriesData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
  option.value = {
    xAxis: { data: categories },
    series: [{ name: "Count", type: "bar", data: seriesData }],
  };
};

// 拖拽调整大小
const initDrag = event => {
  if (!event.target.closest(".resize-handle")) return;
  startPos.value = { x: event.clientX, y: event.clientY };
  document.addEventListener("mousemove", doDrag);
  document.addEventListener("mouseup", stopDrag);
};

const doDrag = event => {
  const dx = event.clientX - startPos.value.x;
  const dy = event.clientY - startPos.value.y;
  size.width = Math.max(size.width + dx, 200);
  size.height = Math.max(size.height + dy, 150);
  startPos.value = { x: event.clientX, y: event.clientY };
};

const stopDrag = () => {
  document.removeEventListener("mousemove", doDrag);
  document.removeEventListener("mouseup", stopDrag);
};
</script>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--el-border-color-lighter);
  background: var(--el-fill-color-lighter);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    .resize-handle {
      opacity: 1;
    }
  }
}

.resize-handle {
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  cursor: nwse-resize;
  opacity: 0.6;
  transition: all 0.2s;
  transform: rotate(90deg);

  &:hover {
    background: var(--el-color-primary);
    color: #fff;
    transform: rotate(90deg) scale(1.1);
  }
}
</style>
