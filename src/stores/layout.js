import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layout", {
  state: () => ({
    layoutType: "LayoutClassic", // 在 src/views/layout/typs 中新增布局，通过组件名称切换
    menuFold: false, // 菜单折叠状态。true-折叠，false-展开
    isZh: true, // 是否中文
    menuFilterDialogVisible: false, // 搜索菜单弹框是否显示
    colorPrimaryBg: "", // parimary 背景色
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
      this.colorPrimaryBg = "";
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
