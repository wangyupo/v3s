<template>
  <!-- 日期选择组件 -->
  <div>
    <el-popover placement="bottom" :width="400" trigger="click" ref="popoverRef">
      <template #reference>
        <!-- 外界显示 -->
        <el-button icon="Calendar">{{ title }}</el-button>
      </template>

      <div>
        <!-- 快速选择时间 START -->
        <div class="mb-2 font-bold">快捷时间：</div>
        <div class="flex flex-wrap justify-between">
          <div
            class="w-[69px] h-[30px] leading-[30px] border rounded cursor-pointer text-center"
            :class="[
              easyTimeActiveIdx == index
                ? 'font-bold text-white bg-[var(--el-color-primary-light-3)] border-[var(--el-color-primary-light-3)]'
                : 'border-[var(--el-border-color)] hover:bg-[var(--el-color-primary-light-9)]',
              index > 4 ? 'mt-2' : '',
            ]"
            v-for="(item, index) in easyTime"
            :key="index"
            @click="handleEasyTime(index)"
          >
            {{ item.label }}
          </div>
        </div>
        <!-- 快速选择时间 END -->

        <!-- 详细指定时间 START -->
        <div class="mt-4 mb-2 font-bold">指定时间：</div>
        <div class="flex items-center justify-between">
          <el-date-picker
            v-model="startTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择开始时间"
            style="width: calc(49% - 11px)"
            :teleported="false"
            @change="handleChangeTime"
          />
          至
          <el-date-picker
            v-model="endTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择结束时间"
            style="width: calc(49% - 11px)"
            :teleported="false"
            @change="handleChangeTime"
          />
        </div>
        <!-- 详细指定时间 END -->
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-center mt-4">
        <el-button type="primary" @click="handleConfirm">确定</el-button>
        <el-button type="default" @click="handleReset">重置</el-button>
      </div>
    </el-popover>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  getTimeRange,
  getPastNDaysRange,
  getPreviousDayRange,
  getPreviousWeekRange,
  getPreviousMonthRange,
  getPreviousYearRange,
} from "@/utils/index.js";

const emits = defineEmits(["confirm"]);
const popoverRef = ref(); // el-popover 的 DOM 对象
const startTime = ref(""); // 开始时间
const endTime = ref(""); // 结束时间
const dateRange = ref({ startTime: "", endTime: "" }); // 最终返回的日期范围
const easyTime = ref([
  { label: "近一小时" },
  { label: "近一天" },
  { label: "近一周" },
  { label: "近一月" },
  { label: "近一年" },
  { label: "上一小时" },
  { label: "上一天" },
  { label: "上一周" },
  { label: "上一月" },
  { label: "上一年" },
]);
const easyTimeActiveDefaultIdx = 1; // 默认选中的快捷时间的下标（默认选中“近一天”）
const easyTimeActiveIdx = ref(easyTimeActiveDefaultIdx); // 当前选中的快捷时间的下标

// 组件显示的标题
const title = computed(() => {
  let title = "";
  if (startTime.value || endTime.value) {
    title = "自定义";
  } else {
    title = easyTime.value[easyTimeActiveIdx.value].label;
  }
  return title;
});

// 组件挂载完成后执行
onMounted(() => {
  handleEasyTime(easyTimeActiveDefaultIdx);
});

// 修改时间
const handleChangeTime = time => {
  if (startTime.value || endTime.value) {
    easyTimeActiveIdx.value = null;
    return;
  }
  easyTimeActiveIdx.value = easyTimeActiveDefaultIdx;
};

// 点击快速时间
const handleEasyTime = index => {
  easyTimeActiveIdx.value = index;
  const label = easyTime.value[index].label;
  let timeRange = [];
  if (label == "近一小时") {
    timeRange = getTimeRange(1);
  } else if (label == "近一天") {
    timeRange = getPastNDaysRange(1);
  } else if (label == "近一周") {
    timeRange = getPastNDaysRange(7);
  } else if (label == "近一月") {
    timeRange = getPastNDaysRange(30);
  } else if (label == "近一年") {
    timeRange = getPastNDaysRange(365);
  } else if (label == "上一小时") {
    timeRange = [getTimeRange(2)[0], getTimeRange(1)[0]];
  } else if (label == "上一天") {
    timeRange = getPreviousDayRange();
  } else if (label == "上一周") {
    timeRange = getPreviousWeekRange();
  } else if (label == "上一月") {
    timeRange = getPreviousMonthRange();
  } else if (label == "上一年") {
    timeRange = getPreviousYearRange();
  }
  dateRange.value = { startTime: timeRange[0], endTime: timeRange[1] };
  handleClosePopover();
};

// 确定
const handleConfirm = () => {
  if (startTime.value || endTime.value) {
    dateRange.value.startTime = startTime.value ? startTime.value : "";
    dateRange.value.endTime = endTime.value ? endTime.value : "";
    handleClosePopover();
    return;
  }
  handleEasyTime(easyTimeActiveIdx.value);
};

// 重置
const handleReset = () => {
  startTime.value = "";
  endTime.value = "";
  easyTimeActiveIdx.value = easyTimeActiveDefaultIdx;
  handleEasyTime(easyTimeActiveDefaultIdx);
  handleClosePopover();
};

// 关闭 popover
const handleClosePopover = () => {
  emits("confirm", dateRange.value);
  popoverRef.value.hide();
};
</script>

<style lang="scss"></style>
