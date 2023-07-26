<template>
  <!-- 侧边栏折叠器 -->
  <el-icon class="text-white cursor-pointer" size="20" @click="handleMenuFold">
    <Fold v-show="!menuFold" />
    <Expand v-show="menuFold" />
  </el-icon>
</template>

<script setup>
import { useLayoutStore } from "@/stores/layout.js";
import { storeToRefs } from "pinia";
import { debounce } from "lodash-es";

const layoutStore = useLayoutStore();
const { menuFold } = storeToRefs(layoutStore);

const handleMenuFold = debounce(() => {
  layoutStore.$patch(state => {
    state.menuFold = !menuFold.value;
  });
}, 150);
</script>

<style lang="scss" scoped></style>
