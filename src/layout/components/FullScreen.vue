<template>
  <!-- 页面全屏组件 -->
  <el-tooltip effect="dark" :content="isFullscreen ? '取消全屏' : '全屏'" placement="bottom" :show-after="250">
    <el-icon :size="20" class="ml-3 cursor-pointer" @click="toggle">
      <FullScreen />
    </el-icon>
  </el-tooltip>
</template>

<script setup>
import { useFullscreen } from "@vueuse/core";

const { isFullscreen, enter, exit, toggle } = useFullscreen();
</script>

<style lang="scss" scoped></style>
