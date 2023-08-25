<template>
  <!-- 页面全屏组件 -->
  <el-tooltip effect="dark" :content="isFullscreen ? '取消全屏' : '全屏'" placement="bottom" :show-after="250">
    <div class="flex items-center px-3 h-full cursor-pointer hover:bg-[--el-color-primary-dark-2]" @click="toggle">
      <el-icon :size="20">
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
