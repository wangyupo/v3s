<template>
  <!-- 示例页面-日期选择组件 -->
  <div>
    <RhDatePicker @confirm="handleConfirm" />
    <code>
      <pre>
{{ dateRange }}
      </pre>
    </code>
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
