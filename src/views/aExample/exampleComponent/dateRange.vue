<template>
  <!-- 示例页面-日期选择组件 -->
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
import { ref } from "vue";

const dateRange = ref([]);

// 时间筛选
const handleConfirm = value => {
  dateRange.value = value;
};
</script>

<style lang="scss" scoped></style>
