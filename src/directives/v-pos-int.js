import { debounce } from "lodash-es";

// 限制只能输入正整数
export default {
  mounted(el) {
    const handler = event => {
      const value = event.target.value;
      event.target.value = value.replace(/[^0-9]/g, "");
    };

    const debouncedHandler = debounce(handler, 200);
    el.addEventListener("input", debouncedHandler);

    // 将事件处理函数保存到元素上，以便在 unmounted 钩子中移除监听器
    el.__vNumberHandler = debouncedHandler;
  },
  beforeUnmount(el) {
    el.removeEventListener("input", el.__vNumberHandler);
    delete el.__vNumberHandler;
  },
};
