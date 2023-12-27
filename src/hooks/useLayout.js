// layout 共用方法&参数
import { storeToRefs } from "pinia";
import { useLayoutStore } from "@/stores/layout.js";
import { useDark } from "@vueuse/core";
import { debounce } from "lodash-es";
import { computed } from "vue";

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
    wrapperType,
    menuFilterDialogVisible,
  } = storeToRefs(layoutStore);

  const isDark = useDark({ disableTransition: false }); // 是否暗黑模式

  // 侧边栏折叠/展开
  const toggleMenuFold = debounce(() => {
    layoutStore.$patch(state => {
      state.menuFold = !menuFold.value;
    });
  }, 150);

  // 流体布局（适用于大篇幅页面，如：分析页） flowPage
  // 固定全屏布局，超出部分溢出（适用于简单的IO业务页面，如：添加、编辑） fullPage
  // 延展全屏布局，超出部分包裹随之拉伸（适用于大多数页面，如：列表页）
  const wrapStyle = computed(() => {
    if (wrapperType.value == "flowPage") {
      return "height: auto";
    } else if (wrapperType.value == "fullPage") {
      return "height: 100%";
    } else {
      return "min-height: 100%";
    }
  });

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
    wrapStyle,
    menuFilterDialogVisible,
  };
}
