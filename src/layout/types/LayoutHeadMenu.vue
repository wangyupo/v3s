<template>
  <!-- 布局-顶栏菜单 -->
  <el-container class="layout">
    <el-header class="layout-header" :class="[isDark ? 'dark' : '']">
      <div class="flex items-center">
        <HeaderTitle />
        <Menu />
      </div>
      <HeaderRightTools />
    </el-header>
    <el-container class="layout-main flex-col">
      <RouterHistoryTabs />
      <el-main class="layout-main-content">
        <Breadcrumb style="height: auto" />
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Menu from "@/layout/components/Menu/Index.vue";
import HeaderTitle from "@/layout/components/HeaderTitle.vue";
import RouterHistoryTabs from "@/layout/components/RouterHistoryTabs.vue";
import HeaderRightTools from "@/layout/components/HeaderRightTools.vue";
import Breadcrumb from "@/layout/components/Breadcrumb.vue";
import { useLayout } from "./layout.js";

const { colorPrimaryBg, isDark } = useLayout();
</script>

<style lang="scss" scoped>
@import "./common.scss";
</style>
