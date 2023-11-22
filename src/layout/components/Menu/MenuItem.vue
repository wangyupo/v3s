<template>
  <!-- 菜单组 -->
  <template v-for="menu in menu">
    <template v-if="menu[menuKey.children] && menu[menuKey.children].length > 0">
      <el-sub-menu :key="menu[menuKey.id]" :index="menu[menuKey.id]">
        <template #title>
          <i :class="['iconfont text-xl mr-2 menuItem-ew-icon', menu[menuKey.icon]]" v-if="menu[menuKey.icon]"></i>
          <span>{{ menu[menuKey.title] }}</span>
        </template>
        <MenuItem :menu="menu[menuKey.children]" />
      </el-sub-menu>
    </template>

    <el-menu-item v-else-if="menu[menuKey.url]" :index="menu[menuKey.url]" :key="menu[menuKey.id]">
      <i :class="['iconfont text-xl mr-2 menuItem-ew-icon', menu[menuKey.icon]]" v-if="menu[menuKey.icon]"></i>
      <template #title>
        <span>{{ menu[menuKey.title] }}</span>
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
