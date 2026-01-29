<template>
  <!-- tab刷新中转页 -->
  <div class="refresh-page">
    <div class="refresh-content">
      <div class="refresh-spinner">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p class="refresh-text">页面刷新中...</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

// 解析 URL 参数
const parseQuery = path => {
  const query = {};
  const pathArr = path.split("?");
  if (pathArr.length > 1) {
    pathArr[1].split("&").forEach(param => {
      const [key, value] = param.split("=");
      query[key] = value;
    });
  }
  return query;
};

// 延迟跳转回原页面
setTimeout(() => {
  router.replace({
    path: route.query.refreshPath,
    query: parseQuery(route.query.refreshPath),
  });
}, 800);
</script>

<style lang="scss" scoped>
.refresh-page {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--el-bg-color);
}

.refresh-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.refresh-spinner {
  display: flex;
  gap: 6px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--el-color-primary);
    animation: bounce 1.4s ease-in-out infinite;

    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.16s; }
    &:nth-child(3) { animation-delay: 0.32s; }
  }
}

.refresh-text {
  margin: 0;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
