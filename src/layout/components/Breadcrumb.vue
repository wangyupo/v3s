<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb
    class="breadcrumb"
    :class="[layoutType === 'LayoutHeadMenu' ? 'mb-2' : 'breadcrumb-in-header']"
    separator="/"
    v-if="!noBreadCrumbPath.includes(route.path) && breadcrumb.length"
  >
    <el-breadcrumb-item v-for="route in breadcrumb" :key="route.id" :to="route.url">
      {{ route.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { useLayoutStore } from "@/stores/layout.js";
import { storeToRefs } from "pinia";
import { tree2arr } from "@/utils/common";
import { cloneDeep } from "lodash-es";

const breadcrumb = ref([]);
const route = useRoute();
const userStore = useUserStore();
const userLayout = useLayoutStore();
const { menu } = storeToRefs(userStore);
const { layoutType } = storeToRefs(userLayout);

const noBreadCrumbPath = ref(["/404"]); //不需要显示面包屑的路由

watch(
  route,
  val => {
    if (!Object.keys(menu).length) return;
    const result = [];
    const list = userStore.menuArr;
    const map = list.reduce((pre, cur) => {
      pre[cur.id] = cur;
      return pre;
    }, {});
    function getParentRoute(currentRoute) {
      if (currentRoute.parentId && currentRoute.parentId !== "0") {
        getParentRoute(map[currentRoute.parentId]);
      }
      result.push(currentRoute);
    }
    const currentRoute = list.find(item => item.url === route.path);
    if (currentRoute) {
      getParentRoute(currentRoute);
      breadcrumb.value = cloneDeep(result).map((i, idx) => {
        if (idx === result.length - 1) i.url = "";
        return i;
      });
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.breadcrumb {
  :deep(.el-breadcrumb__inner.is-link:hover) {
    cursor: pointer;
  }
}

.breadcrumb-in-header {
  :deep(.el-breadcrumb__inner),
  :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover) {
    color: #ddd;
  }
  :deep(.el-breadcrumb__inner.is-link:hover) {
    color: #fff;
  }
}
</style>
