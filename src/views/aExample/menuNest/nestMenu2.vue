<template>
  <div>
    路由菜单2
    <div>
      <el-button type="primary" @click="changeLayoutStyle('LayoutClassic')">LayoutClassic</el-button>
      <el-button @click="changeLayoutStyle('LayoutSideMenu')">LayoutSideMenu</el-button>
      <el-button @click="changeLayoutStyle('LayoutHeadMenu')">LayoutHeadMenu</el-button>
      <el-table mb-1 :data="[]" />
      <el-pagination :total="100" />
      <el-date-picker v-model="value" type="date" />
    </div>
  </div>
</template>

<script setup>
import { useLayoutStore } from "@/stores/layout.js";
import { ref } from "vue";

const layoutStore = useLayoutStore();

const changeLayoutStyle = type => {
  layoutStore.changeLayoutType(type);
};

const value = ref();
</script>

<style lang="scss" scoped></style>
