/**
 * 用户信息及记录相关
 */
import { defineStore } from "pinia";
import { tree2arr } from "@/utils/index";
import { menuKey } from "@/router/menuConfig.js";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: null, // 用户信息
    menu: [], // 菜单
    routeHistory: [], // 菜单历史记录
  }),
  getters: {
    // 菜单数组（过滤空 URL）
    menuArrWithoutEmptyUrl: state => tree2arr(state.menu).filter(i => i[menuKey.url]),
    // 菜单数组
    menuArr: state => tree2arr(state.menu),
  },
  actions: {
    setUserInfo(data) {
      this.userInfo = data;
    },
    // 删除单个历史路由
    delRouterHistory(idx) {
      this.routeHistory.splice(idx, 1);
    },
    // 批量删除历史路由
    delRouterHistoryBatch({ currentMenuInHistoryIdx: idx, removeMenuDirection: dir }) {
      if (this.routeHistory.length === 1) return;

      const actions = {
        L: () => this.routeHistory.splice(0, idx),
        R: () => this.routeHistory.splice(idx + 1),
        O: () => (this.routeHistory = [this.routeHistory[idx]]),
      };

      actions[dir]?.();
    },
  },
  persist: {
    paths: ["userInfo", "menu"],
  },
});
