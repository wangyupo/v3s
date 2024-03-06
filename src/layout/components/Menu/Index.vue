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
    <template v-for="menu in _menu">
      <template v-if="menu[menuKey.children] && menu[menuKey.children].length > 0">
        <el-sub-menu :key="menu[menuKey.id]" :index="menu[menuKey.id]">
          <template #title>
            <i :class="['iconfont text-base mr-2 menuItem-ew-icon', menu[menuKey.icon]]" v-if="menu[menuKey.icon]"></i>
            <span>{{ menu[menuKey.title] }}</span>
          </template>
          <MenuItem :menu="menu[menuKey.children]" />
        </el-sub-menu>
      </template>

      <el-menu-item v-else-if="menu[menuKey.url]" :index="menu[menuKey.url]" :key="menu[menuKey.id]">
        <i :class="['iconfont text-base mr-2 menuItem-ew-icon', menu[menuKey.icon]]" v-if="menu[menuKey.icon]"></i>
        <template #title>
          <span>{{ menu[menuKey.title] }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import MenuItem from "./MenuItem.vue";
import { useUserStore } from "@/stores/user.js";
import { storeToRefs } from "pinia";
import { ref, computed, reactive, watch, watchEffect } from "vue";
import { arr2tree } from "@/utils/index.js";
import { useLayout } from "@/hooks/useLayout.js";
import { menuKey } from "@/router/menuConfig.js";

const { isDark, menuFold, layoutType } = useLayout();
const el = document.documentElement;

watchEffect(() => {
  if (!isDark.value) {
    el.style.setProperty("--el-menu-bg-color", "#324057");
  } else {
    el.style.setProperty("--el-menu-bg-color", "var(--el-bg-color-overlay)");
  }
});

const userStore = useUserStore();
const { menu } = storeToRefs(userStore);
const _menu = ref([]);
_menu.value = arr2tree(
  userStore.menuArr.filter(i => i[menuKey.menuType] == menuKey.menuValue),
  "id",
  "parentId",
  menuKey.children
);

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
}
</style>
