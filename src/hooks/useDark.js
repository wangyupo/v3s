import { useLayoutStore } from "@/stores/layout.js";
import { storeToRefs } from "pinia";
import { addClass, removeClass } from "@/utils/dom.js";

const layoutStore = useLayoutStore();
const { isDark } = storeToRefs(layoutStore);

export const useDark = () => {
  const htmlEle = document.documentElement;

  const toggleDark = dark => {
    console.log(13,dark);
    if (dark) {
      addClass(htmlEle, "dark");
    } else {
      removeClass(htmlEle, "dark");
    }
    layoutStore.$patch(state => {
      state.isDark = dark;
    });
  };

  toggleDark(isDark.value);

  return { isDark, toggleDark };
};
