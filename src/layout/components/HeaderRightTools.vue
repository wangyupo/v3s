<template>
  <!-- 顶栏右侧工具栏（用户、通知、切换主题色等） -->
  <div class="flex items-center justify-center h-full">
    <!-- 菜单搜索 -->
    <MenuFilter />
    <!-- 网页全屏 -->
    <FullScreen />
    <!-- 深色切换 -->
    <DarkMode />
    <!-- 多语言切换 -->
    <SwitchLanguage />
    <!-- 用户模块 -->
    <Avatar />
    <!-- 自定义配置 -->
    <Customize />
  </div>
</template>

<script setup>
import Avatar from "./Avatar.vue";
import SwitchLanguage from "./SwitchLanguage.vue";
import MenuFilter from "./MenuFilter/Index.vue";
import FullScreen from "./FullScreen.vue";
import DarkMode from "./DarkMode.vue";
import Customize from "./Customize.vue";
</script>

<style lang="scss" scoped></style>
