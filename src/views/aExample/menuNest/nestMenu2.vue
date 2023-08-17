<template>
  <div>
    <p>你可以点击以下按钮切换整体布局：</p>
    <div class="mt-3">
      <el-button type="primary" @click="changeLayoutStyle('LayoutClassic')">经典布局</el-button>
      <el-button @click="changeLayoutStyle('LayoutSideMenu')">菜单标题一体布局</el-button>
      <el-button @click="changeLayoutStyle('LayoutHeadMenu')">顶部菜单布局</el-button>
    </div>
  </div>
</template>

<script setup>
import { useLayoutStore } from "@/stores/layout.js";

const layoutStore = useLayoutStore();

const changeLayoutStyle = type => {
  layoutStore.changeLayoutType(type);
};
</script>

<style lang="scss" scoped></style>
