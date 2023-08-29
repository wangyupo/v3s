<template>
  <!-- 路由访问历史&标签右键菜单（注意事项：实际开发请依据定义的字段替换 url、label 这两个字段） -->
  <div class="router-tabs flex flex-shrink-0 items-center px-3 py-1 overflow-x-auto" ref="tabsWrapperRef">
    <div
      class="router-tabs-item flex items-center flex-shrink-0 ml-3 first:ml-0 px-2 h-[30px] cursor-pointer text-sm rounded"
      :class="[tabActive(routeItem) ? 'active' : '', isDark ? 'text-[--el-text-color-primary]' : 'text-gray-600']"
      v-for="(routeItem, idx) in routeHistory"
      :key="routeItem.url"
      ref="tabRef"
      @click="changeRoute(routeItem, idx)"
      @click.right="showRightMenu($event, routeItem)"
    >
      <div class="w-[8px] h-[8px] rounded-full bg-white mr-1.5" v-show="tabActive(routeItem)"></div>
      {{ routeItem.title }}
      <el-icon class="ml-2" v-if="routeHistory.length != 1" @click.stop="removeRouteHistory(routeItem, idx)">
        <Close />
      </el-icon>
    </div>

    <!-- 右键菜单 -->
    <div
      class="rightClickMenu flex flex-col fixed rounded z-50 border border-[--el-border-color]"
      :class="[isDark ? 'dark' : 'bg-white']"
      :style="{ left: menuPositin.x + 'px', top: menuPositin.y + 'px' }"
      v-show="rightMenuVisible"
    >
      <div
        class="rightClickMenu-item py-2 px-4 text-sm select-none"
        :class="[item.disabled ? 'disabled cursor-not-allowed' : 'cursor-pointer']"
        v-for="item in rightClickMenus"
        :key="item.value"
        @click="handleRouterHistoryMenu(item.value)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { on, off } from "@/utils/dom";
import { useLayout } from "@/hooks/useLayout.js";
import { storeToRefs } from "pinia";

const { isDark } = useLayout();

const userStore = useUserStore();
const { routeHistory } = storeToRefs(userStore);

const route = useRoute();
const router = useRouter();

const tabsWrapperRef = ref();
const tabRef = ref();

const tabActive = routeItem => {
  if (route.path === routeItem.url || route.meta.targetMenuPath === routeItem.url) {
    return true;
  }
  return false;
};

// 标签容器滚动，使标签溢出时可见
const scrollTabs = index => {
  if (!tabRef.value || !tabRef.value[index]) return;
  const diff = tabRef.value[index].offsetLeft - tabsWrapperRef.value.offsetLeft - 50;
  tabsWrapperRef.value.scrollLeft = diff;
};

/** menu click START **/
watch(
  route,
  val => {
    let currentRoute = userStore.menuArrWithoutEmptyUrl.find(i => i.url === val.path);
    nextTick(() => {
      const routeIdxInHistory = routeHistory.value.findIndex(i => i.url === val.path);
      scrollTabs(routeIdxInHistory);
    });
    if (!currentRoute) return;
    if (currentRoute.hidden === 1) {
      function findParentRouteWithoutHidden(_route) {
        let _parentRoute = userStore.menuArrWithoutEmptyUrl.find(i => i.id === _route.parentId);
        if (!_parentRoute) return;
        if (_parentRoute.hidden === 0) return _parentRoute;
        findParentRouteWithoutHidden(_parentRoute);
      }
      currentRoute = findParentRouteWithoutHidden(currentRoute);
    }
    const { url, title } = currentRoute;
    if (routeHistory.value.findIndex(i => i.url === url) !== -1) return;
    userStore.$patch(state => {
      state.routeHistory.push({
        url,
        title,
      });
    });
    setTimeout(() => {
      scrollTabs(routeHistory.value.length - 1);
    }, 50);
  },
  { immediate: true }
);

// 点击标签跳转
const changeRoute = (currentRoute, index) => {
  scrollTabs(index);
  const { url } = currentRoute;
  router.push({
    path: url,
  });
};

// 点击 x 删除标签及历史记录
const removeRouteHistory = (currentRoute, idx) => {
  if (routeHistory.value.length === 1) return;
  userStore.delRouterHistory(idx);
  if (currentRoute.url === route.path) {
    router.push({
      path: routeHistory.value[idx] ? routeHistory.value[idx].url : routeHistory.value[idx - 1].url,
    });
  }
};
/** menu click End **/

/** menu right click START **/
const rightMenuVisible = ref(false); // 右键菜单 隐藏/显示
const currentMenu = ref({}); // 当前右键点击的菜单
// 菜单出现位置
const menuPositin = ref({
  x: 0,
  y: 0,
});
// 菜单内容
const rightClickMenus = ref([
  {
    label: "刷新标签页",
    value: "Refresh",
    disabled: false,
  },
  {
    label: "关闭右侧标签页(R)",
    value: "R",
    disabled: false,
  },
  {
    label: "关闭左侧标签页(L)",
    value: "L",
    disabled: false,
  },
  {
    label: "关闭其它标签页(O)",
    value: "O",
    disabled: false,
  },
]);

onMounted(() => {
  ["click", "contextmenu"].forEach(item => {
    on(document, item, blankClickRemoveMenu);
  });
});
onUnmounted(() => {
  ["click", "contextmenu"].forEach(item => {
    off(document, item, blankClickRemoveMenu);
  });
});

// 监听事件-点击空白隐藏菜单
const blankClickRemoveMenu = e => {
  if (!rightMenuVisible.value) return;
  const isClickInMenuItem = e.target.className.split(" ").includes("router-tabs-item") && e.type === "contextmenu";
  if (!rightMenuVisible.value || isClickInMenuItem) return;
  rightMenuVisible.value = false;
};

// 历史菜单右键事件
const showRightMenu = (e, clickMenu) => {
  e.preventDefault();
  const { clientX, clientY } = e;
  menuPositin.value.x = clientX;
  menuPositin.value.y = clientY;
  currentMenu.value = clickMenu;
  setMenuDisabled();
  rightMenuVisible.value = true;
};

// 菜单点击事件
const handleRouterHistoryMenu = menuValue => {
  const currentMenuInHistoryIdx = routeHistory.value.findIndex(i => i.url === currentMenu.value.url);
  if (currentMenuInHistoryIdx === -1) return;
  // 刷新标签页
  if (
    menuValue === "Refresh" &&
    (route.path === currentMenu.value.url || route.meta.targetMenuPath === currentMenu.value.url)
  ) {
    router.replace({
      path: "/refresh",
      query: {
        refreshPath: route.fullPath,
      },
    });
    return;
  }
  // 批量删除标签页
  userStore.delRouterHistoryBatch({
    currentMenuInHistoryIdx,
    removeMenuDirection: menuValue,
  });
  const isDelCurrentShowRoute = routeHistory.value.findIndex(i => i.url === route.path); // 是否删除当前浏览的页面路由
  if (
    (menuValue === "R" && isDelCurrentShowRoute === -1) ||
    (menuValue === "L" && isDelCurrentShowRoute === -1) ||
    (menuValue === "O" && route.path !== currentMenu.value.url)
  ) {
    router.push({
      path: currentMenu.value.url,
    });
  }
};

// 设置菜单可点击状态
const setMenuDisabled = () => {
  const currentMenuInHistoryIdx = routeHistory.value.findIndex(item => item.url === currentMenu.value.url);
  if (currentMenuInHistoryIdx === -1) return;
  rightClickMenus.value.map(item => (item.disabled = false));
  // 刷新标签页置灰状态
  if (route.path !== currentMenu.value.url && route.meta.targetMenuPath !== currentMenu.value.url) {
    const RefreshIdx = rightClickMenus.value.findIndex(item => item.value === "Refresh");
    rightClickMenus.value[RefreshIdx].disabled = true;
    return;
  }
  // 只剩单个标签，全部置灰（刷新除外）
  if (routeHistory.value.length === 1) {
    rightClickMenus.value.map(item => {
      if (item.value !== "Refresh") {
        item.disabled = true;
      }
      return item;
    });
    return;
  }
  // 关闭右侧标签页置灰
  if (currentMenuInHistoryIdx === routeHistory.value.length - 1) {
    const RIdx = rightClickMenus.value.findIndex(item => item.value === "R");
    rightClickMenus.value[RIdx].disabled = true;
    return;
  }
  // 关闭左侧标签页置灰
  if (currentMenuInHistoryIdx === 0) {
    const LIdx = rightClickMenus.value.findIndex(item => item.value === "L");
    rightClickMenus.value[LIdx].disabled = true;
    return;
  }
};
/** menu right click END **/
</script>

<style lang="scss" scoped>
.router-tabs {
  border-top: 1px solid var(--el-border-color-light);
  background-color: var(--el-bg-color-overlay);
  &-item {
    border: 1px solid var(--el-border-color);
  }
  &-item.active {
    color: #fff;
    background-color: var(--el-color-primary);
    border: var(--el-color-primary);
  }
}

.rightClickMenu {
  color: var(--el-text-color-primary);
  &.dark {
    background-color: var(--el-bg-color-overlay);
  }
  &-item {
    &:hover {
      background-color: var(--el-color-primary-light-9);
    }
    &.disabled {
      color: var(--el-disabled-text-color);
      &:hover {
        background: none;
      }
    }
  }
}
</style>
