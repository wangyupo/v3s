<template>
  <div class="text-[14px] text-gray-600 leading-7">
    <p class="mb-3">本页面演示了两个路由配置功能：</p>
    <ul class="list-disc pl-5 space-y-2">
      <li>
        <strong>透明背景</strong>：业务区域背景与底色相同。
        <br />
        <span class="text-gray-400">配置方式：meta.transparentBackground = true</span>
      </li>
      <li>
        <strong>隐藏面包屑</strong>：适用于
        <el-button type="primary" link class="!p-0 !text-[14px]" @click="handleAction">顶部菜单布局</el-button>
        等场景。
        <br />
        <span class="text-gray-400">配置方式：meta.noBreadcrumb = true</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useLayoutStore } from "@/stores/layout.js";

const layoutStore = useLayoutStore();

const handleAction = () => {
  layoutStore.changeLayoutType("LayoutHeadMenu");
};
</script>

<style lang="scss" scoped></style>
