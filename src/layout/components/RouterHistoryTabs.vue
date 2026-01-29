<template>
  <!-- 路由访问历史&标签右键菜单（注意事项：实际开发请依据定义的字段配置 /src/router/menuConfig.js 中的 key） -->
  <div class="router-tabs flex flex-shrink-0 items-center px-3" ref="tabsWrapperRef">
    <!-- 可见标签 -->
    <div
      class="router-tabs-item flex items-center flex-shrink-0 ml-3 first:ml-0 px-2 h-[30px] cursor-pointer text-[14px] rounded"
      :class="[
        isTabActive(routeItem) ? 'active' : '',
        isDark ? 'dark text-[--el-text-color-primary]' : 'text-gray-600',
      ]"
      v-for="(routeItem, idx) in visibleTabs"
      :key="routeItem[menuKey.url]"
      @click="changeRoute(routeItem, getOriginalIndex(routeItem))"
      @click.right="showRightMenu($event, routeItem)"
    >
      <!-- <div
        class="router-tabs-item-point w-[8px] h-[8px] rounded-full bg-white mr-1.5"
        v-show="isTabActive(routeItem)"
      ></div> -->
      {{ routeItem[menuKey.title] }}
      <el-icon
        class="ml-2"
        v-if="routeHistory.length != 1"
        @click.stop="removeRouteHistory(routeItem, getOriginalIndex(routeItem))"
      >
        <Close />
      </el-icon>
    </div>

    <!-- 更多下拉 -->
    <el-dropdown v-if="hiddenTabs.length" trigger="click" @command="handleMoreCommand">
      <div class="more-btn" :class="{ dark: isDark, 'has-active': hasActiveInHidden }">
        <span class="more-count">+{{ hiddenTabs.length }}</span>
        <el-icon><ArrowDown /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in hiddenTabs"
            :key="item[menuKey.url]"
            :command="item"
            :class="{ 'is-active': isTabActive(item) }"
          >
            <span class="dropdown-item-content">
              {{ item[menuKey.title] }}
              <el-icon
                v-if="routeHistory.length > 1"
                class="close-icon"
                @click.stop="removeRouteHistory(item, getOriginalIndex(item))"
              >
                <Close />
              </el-icon>
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 右键菜单 -->
    <div
      class="rightClickMenu flex flex-col fixed rounded z-[9999] shadow-md"
      :class="[isDark ? 'dark' : 'bg-white']"
      :style="{ left: menuPosition.x + 'px', top: menuPosition.y + 'px' }"
      v-show="rightMenuVisible"
    >
      <div
        class="rightClickMenu-item py-2 px-4 text-[14px] select-none"
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
import { on, off } from "@/utils/index";
import { useLayout } from "@/hooks/useLayout.js";
import { storeToRefs } from "pinia";
import { menuKey } from "@/router/menuConfig.js";
import { ArrowDown } from "@element-plus/icons-vue";

const { isDark } = useLayout();
const userStore = useUserStore();
const { routeHistory } = storeToRefs(userStore);
const route = useRoute();
const router = useRouter();
const tabsWrapperRef = ref();

// 可显示的标签数量
const maxVisibleCount = ref(10);
const MORE_BTN_WIDTH = 70; // "更多"按钮预留宽度
const TAB_AVG_WIDTH = 120; // 标签平均宽度

// 计算可见/隐藏标签
const visibleTabs = computed(() => routeHistory.value.slice(0, maxVisibleCount.value));
const hiddenTabs = computed(() => routeHistory.value.slice(maxVisibleCount.value));
const hasActiveInHidden = computed(() => hiddenTabs.value.some(item => isTabActive(item)));

// 获取原始索引
const getOriginalIndex = item => routeHistory.value.findIndex(i => i[menuKey.url] === item[menuKey.url]);

const isTabActive = routeItem => {
  return route.path === routeItem[menuKey.url] || route.meta.targetMenuPath === routeItem[menuKey.url];
};

// 计算可显示的标签数量
const calcMaxVisibleCount = () => {
  if (!tabsWrapperRef.value) return;
  const containerWidth = tabsWrapperRef.value.clientWidth - 24; // 减去 padding
  const availableWidth = containerWidth - MORE_BTN_WIDTH;
  const count = Math.floor(availableWidth / TAB_AVG_WIDTH);
  maxVisibleCount.value = Math.max(1, count);
};

// 更多下拉点击
const handleMoreCommand = item => {
  router.push({ path: item[menuKey.url] });
};

/** menu click START **/
watch(
  route,
  val => {
    let currentRoute = userStore.menuArrWithoutEmptyUrl.find(i => i[menuKey.url] === val.path);
    if (!currentRoute) return;
    if (currentRoute[menuKey.menuType] != menuKey.menuValue) {
      function findParentRouteWithoutHidden(_route) {
        let _parentRoute = userStore.menuArrWithoutEmptyUrl.find(i => i[menuKey.id] === _route.parentId);
        if (!_parentRoute) return;
        if (_parentRoute[menuKey.menuType] == menuKey.menuValue) return _parentRoute;
        findParentRouteWithoutHidden(_parentRoute);
      }
      currentRoute = findParentRouteWithoutHidden(currentRoute);
    }
    if (routeHistory.value.findIndex(i => i[menuKey.url] === currentRoute[menuKey.url]) !== -1) return;
    userStore.$patch(state => {
      state.routeHistory.push({
        [menuKey.url]: currentRoute[menuKey.url],
        [menuKey.title]: currentRoute[menuKey.title],
      });
    });
  },
  { immediate: true },
);

// 点击标签跳转
const changeRoute = (currentRoute, index) => {
  router.push({
    path: currentRoute[menuKey.url],
  });
};

// 点击 x 删除标签及历史记录
const removeRouteHistory = (tabRoute, idx) => {
  if (routeHistory.value.length === 1) return;
  userStore.delRouterHistory(idx);
  if (route.path == tabRoute[menuKey.url] || route.meta.targetMenuPath == tabRoute[menuKey.url]) {
    router.push({
      path: routeHistory.value[idx] ? routeHistory.value[idx][menuKey.url] : routeHistory.value[idx - 1][menuKey.url],
    });
  }
};
/** menu click End **/

/** menu right click START **/
const rightMenuVisible = ref(false); // 右键菜单 隐藏/显示
const currentMenu = ref({}); // 当前右键点击的菜单
// 菜单出现位置
const menuPosition = ref({ x: 0, y: 0 });
// 菜单内容
const rightClickMenus = ref([
  { label: "刷新标签页", value: "Refresh", disabled: false },
  { label: "关闭当前标签页(C)", value: "Current", disabled: false },
  { label: "关闭左侧标签页(L)", value: "L", disabled: false },
  { label: "关闭右侧标签页(R)", value: "R", disabled: false },
  { label: "关闭其它标签页(O)", value: "O", disabled: false },
]);

// 监听窗口大小变化
const handleResize = () => calcMaxVisibleCount();

onMounted(() => {
  ["click", "contextmenu"].forEach(item => {
    on(document, item, blankClickRemoveMenu);
  });
  on(window, "resize", handleResize);
  nextTick(() => calcMaxVisibleCount());
});
onUnmounted(() => {
  ["click", "contextmenu"].forEach(item => {
    off(document, item, blankClickRemoveMenu);
  });
  off(window, "resize", handleResize);
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
  menuPosition.value.x = clientX;
  menuPosition.value.y = clientY;
  currentMenu.value = clickMenu;
  setMenuDisabled();
  rightMenuVisible.value = true;
};

// 菜单点击事件
const handleRouterHistoryMenu = menuValue => {
  const currentMenuInHistoryIdx = routeHistory.value.findIndex(i => i[menuKey.url] === currentMenu.value[menuKey.url]);
  if (currentMenuInHistoryIdx === -1) return;
  // 刷新标签页
  if (
    menuValue === "Refresh" &&
    (route.path === currentMenu.value[menuKey.url] || route.meta.targetMenuPath === currentMenu.value[menuKey.url])
  ) {
    router.replace({
      path: "/refresh",
      query: {
        refreshPath: route.fullPath,
      },
    });
    return;
  }
  // 关闭当前标签页
  if (menuValue === "Current") {
    removeRouteHistory(currentMenu.value, currentMenuInHistoryIdx);
    return;
  }
  // 批量删除标签页
  userStore.delRouterHistoryBatch({
    currentMenuInHistoryIdx,
    removeMenuDirection: menuValue,
  });
  const isDelCurrentShowRoute = routeHistory.value.findIndex(
    i => i[menuKey.url] === route.path || i[menuKey.url] === route.meta.targetMenuPath,
  );
  // 是否删除当前浏览的页面路由
  if (
    (menuValue === "R" && isDelCurrentShowRoute === -1) ||
    (menuValue === "L" && isDelCurrentShowRoute === -1) ||
    (menuValue === "O" && isDelCurrentShowRoute === -1)
  ) {
    router.push({ path: currentMenu.value[menuKey.url] });
  }
};

// 设置菜单可点击状态
const setMenuDisabled = () => {
  const currentMenuInHistoryIdx = routeHistory.value.findIndex(
    item => item[menuKey.url] === currentMenu.value[menuKey.url],
  );
  if (currentMenuInHistoryIdx === -1) return;
  rightClickMenus.value.map(item => (item.disabled = false));
  // 刷新标签页置灰状态
  if (route.path !== currentMenu.value[menuKey.url] && route.meta.targetMenuPath !== currentMenu.value[menuKey.url]) {
    const RefreshIdx = rightClickMenus.value.findIndex(item => item.value === "Refresh");
    rightClickMenus.value[RefreshIdx].disabled = true;
  }
  // 只剩单个标签，全部置灰（刷新除外）
  if (routeHistory.value.length === 1) {
    rightClickMenus.value.map(item => {
      if (item.value !== "Refresh") {
        item.disabled = true;
      }
      return item;
    });
  }
  // 关闭右侧标签页置灰
  if (currentMenuInHistoryIdx === routeHistory.value.length - 1) {
    const RIdx = rightClickMenus.value.findIndex(item => item.value === "R");
    rightClickMenus.value[RIdx].disabled = true;
  }
  // 关闭左侧标签页置灰
  if (currentMenuInHistoryIdx === 0) {
    const LIdx = rightClickMenus.value.findIndex(item => item.value === "L");
    rightClickMenus.value[LIdx].disabled = true;
  }
};
/** menu right click END **/
</script>

<style lang="scss" scoped>
.router-tabs {
  height: 42px;
  border-top: 1px solid var(--el-border-color-light);
  background-color: var(--el-bg-color-overlay);

  &-item {
    border: 1px solid var(--el-border-color);

    &:hover {
      background-color: var(--el-color-info-light-9);
    }

    &.active {
      color: #fff;
      border-color: var(--el-color-primary);
      background-color: var(--el-color-primary);
    }
  }

  &-item.dark {
    color: var(--el-text-color-regular);
    background-color: transparent;

    &:hover {
      background-color: var(--el-fill-color);
    }

    &.active {
      color: var(--el-text-color-primary);
      border-color: var(--el-border-color-dark);
      background-color: var(--el-fill-color-dark);

      .router-tabs-item-point {
        background-color: var(--el-text-color-primary);
      }
    }
  }
}

.more-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 12px;
  padding: 6px 10px;
  font-size: 13px;
  color: var(--el-text-color-regular);
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--el-color-primary);
    border-color: var(--el-color-primary);
    background: var(--el-color-primary-light-9);
  }

  &.has-active {
    color: var(--el-color-primary);
    border-color: var(--el-color-primary);

    .more-count {
      background: var(--el-color-primary);
      color: #fff;
    }
  }

  &.dark {
    &:hover {
      background: var(--el-fill-color);
    }
  }

  .more-count {
    padding: 1px 6px;
    font-size: 12px;
    background: var(--el-fill-color);
    border-radius: 10px;
  }
}

.dropdown-item-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 120px;

  .close-icon {
    margin-left: 12px;
    font-size: 12px;
    color: var(--el-text-color-placeholder);
    opacity: 0;
    transition: all 0.2s;

    &:hover {
      color: var(--el-color-danger);
    }
  }
}

:deep(.el-dropdown-menu__item) {
  &:hover .close-icon {
    opacity: 1;
  }

  &.is-active {
    color: var(--el-color-primary);
    font-weight: 500;
    background: var(--el-color-primary-light-9);
  }
}

.rightClickMenu {
  color: var(--el-text-color-regular);
  border: 1px solid var(--el-border-color);

  &.dark {
    background-color: var(--el-bg-color-overlay);

    .rightClickMenu-item:hover {
      color: var(--el-text-color-regular);
      background-color: var(--el-fill-color);
    }

    .rightClickMenu-item.disabled,
    .rightClickMenu-item.disabled:hover {
      color: var(--el-text-color-disabled);
      background-color: transparent;
    }
  }

  &-item {
    &:hover {
      color: var(--el-color-primary);
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
