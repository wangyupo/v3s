import { debounce } from "lodash-es";

// 限制只能输入正整数
export default {
  mounted(el) {
    let isComposing = false;

    const handler = event => {
      if (!isComposing) {
        const value = event.target.value;
        event.target.value = value.replace(/[^0-9]/g, "");
      }
    };

    const debouncedHandler = debounce(handler, 200);

    const onCompositionStart = () => {
      isComposing = true;
    };

    const onCompositionEnd = event => {
      isComposing = false;
      handler(event); // 确保在输入法输入完成后立即处理一次
    };

    el.addEventListener("input", debouncedHandler);
    el.addEventListener("compositionstart", onCompositionStart);
    el.addEventListener("compositionend", onCompositionEnd);

    // 将事件处理函数保存到元素上，以便在 unmounted 钩子中移除监听器
    el.__vNumberHandler = {
      debouncedHandler,
      onCompositionStart,
      onCompositionEnd,
    };
  },

  beforeUnmount(el) {
    const { debouncedHandler, onCompositionStart, onCompositionEnd } = el.__vNumberHandler;

    el.removeEventListener("input", debouncedHandler);
    el.removeEventListener("compositionstart", onCompositionStart);
    el.removeEventListener("compositionend", onCompositionEnd);

    delete el.__vNumberHandler;
  },
};
