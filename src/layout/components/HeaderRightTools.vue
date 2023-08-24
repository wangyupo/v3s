<template>
  <!-- 顶栏右侧工具栏（用户、通知、切换主题色等） -->
  <div class="flex items-center justify-center mr-4 text-white">
    <!-- 菜单搜索 -->
    <MenuFilter />
    <!-- 网页全屏 -->
    <FullScreen />
    <DarkMode class="ml-4" />
    <!-- 多语言切换 -->
    <SwitchLanguage class="ml-4" />
    <!-- 切换主题颜色 -->
    <ThemeColorPicker class="ml-4" />
    <!-- 用户模块 -->
    <Avatar class="ml-4" />
  </div>
</template>

<script setup>
import ThemeColorPicker from "./ThemeColorPicker.vue";
import Avatar from "./Avatar.vue";
import SwitchLanguage from "./SwitchLanguage.vue";
import MenuFilter from "./MenuFilter/Index.vue";
import FullScreen from "./FullScreen.vue";
import DarkMode from "./DarkMode.vue";
</script>

<style lang="scss" scoped></style>
