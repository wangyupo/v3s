<template>
  <!-- 菜单组 -->
  <template v-for="menu in menu">
    <template v-if="menu.children && menu.children.length > 0">
      <el-sub-menu :key="menu.id" :index="menu.id">
        <template #title>
          <i :class="['iconfont text-xl mr-2 menuItem-ew-icon', menu.icon]" v-if="menu.icon"></i>
          <span>{{ menu.title }}</span>
        </template>
        <MenuItem :menu="menu.children" />
      </el-sub-menu>
    </template>

    <el-menu-item v-else-if="menu[menuKey.url]" :index="menu[menuKey.url]" :key="menu.id">
      <i :class="['iconfont text-xl mr-2 menuItem-ew-icon', menu.icon]" v-if="menu.icon"></i>
      <template #title>
        <span>{{ menu.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup>
import { menuKey } from "@/router/menuConfig.js";

const props = defineProps({
  menu: {
    type: Array,
    default() {
      return [];
    },
  },
});
</script>

<style lang="scss" scoped></style>
