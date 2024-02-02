<template>
  <!-- 外层布局 -->
  <component :is="types[layoutType]"><slot></slot></component>
</template>

<script setup>
import LayoutClassic from "./types/LayoutClassic.vue";
import LayoutSideMenu from "./types/LayoutSideMenu.vue";
import LayoutHeadMenu from "./types/LayoutHeadMenu.vue";
import { onMounted } from "vue";
import { useLayout } from "@/hooks/useLayout.js";

const { layoutType, setElementUIThemeColor } = useLayout();

/**
 * 布局类型
 * 使用方法：把新增的 “布局组件” 名称维护进去，通过 store/layout.js 中的 state.layoutType 进行切换。
 * 注意事项：layoutType 的值需要与 types 中维护的组件名称保持一致。
 */
const types = {
  LayoutClassic,
  LayoutSideMenu,
  LayoutHeadMenu,
};

onMounted(() => {
  setElementUIThemeColor();
});
</script>

<style lang="scss" scoped></style>
