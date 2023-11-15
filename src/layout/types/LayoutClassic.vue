<template>
  <!-- 布局-经典菜单 -->
  <el-container class="layout">
    <el-header class="layout-header" :class="[isDark ? 'dark' : '']">
      <div class="flex items-center">
        <HeaderTitle />
        <SidebarFolder class="ml-3" />
        <Breadcrumb class="ml-3" />
      </div>
      <HeaderRightTools />
    </el-header>
    <el-container class="layout-main">
      <el-aside class="layout-aside" :class="[menuFold ? 'fold' : 'expand', isDark ? 'dark' : '']">
        <Menu />
      </el-aside>
      <el-container class="flex-col">
        <RouterHistoryTabs />
        <el-main class="layout-main-content" :class="[isTransparent ? 'transparent' : '']">
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import HeaderTitle from "@/layout/components/HeaderTitle.vue";
import SidebarFolder from "@/layout/components/SidebarFolder.vue";
import Menu from "@/layout/components/Menu/Index.vue";
import RouterHistoryTabs from "@/layout/components/RouterHistoryTabs.vue";
import HeaderRightTools from "@/layout/components/HeaderRightTools.vue";
import Breadcrumb from "@/layout/components/Breadcrumb.vue";
import { onMounted, ref } from "vue";
import { useLayout } from "@/hooks/useLayout.js";
import { onBeforeRouteUpdate } from "vue-router";
import { useRoute } from "vue-router";

const { menuFold, isDark } = useLayout();
const route = useRoute();
const isTransparent = ref(false);

onMounted(() => {
  isTransparent.value = route.meta.transparentBackground;
});

onBeforeRouteUpdate(val => {
  isTransparent.value = val.meta.transparentBackground;
});
</script>

<style lang="scss" scoped>
@import "./common.scss";
</style>
