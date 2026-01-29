<template>
  <div class="rh-preview-json" :style="{ width }">
    <div class="rh-preview-json__header">
      <span>{{ title }}</span>
      <span class="rh-preview-json__badge">JSON</span>
    </div>
    <pre class="rh-preview-json__content" :style="{ maxHeight }">{{ formattedData }}</pre>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // 预览数据
  data: {
    type: [Object, Array],
    default: () => ({}),
  },
  // 标题
  title: {
    type: String,
    default: "数据预览",
  },
  // 宽度
  width: {
    type: String,
    default: "300px",
  },
  // 内容最大高度
  maxHeight: {
    type: String,
    default: "400px",
  },
});

const formattedData = computed(() => {
  return JSON.stringify(props.data, null, 2);
});
</script>

<style lang="scss" scoped>
.rh-preview-json {
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid var(--el-border-color-lighter);
  background: var(--el-fill-color-lighter);
  overflow: hidden;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    font-size: 13px;
    font-weight: 500;
    color: var(--el-text-color-primary);
    border-bottom: 1px solid var(--el-border-color-lighter);
    background: var(--el-fill-color-light);
  }

  &__badge {
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }

  &__content {
    margin: 0;
    padding: 14px;
    overflow: auto;
    font-size: 12px;
    font-family: "SF Mono", Monaco, Consolas, monospace;
    line-height: 1.6;
    color: var(--el-text-color-regular);
    white-space: pre-wrap;
    word-break: break-all;
  }
}
</style>

