/**
 * 布局组合式函数
 * 提供布局配置、主题色、菜单等功能
 */
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useDark } from "@vueuse/core";
import { debounce } from "lodash-es";
import { TinyColor } from "@ctrl/tinycolor";
import { useLayoutStore } from "@/stores/layout.js";
import { useUserStore } from "@/stores/user.js";
import { addClass, removeClass, arr2tree } from "@/utils/index.js";
import { menuKey } from "@/router/menuConfig.js";

// 内容区 Loading 配置
const contentAreaLoadingText = "加载中...";
const contentAreaLoadingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="var(--el-color-primary)" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>`;

export function useLayout() {
  const layoutStore = useLayoutStore();
  const userStore = useUserStore();
  const isDark = useDark({ disableTransition: false });

  const {
    headerMenuActiveIdx,
    colorPrimaryBg,
    colorPrimaryLight2,
    colorPrimaryLight4,
    colorPrimaryLight5,
    colorPrimaryLight7,
    colorPrimaryLight9,
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

  /**
   * 获取菜单（仅菜单类型）
   */
  const getMenu = () => {
    return arr2tree(
      userStore.menuArr.filter(i => i[menuKey.menuType] == menuKey.menuValue),
      { id: menuKey.id, parentId: menuKey.parentId, children: menuKey.children },
    );
  };

  /**
   * 获取全部菜单
   */
  const getAllMenu = () => {
    return arr2tree(userStore.menuArr, {
      id: menuKey.id,
      parentId: menuKey.parentId,
      children: menuKey.children,
    });
  };

  /**
   * Header 工具区 hover 背景色
   */
  const headerToolHoverClasses = computed(() => {
    const hoverClasses = {
      LayoutHeadMenu: "hover:bg-[#405270]",
      LayoutMix: "hover:bg-[#405270]",
      default: "hover:bg-[var(--el-fill-color)]",
    };
    return hoverClasses[layoutType.value] ?? hoverClasses.default;
  });

  /**
   * 内容区额外 class（根据 wrapperType）
   * - flowPage: 流体布局，适用于大篇幅页面（如分析页）
   * - fullPage: 固定全屏，适用于简单 IO 页面（如添加、编辑）
   * - 默认: 延展全屏，适用于大多数页面（如列表页）
   */
  const wrapExtraClass = computed(() => {
    const classMap = {
      flowPage: "h-auto",
      fullPage: "h-full",
    };
    return classMap[wrapperType.value] || "min-h-full";
  });

  /**
   * 切换全站置灰
   */
  const toggleGray = () => {
    const el = document.documentElement;
    isGray.value ? addClass(el, "gray") : removeClass(el, "gray");
  };

  /**
   * 切换侧边栏折叠/展开
   */
  const toggleMenuFold = debounce(() => {
    layoutStore.$patch(state => {
      state.menuFold = !menuFold.value;
    });
  }, 150);

  /**
   * 计算主题色配套色值
   * @param {string} themeColor 主题色
   */
  const calcThemeColor = themeColor => {
    const colorInst = new TinyColor(themeColor);

    // 暗色模式下的颜色混合
    const darken = (color, amount = 20) => color.mix("#141414", amount).toHexString();

    let colors = {};
    if (isDark.value) {
      colors = {
        light2: darken(colorInst, 20),
        light4: darken(colorInst, 40),
        light5: darken(colorInst, 50),
        light7: darken(colorInst, 70),
        light9: darken(colorInst, 90),
      };
    } else {
      colors = {
        light2: colorInst.tint(20).toHexString(),
        light4: colorInst.tint(40).toHexString(),
        light5: colorInst.tint(50).toHexString(),
        light7: colorInst.tint(70).toHexString(),
        light9: colorInst.tint(90).toHexString(),
      };
    }

    layoutStore.$patch(state => {
      state.colorPrimaryBg = themeColor;
      state.colorPrimaryLight2 = colors.light2;
      state.colorPrimaryLight4 = colors.light4;
      state.colorPrimaryLight5 = colors.light5;
      state.colorPrimaryLight7 = colors.light7;
      state.colorPrimaryLight9 = colors.light9;
      state.colorPrimaryDark2 = darken(colorInst, 20);
    });
  };

  /**
   * 设置 Element Plus 主题色 CSS 变量
   */
  const setElementUIThemeColor = () => {
    const el = document.documentElement;
    el.style.setProperty("--el-color-primary", colorPrimaryBg.value);
    el.style.setProperty("--el-color-primary-dark-2", colorPrimaryDark2.value);
    el.style.setProperty("--el-color-primary-light-3", colorPrimaryLight2.value);
    el.style.setProperty("--el-color-primary-light-4", colorPrimaryLight4.value);
    el.style.setProperty("--el-color-primary-light-5", colorPrimaryLight5.value);
    el.style.setProperty("--el-color-primary-light-7", colorPrimaryLight7.value);
    el.style.setProperty("--el-color-primary-light-9", colorPrimaryLight9.value);
  };

  return {
    // Store
    layoutStore,
    menuKey,
    // 状态
    isDark,
    layoutType,
    menuFold,
    isGray,
    isZh,
    isTransparent,
    isNoBreadcrumb,
    isNavigating,
    menuFilterDialogVisible,
    headerMenuActiveIdx,
    // 主题色
    colorPrimaryBg,
    colorPrimaryLight2,
    colorPrimaryLight4,
    colorPrimaryLight5,
    colorPrimaryLight7,
    colorPrimaryLight9,
    colorPrimaryDark2,
    // 计算属性
    wrapExtraClass,
    headerToolHoverClasses,
    // 方法
    getMenu,
    getAllMenu,
    toggleGray,
    toggleMenuFold,
    calcThemeColor,
    setElementUIThemeColor,
    // Loading 配置
    contentAreaLoadingText,
    contentAreaLoadingSvg,
  };
}
