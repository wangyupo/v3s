<template>
  <!-- 系统标题 -->
  <div
    class="layout-header-title select-none"
    :class="[
      layoutType === 'LayoutClassic'
        ? 'expand'
        : layoutType === 'LayoutSideMenu' && menuFold
        ? 'fold title-height'
        : 'expand title-height',
    ]"
    @click="toHomePage"
  >
    {{ layoutType === "LayoutSideMenu" && menuFold ? titleSimple : title }}
  </div>
</template>

<script setup>
import { useLayoutStore } from "@/stores/layout.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const layoutStore = useLayoutStore();
const { layoutType, menuFold } = storeToRefs(layoutStore);

const title = import.meta.env.VITE_APP_TITLE;
const titleSimple = import.meta.env.VITE_APP_TITLE_SIMPLE;

const router = useRouter();
const toHomePage = () => {
  router.push({ path: "/" });
};
</script>

<style lang="scss" scoped>
@import "../types/common.scss";

.title-height {
  height: $headerHeight;
}
</style>
