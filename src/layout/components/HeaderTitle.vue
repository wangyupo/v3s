<template>
  <!-- 布局专用-系统标题 -->
  <div
    class="layout-header-title select-none"
    :class="[
      layoutType === 'LayoutClassic'
        ? 'expand'
        : layoutType === 'LayoutSideMenu' && menuFold
        ? 'fold title-height'
        : 'expand title-height',
      isDark ? 'dark' : '',
    ]"
    :title="title"
    @click="toHomePage"
  >
    <div :class="layoutType === 'LayoutClassic' ? 'text-[var(--el-text-color-primary)]' : 'text-white'">
      {{ layoutType === "LayoutSideMenu" && menuFold ? "" : title }}
    </div>
  </div>
</template>

<script setup>
import { useLayout } from "@/hooks/useLayout.js";
import { useRouter } from "vue-router";

const { layoutType, menuFold, isDark } = useLayout();

const title = import.meta.env.VITE_SYSTEM_TITLE;
const titleSimple = import.meta.env.VITE_SYSTEM_TITLE_SIMPLE;

const router = useRouter();
const toHomePage = () => {
  router.push({ path: "/" });
};
</script>

<style lang="scss" scoped>
@import "../types/common.scss";

.title-height {
  height: $headerHeight;
}
</style>
