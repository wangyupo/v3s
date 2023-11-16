<template>
  <!-- 布局专用-侧边栏折叠器 -->
  <el-icon
    class="cursor-pointer"
    :class="[isDark ? 'text-[var(--el-text-color-primary)]' : 'text-white']"
    size="20"
    @click="toggleMenuFold"
  >
    <Fold v-show="!menuFold" />
    <Expand v-show="menuFold" />
  </el-icon>
</template>

<script setup>
import { useLayout } from "@/hooks/useLayout.js";

const { menuFold, toggleMenuFold, isDark } = useLayout();
</script>

<style lang="scss" scoped></style>
