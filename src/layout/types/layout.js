// layout 共用方法&参数
import { storeToRefs } from "pinia";
import { useLayoutStore } from "@/stores/layout.js";
import { useDark, useToggle } from "@vueuse/core";

export function useLayout() {
  const layoutStore = useLayoutStore();
  const { menuFold, colorPrimaryBg } = storeToRefs(layoutStore);

  const isDark = useDark();

  return { menuFold, colorPrimaryBg, isDark };
}
