<template>
  <!-- 无缝滚动包裹 -->
  <div class="rh-seamless-wrapper" :style="wrapperStyle">
    <div
      class="rh-seamless-wrapper__main"
      :class="{ 'flex-col': isVertical }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- 列表主体 -->
      <div ref="slotListRef" :style="listStyle">
        <slot></slot>
      </div>
      <!-- 列表复制品 -->
      <div v-html="copyHtml" :style="listStyle"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onUnmounted, ref, watch } from "vue";

const props = defineProps({
  // 列表数据（监听变化，初始化滚动）
  data: Array,
  // 容器宽度
  width: [Number, String],
  // 容器高度
  height: [Number, String],
  // 配置项
  options: {
    type: Object,
    default: () => ({}),
  },
});

// 默认配置
const DEFAULT_OPTIONS = {
  step: 1, // 移动步距，值越大速度越快
  direction: "vertical", // 滚动方向：vertical | horizontal
  hoverStop: true, // 悬停暂停
};

const slotListRef = ref();
const slotListHeight = ref(0);
const slotListWidth = ref(0);
const slotListTop = ref(0);
const slotListLeft = ref(0);
const copyHtml = ref("");
const reqFrame = ref(null);

// 合并配置
const mergedOptions = computed(() => ({ ...DEFAULT_OPTIONS, ...props.options }));
const isVertical = computed(() => mergedOptions.value.direction === "vertical");

// 单位处理
const toUnit = val => (typeof val === "string" ? val : `${val}px`);

// 容器样式
const wrapperStyle = computed(() => {
  if (isVertical.value) {
    return {
      width: props.width ? toUnit(props.width) : "auto",
      height: props.height ? toUnit(props.height) : toUnit(slotListHeight.value),
    };
  }
  return {
    width: props.width ? toUnit(props.width) : toUnit(slotListWidth.value),
    height: props.height ? toUnit(props.height) : "auto",
  };
});

// 列表样式
const listStyle = computed(() => ({
  display: "flex",
  flexDirection: isVertical.value ? "column" : "row",
  transform: isVertical.value
    ? `translateY(${slotListTop.value}px)`
    : `translateX(${slotListLeft.value}px)`,
}));

// 监听数据变化，初始化滚动
watch(
  () => props.data,
  () => {
    nextTick(() => {
      reset();
      if (!slotListRef.value) return;
      slotListWidth.value = slotListRef.value.offsetWidth;
      slotListHeight.value = slotListRef.value.offsetHeight;
      copyHtml.value = slotListRef.value.innerHTML;
      startScroll();
    });
  },
  { immediate: true }
);

onUnmounted(() => reset());

// 重置状态
const reset = () => {
  slotListWidth.value = 0;
  slotListHeight.value = 0;
  slotListTop.value = 0;
  slotListLeft.value = 0;
  copyHtml.value = "";
  if (reqFrame.value) {
    cancelAnimationFrame(reqFrame.value);
    reqFrame.value = null;
  }
};

// 启动滚动动画
const startScroll = () => {
  const { step } = mergedOptions.value;
  const distanceRef = isVertical.value ? slotListTop : slotListLeft;
  const maxDistance = isVertical.value ? -slotListHeight.value : -slotListWidth.value;

  const move = () => {
    distanceRef.value -= step;
    if (distanceRef.value <= maxDistance) distanceRef.value = 0;
    if (slotListRef.value) reqFrame.value = requestAnimationFrame(move);
  };
  reqFrame.value = requestAnimationFrame(move);
};

// 暂停滚动
const handleMouseEnter = () => {
  if (mergedOptions.value.hoverStop && reqFrame.value) {
    cancelAnimationFrame(reqFrame.value);
    reqFrame.value = null;
  }
};

// 恢复滚动
const handleMouseLeave = () => {
  if (mergedOptions.value.hoverStop) startScroll();
};
</script>

<style lang="scss" scoped>
.rh-seamless-wrapper {
  overflow: hidden;

  &__main {
    display: flex;
    flex-shrink: 0;

    > div {
      flex-shrink: 0;
    }
  }
}
</style>
