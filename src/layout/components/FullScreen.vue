<template>
  <!-- 页面全屏组件 -->
  <el-tooltip effect="dark" :content="isFullscreen ? '取消全屏' : '网页全屏'" placement="bottom" :show-after="250">
    <div class="flex items-center px-3 h-full cursor-pointer hover:bg-[var(--el-fill-color-dark)]" @click="toggle">
      <el-icon color="var(--el-text-color-primary)" size="20">
        <FullScreen />
      </el-icon>
    </div>
  </el-tooltip>
</template>

<script setup>
import { useFullscreen } from "@vueuse/core";

const { isFullscreen, enter, exit, toggle } = useFullscreen();
</script>

<style lang="scss" scoped></style>
