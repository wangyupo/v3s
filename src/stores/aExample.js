import { defineStore } from "pinia";

export const useLayoutStore = defineStore("example", {
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
