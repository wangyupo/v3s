<template>
  <!-- 表单字段容器（label + 内容） -->
  <div class="rh-field" :class="[`is-${labelPosition}`]" :style="fieldStyle">
    <!-- label 区：支持 slot 覆盖，默认显示 props.label -->
    <div class="rh-field-label" :class="labelClass" :style="labelStyle">
      <slot name="label">{{ label }}</slot>
    </div>
    <!-- 内容区：通常放 input/select/date 等控件；若未传 slot，则回退到 props.content -->
    <div class="rh-field-content">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // label 文本
  label: { type: String, default: "默认文字" },
  // 内容
  content: { type: String, default: "默认内容" },
  // 整体文字色
  color: { type: String, default: "" },
  // label 文字色
  labelColor: { type: String, default: "" },
  // label 固定宽度（仅 labelPosition='left' 时生效；支持 number(px)/string）
  labelWidth: { type: [String, Number], default: "" },
  // label 样式
  labelClass: { type: [String, Array, Object], default: "" },
  // 内容区文字色
  contentColor: { type: String, default: "" },
  // 整体交叉轴对齐
  alignItems: { type: String, default: "" },
  // label 文本对齐
  labelAlign: { type: String, default: "left" },
  // label 布局位置：left（横向）/top（纵向）
  labelPosition: { type: String, default: "left" },
  // label 与内容区的间距（number 会转 px；string 可传 '12px' 等）
  gap: { type: [String, Number], default: 12 },
});

// 将简写对齐值映射到 CSS align-items 的合法值
const mapAlignItems = val => {
  const map = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    baseline: "baseline",
    stretch: "stretch",
  };
  return map[val] || "center";
};

// 通过 CSS 变量控制颜色、间距、对齐等，方便在样式层统一接管/覆盖
const fieldStyle = computed(() => ({
  "--rh-field-color": props.color || undefined,
  "--rh-field-label-color": props.labelColor || undefined,
  "--rh-field-label-align": props.labelAlign,
  "--rh-field-content-color": props.contentColor || undefined,
  "--rh-field-gap": typeof props.gap === "number" ? `${props.gap}px` : props.gap,
  ...(props.alignItems && {
    "--rh-field-align-items": mapAlignItems(props.alignItems),
  }),
}));

// labelWidth 仅在 labelPosition='left' 时生效；top 模式下 label 不固定宽度
const labelStyle = computed(() => {
  if (!props.labelWidth || props.labelPosition === "top") return {};
  return {
    width: typeof props.labelWidth === "number" ? `${props.labelWidth}px` : props.labelWidth,
  };
});
</script>

<style lang="scss" scoped>
.rh-field {
  display: flex;
  align-items: var(--rh-field-align-items, start);
  gap: var(--rh-field-gap, 0px);
  line-height: 1.4;
  color: var(--rh-field-color, inherit);

  &.is-top {
    flex-direction: column;
    align-items: flex-start;
  }

  &-label {
    flex-shrink: 0;
    white-space: nowrap;
    text-align: var(--rh-field-label-align, left);
    color: var(--rh-field-label-color, var(--rh-field-color, inherit));
  }

  &-content {
    display: flex;
    align-items: center;
    color: var(--rh-field-content-color, var(--rh-field-color, inherit));
    word-break: break-word;
    white-space: pre-wrap;
  }
}
</style>
