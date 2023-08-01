/**
 * 示例 store
 * 新增 store 的时候复制这个，并修改 useExampleStore、example 为对应业务英文名称即可。
 */
import { defineStore } from "pinia";

export const useExampleStore = defineStore("example", {
  state: () => ({
    counter: 10,
  }),
  getters: {
    doubleCount: state => state.counter * 2,
  },
  actions: {
    increment(data) {
      this.counter = data;
    },
  },
  persist: true, // localstorage yes or no
});
