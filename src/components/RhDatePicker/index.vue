<template>
  <!-- 日期选择组件 -->
  <el-popover placement="bottom" :width="400" trigger="click" ref="popoverRef">
    <template #reference>
      <el-button icon="Calendar">{{ title }}</el-button>
    </template>

    <div class="date-picker">
      <!-- 快捷时间 -->
      <div class="date-picker__section">
        <div class="date-picker__label">快捷时间</div>
        <div class="date-picker__shortcuts">
          <div
            class="shortcut-item"
            :class="{ active: easyTimeActiveIdx === index }"
            v-for="(item, index) in SHORTCUTS"
            :key="index"
            @click="handleShortcut(index)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>

      <!-- 指定时间 -->
      <div class="date-picker__section">
        <div class="date-picker__label">指定时间</div>
        <div class="date-picker__range">
          <el-date-picker
            v-model="startTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="开始时间"
            :teleported="false"
            @change="handleChangeTime"
          />
          <span class="date-picker__separator">至</span>
          <el-date-picker
            v-model="endTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="结束时间"
            :teleported="false"
            @change="handleChangeTime"
          />
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="date-picker__footer">
        <el-button @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </div>
  </el-popover>
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

// 快捷时间配置
const SHORTCUTS = [
  { label: "近一小时", handler: () => getTimeRange(1) },
  { label: "近一天", handler: () => getPastNDaysRange(1) },
  { label: "近一周", handler: () => getPastNDaysRange(7) },
  { label: "近一月", handler: () => getPastNDaysRange(30) },
  { label: "近一年", handler: () => getPastNDaysRange(365) },
  { label: "上一小时", handler: () => [getTimeRange(2)[0], getTimeRange(1)[0]] },
  { label: "上一天", handler: () => getPreviousDayRange() },
  { label: "上一周", handler: () => getPreviousWeekRange() },
  { label: "上一月", handler: () => getPreviousMonthRange() },
  { label: "上一年", handler: () => getPreviousYearRange() },
];

const DEFAULT_INDEX = 1; // 默认选中"近一天"

const popoverRef = ref();
const startTime = ref("");
const endTime = ref("");
const dateRange = ref({ startTime: "", endTime: "" });
const easyTimeActiveIdx = ref(DEFAULT_INDEX);

// 显示标题
const title = computed(() => {
  if (startTime.value || endTime.value) return "自定义";
  return SHORTCUTS[easyTimeActiveIdx.value].label;
});

onMounted(() => handleShortcut(DEFAULT_INDEX));

// 修改时间
const handleChangeTime = () => {
  easyTimeActiveIdx.value = startTime.value || endTime.value ? null : DEFAULT_INDEX;
};

// 点击快捷时间
const handleShortcut = index => {
  startTime.value = "";
  endTime.value = "";
  easyTimeActiveIdx.value = index;
  const [start, end] = SHORTCUTS[index].handler();
  dateRange.value = { startTime: start, endTime: end };
  closeAndEmit();
};

// 确定
const handleConfirm = () => {
  if (startTime.value || endTime.value) {
    dateRange.value = { startTime: startTime.value || "", endTime: endTime.value || "" };
    closeAndEmit();
    return;
  }
  handleShortcut(easyTimeActiveIdx.value);
};

// 重置
const handleReset = () => {
  startTime.value = "";
  endTime.value = "";
  easyTimeActiveIdx.value = DEFAULT_INDEX;
  handleShortcut(DEFAULT_INDEX);
};

// 关闭并触发事件
const closeAndEmit = () => {
  emits("confirm", dateRange.value);
  popoverRef.value.hide();
};
</script>

<style lang="scss" scoped>
.date-picker {
  &__section {
    margin-bottom: 16px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__label {
    font-size: 13px;
    font-weight: 500;
    color: var(--el-text-color-primary);
    margin-bottom: 10px;
  }

  &__shortcuts {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
  }

  &__range {
    display: flex;
    align-items: center;
    gap: 8px;

    .el-date-editor {
      flex: 1;
    }
  }

  &__separator {
    color: var(--el-text-color-secondary);
    flex-shrink: 0;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--el-border-color-lighter);
  }
}

.shortcut-item {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: var(--el-text-color-regular);
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--el-color-primary);
    border-color: var(--el-color-primary-light-5);
    background: var(--el-color-primary-light-9);
  }

  &.active {
    color: #fff;
    background: var(--el-color-primary);
    border-color: var(--el-color-primary);
  }
}
</style>
