<template>
  <!-- 菜单过滤器 -->
  <el-tooltip effect="dark" content="搜索" placement="bottom" :show-after="500">
    <el-icon class="cursor-pointer" color="#fff" size="20" @click="showFilterDialog"><Search /></el-icon>
  </el-tooltip>
  <DialogFilter v-model="menuFilterDialogVisible" />
</template>

<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { debounce } from "lodash-es";
import { useLayoutStore } from "@/stores/layout.js";
import { storeToRefs } from "pinia";
import DialogFilter from "./DialogFilter.vue";

const layoutStore = useLayoutStore();
const { menuFilterDialogVisible } = storeToRefs(layoutStore);

const showFilterDialog = debounce(() => {
  layoutStore.$patch(state => {
    state.menuFilterDialogVisible = true;
  });
}, 150);
</script>

<style lang="scss" scoped></style>
