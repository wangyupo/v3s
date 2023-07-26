// layout 共用方法&参数
import { storeToRefs } from "pinia";
import { useLayoutStore } from "@/stores/layout.js";

export function useLayout() {
  const layoutStore = useLayoutStore();
  const { menuFold, colorPrimaryBg } = storeToRefs(layoutStore);

  return { menuFold, colorPrimaryBg };
}
