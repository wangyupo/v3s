// layout 共用方法&参数
import { storeToRefs } from "pinia";
import { useLayoutStore } from "@/stores/layout.js";
import { useDark } from "@vueuse/core";

export function useLayout() {
  const layoutStore = useLayoutStore();
  const { layoutType, menuFold, colorPrimaryBg } = storeToRefs(layoutStore);

  const isDark = useDark({ disableTransition: false });

  return { layoutType, menuFold, colorPrimaryBg, isDark };
}
