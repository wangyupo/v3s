<template>
  <!-- 添加页面 -->
  <div>
    <p class="flex items-center">
      添加页面
      <span class="flex items-center italic font-bold">
        （注意看面包屑导航名称的变化
        <el-icon class="arrow ml-1" size="20"><Top /></el-icon>
        ）
      </span>
    </p>
    <p>也可以刷新页面，别名是可以留存的。</p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.arrow {
  animation: arrow 1.6s infinite linear;
}
@keyframes arrow {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
