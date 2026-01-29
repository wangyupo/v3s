<template>
  <div class="text-[14px] text-gray-600 leading-7">
    <div class="flex items-center gap-2 mb-2">
      <span>页面别名示例</span>
      <span class="flex items-center text-gray-400">
        （注意看面包屑名称变化
        <el-icon class="arrow mx-1" size="18"><Top /></el-icon>
        ）
      </span>
    </div>
    <p class="text-gray-400">刷新页面后别名仍然保留</p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.arrow {
  animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
</style>
