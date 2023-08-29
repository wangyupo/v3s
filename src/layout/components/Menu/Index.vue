<template>
  <!-- 菜单 -->
  <el-menu
    class="menu"
    :class="[isDark ? 'dark' : '']"
    router
    unique-opened
    :mode="mode"
    :collapse="menuFold"
    :collapse-transition="false"
    :default-active="$route.meta.targetMenuPath || $route.path"
  >
    <MenuItem :menu="_menu" />
  </el-menu>
</template>

<script setup>
import MenuItem from "./MenuItem.vue";
import { useUserStore } from "@/stores/user.js";
import { storeToRefs } from "pinia";
import { ref, computed, reactive, watch, watchEffect } from "vue";
import { arr2tree } from "@/utils/common.js";
import { useLayout } from "@/hooks/useLayout.js";

const { isDark, menuFold, layoutType } = useLayout();
const el = document.documentElement;

watchEffect(() => {
  if (layoutType.value == "LayoutHeadMenu" && !isDark.value) {
    el.style.setProperty("--el-menu-bg-color", "var(--el-color-primary)");
  } else {
    el.style.setProperty("--el-menu-bg-color", "transparent");
  }
});

const userStore = useUserStore();
const { menu } = storeToRefs(userStore);
const _menu = ref([]);
_menu.value = arr2tree(userStore.menuArr.filter(i => i.hidden === 0));

const mode = computed(() => {
  return layoutType.value === "LayoutHeadMenu" ? "horizontal" : "vertical";
});
</script>

<style lang="scss" scoped>
@import "@/layout/types/common.scss";
.menu {
  height: $headerHeight;
  &.dark {
    background-color: var(--el-bg-color-overlay);
  }
  :deep(.el-sub-menu .el-sub-menu__title:hover) {
    background-color: var(--el-color-primary-dark-2);
  }
}
</style>
