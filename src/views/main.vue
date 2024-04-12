<template>
  <!-- 外层布局 -->
  <Layout>
    <!-- 路由 -->
    <router-view v-slot="{ Component, route }">
      <!-- 路由切换动画 -->
      <transition name="slide-fade">
        <!-- 当前路由所对应的组件 -->
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </Layout>
</template>

<script setup>
import Layout from "@/layout/Index.vue";
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
