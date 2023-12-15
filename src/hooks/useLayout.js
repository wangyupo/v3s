// layout 共用方法&参数
import { storeToRefs } from "pinia";
import { useLayoutStore } from "@/stores/layout.js";
import { useDark } from "@vueuse/core";
import { debounce } from "lodash-es";

export function useLayout() {
  const layoutStore = useLayoutStore();
  const {
    colorPrimaryBg,
    colorPrimaryLight2,
    colorPrimaryLight9,
    colorPrimaryLight7,
    colorPrimaryLight4,
    colorPrimaryLight5,
    colorPrimaryDark2,
    layoutType,
    menuFold,
    isGray,
    isZh,
    isTransparent,
    isNoBreadcrumb,
    isNavigating,
    menuFilterDialogVisible,
  } = storeToRefs(layoutStore);

  const isDark = useDark({ disableTransition: false }); // 是否暗黑模式

  // 侧边栏折叠/展开
  const toggleMenuFold = debounce(() => {
    layoutStore.$patch(state => {
      state.menuFold = !menuFold.value;
    });
  }, 150);

  return {
    colorPrimaryBg,
    colorPrimaryLight2,
    colorPrimaryLight9,
    colorPrimaryLight7,
    colorPrimaryLight4,
    colorPrimaryLight5,
    colorPrimaryDark2,
    layoutStore,
    isDark,
    toggleMenuFold,
    layoutType,
    menuFold,
    isGray,
    isZh,
    isTransparent,
    isNoBreadcrumb,
    isNavigating,
    menuFilterDialogVisible,
  };
}
