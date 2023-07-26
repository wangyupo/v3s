<template>
  <!-- 布局-竖向菜单 -->
  <el-container class="layout">
    <el-aside class="layout-aside" :class="[menuFold ? 'fold' : 'expand']">
      <HeaderTitle />
      <Menu />
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <div class="flex items-center">
          <SidebarFolder class="ml-3" />
          <Breadcrumb class="ml-3" />
        </div>
        <HeaderRightTools />
      </el-header>
      <el-container class="layout-main flex-col">
        <RouterHistoryTabs />
        <el-main class="layout-main-content">
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
import { useLayout } from "./layout.js";

const { menuFold } = useLayout();
</script>

<style lang="scss" scoped>
@import "./common.scss";
</style>
