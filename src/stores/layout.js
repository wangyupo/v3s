/**
 * 布局、主题颜色相关
 * 对应组件目录 /src/layout/components/ThemeColorPicker.vue
 */
import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layout", {
  state: () => ({
    layoutType: "LayoutClassic", // 在 src/views/layout/typs 中新增布局，通过组件名称切换
    menuFold: false, // 菜单折叠状态。true-折叠，false-展开
    isZh: true, // 是否中文
    isGray: false, // 是否全站灰色
    isTransparent: false, // 是否透明背景
    isNoBreadcrumb: false, // 是否不显示面包屑导航
    isNavigating: false, // 是否处于导航跳转过程中
    wrapperType: "", // 业务区域包裹类型 flowPage（不设置高度，遵循默认文档流，适合展示业务）、fullPage（高度100%，溢出后，适合添加/编辑业务）、''（最小高度100%，溢出后自动撑开，适合大部分业务）
    menuFilterDialogVisible: false, // 搜索菜单弹框是否显示
    colorPrimaryBg: "#515a6e", // parimary 背景色
    colorPrimaryLight2: "", // parimary hover 背景色
    colorPrimaryLight9: "", // default hover 背景色
    colorPrimaryLight7: "", // default hover 边框色
    colorPrimaryLight4: "", // el-button link primary hover色
    colorPrimaryLight5: "", // parimary disabled 背景色
    colorPrimaryDark2: "", // parimary active 背景色
  }),
  actions: {
    // 设计布局类型
    changeLayoutType(data) {
      this.layoutType = data;
      this.menuFold = false;
    },
    // 重置主题色
    resetColors() {
      this.colorPrimaryBg = "#515a6e";
      this.colorPrimaryLight2 = "";
      this.colorPrimaryDark2 = "";
      this.colorPrimaryLight9 = "";
      this.colorPrimaryLight7 = "";
      this.colorPrimaryLight4 = "";
      this.colorPrimaryLight5 = "";
    },
  },
  persist: {
    paths: [
      "layoutType",
      "menuFold",
      "isZh",
      "colorPrimaryBg",
      "colorPrimaryLight2",
      "colorPrimaryDark2",
      "colorPrimaryLight9",
      "colorPrimaryLight7",
      "colorPrimaryLight4",
      "colorPrimaryLight5",
    ],
  },
});
