import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", {
  state: () => ({
    routeParams: {},
    allChannels: [],
  }),
  getters: {
    // doubleCount: state => state.counter * 2,
  },
  actions: {
    // increment(data) {
    //   this.counter = data;
    // },
  },
  persist: false, // localstorage yes or no
});
