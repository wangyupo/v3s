<template>
  <!-- 菜单过滤器 -->
  <el-tooltip effect="dark" content="搜索" placement="bottom" :show-after="250">
    <div
      class="flex items-center px-3 h-full cursor-pointer hover:bg-[--el-color-primary-dark-2]"
      @click="showFilterDialog"
    >
      <el-icon color="#fff" size="20"><Search /></el-icon>
    </div>
  </el-tooltip>
  <DialogFilter v-model="menuFilterDialogVisible" />
</template>

<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { debounce } from "lodash-es";
import { useLayout } from "@/hooks/useLayout.js";
import DialogFilter from "./DialogFilter.vue";

const { layoutStore, menuFilterDialogVisible } = useLayout();

const showFilterDialog = debounce(() => {
  layoutStore.$patch(state => {
    state.menuFilterDialogVisible = true;
  });
}, 150);
</script>

<style lang="scss" scoped></style>
