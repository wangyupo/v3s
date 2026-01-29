<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb
    v-if="showBreadcrumb"
    class="breadcrumb"
    :class="breadcrumbClass"
    separator="/"
  >
    <el-breadcrumb-item
      v-for="item in breadcrumb"
      :key="item[menuKey.id]"
      :to="item[menuKey.url]"
    >
      {{ item[menuKey.title] }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { cloneDeep } from "lodash-es";
import { useUserStore } from "@/stores/user.js";
import { useLayout } from "@/hooks/useLayout.js";
import { menuKey } from "@/router/menuConfig.js";

const route = useRoute();
const userStore = useUserStore();
const { menu } = storeToRefs(userStore);
const { layoutType } = useLayout();

const breadcrumb = ref([]);
const excludePaths = ["/404"]; // 不显示面包屑的路由

// 是否显示面包屑
const showBreadcrumb = computed(() => {
  return !excludePaths.includes(route.path) && breadcrumb.value.length > 0;
});

// 面包屑样式
const breadcrumbClass = computed(() => {
  return layoutType.value === "LayoutHeadMenu"
    ? "-mt-3 border-b border-b-[--el-border-color]"
    : "breadcrumb-in-header";
});

// 生成面包屑数据
const generateBreadcrumb = () => {
  if (!Object.keys(menu.value).length) return;

  const list = userStore.menuArr;
  const menuMap = list.reduce((map, item) => {
    map[item[menuKey.id]] = item;
    return map;
  }, {});

  const currentRoute = list.find(item => item[menuKey.url] === route.path);
  if (!currentRoute) return;

  // 递归获取父级路由
  const result = [];
  const getParentChain = current => {
    if (current.parentId && current.parentId !== "0") {
      getParentChain(menuMap[current.parentId]);
    }
    result.push(current);
  };
  getParentChain(currentRoute);

  // 处理面包屑数据
  breadcrumb.value = cloneDeep(result).map((item, index) => {
    // 最后一项不可点击
    if (index === result.length - 1) {
      item[menuKey.url] = "";
    }
    // 有别名则显示别名
    if (item.alias) {
      item[menuKey.title] = item.alias;
    }
    return item;
  });
};

watch(route, generateBreadcrumb, { immediate: true });
</script>

<style lang="scss" scoped>
@use "../types/common.scss" as *;

.breadcrumb {
  display: flex;
  align-items: center;
  height: $breadHeight !important;

  :deep(.el-breadcrumb__inner.is-link:hover) {
    cursor: pointer;
  }
}
</style>
