import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", {
  state: () => ({
    routeParams: {},
  }),
  getters: {
    // doubleCount: state => state.counter * 2,
  },
  actions: {
    // increment(data) {
    //   this.counter = data;
    // },
  },
  persist: {
    paths: ["routeParams"],
  },
});
