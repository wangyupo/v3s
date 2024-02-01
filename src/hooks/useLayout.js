// layout 共用方法&参数
import { storeToRefs } from "pinia";
import { useLayoutStore } from "@/stores/layout.js";
import { useDark } from "@vueuse/core";
import { debounce } from "lodash-es";
import { computed } from "vue";

export function useLayout() {
  const contentAreaLoadingText = "加载中...";
  const contentAreaLoadingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="var(--el-color-primary)" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>`;

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
    contentAreaLoadingText,
    contentAreaLoadingSvg,
  };
}
