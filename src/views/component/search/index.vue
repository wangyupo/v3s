<template>
  <!-- 搜索示例 -->
  <RhTitle title="通用搜索组件" />
  <div class="flex gap-4">
    <!-- 左侧：搜索组件 -->
    <div class="flex-1">
      <RhSearch :searchInfo="searchInfo" @search="handleSearch" />
    </div>

    <!-- 右侧：数据预览 -->
    <RhPreviewJSON :data="searchForm" title="JSON" />
  </div>

  <RhTitle title="特殊时间筛选组件" class="mt-6" />
  <div class="flex gap-4">
    <!-- 左侧：日期选择 -->
    <div class="flex-1">
      <RhDatePicker @confirm="handleConfirm" />
    </div>

    <!-- 右侧：数据预览 -->
    <RhPreviewJSON :data="dateRange" title="选择结果" />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

// 条件配置
const searchForm = ref({});
const searchInfo = ref([
  {
    type: "input",
    label: "名称",
    key: "name",
    defaultValue: "Jackson",
  },
  {
    type: "select",
    label: "类型",
    key: "type",
    defaultValue: "",
    options: [
      { value: "1", label: "选项一" },
      { value: "2", label: "选项二" },
    ],
  },
  {
    type: "daterange",
    label: "日期范围",
    startPlaceholder: "开始日期",
    endPlaceholder: "结束日期",
    key: "time",
    startKey: "startTime",
    endKey: "endTime",
    defaultValue: [],
    disableFuture: true, // 是否禁用未来日期
    withTime: true, // 是否追加时分秒
  },
  {
    type: "select",
    label: "联动一级",
    key: "level1",
    defaultValue: "",
    options: [
      { value: 1, label: "1" },
      { value: 2, label: "2" },
    ],
    change: val => {
      // 下拉框联动示例
      if (val === 1) {
        searchInfo.value[4].options = [{ value: "1-1", label: "1-1" }];
      } else if (val === 2) {
        searchInfo.value[4].options = [{ value: "2-1", label: "2-1" }];
      } else {
        searchInfo.value[4].options = [];
      }
    },
  },
  {
    type: "select",
    label: "联动二级",
    key: "level2",
    defaultValue: "",
    options: [],
  },
  {
    type: "month",
    label: "月份",
    key: "month",
  },
]);
const dateRange = ref([]);

// 条件查询
const handleSearch = params => {
  searchForm.value = params;
};

// 时间筛选
const handleConfirm = value => {
  dateRange.value = value;
};
</script>

<style lang="scss" scoped></style>
