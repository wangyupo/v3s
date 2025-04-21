import { ref, computed, onMounted, nextTick, watch } from "vue";
import { getTotalHeight } from "@/utils/index.js";
import { debounce } from "lodash-es";

// 动态计算 table 高度 hooks
// 常用于固定表头，需在 router 配置 meta: { wrapperType: "fullPage" }
// 同时在业务页面顶层 div 包裹配置 class="h-full overflow-hidden"
export function useDynamicTableHeight({ domRefs, componentDomRef, extraHeight = 0 }) {
  const domTotalHeight = ref(0); // table 上方 dom 总高度
  const paginationHeight = 44; // table 分页高度

  // 动态计算后的表格高度
  const tableStyleObject = computed(() => {
    let totalHeight = domTotalHeight.value + paginationHeight + extraHeight;
    return `height: calc(100% - ${totalHeight}px)`;
  });

  // 监听可能出现的 dom 动态增减
  watch(
    [domRefs, componentDomRef],
    () => {
      toggle();
    },
    { deep: true }
  );

  // 搜索展开/折叠触发时，更新高度
  const toggle = debounce(() => {
    domTotalHeight.value = 0;
    nextTick(() => {
      if (domRefs.value.length) {
        domRefs.value.forEach((ref, index) => {
          if (ref) {
            domTotalHeight.value += getTotalHeight(ref.value);
          }
        });
      }
      if (componentDomRef.value.length) {
        componentDomRef.value.forEach((refObj, index) => {
          if (refObj.ref && refObj.ref[refObj.innerRef]) {
            domTotalHeight.value += getTotalHeight(refObj.ref[refObj.innerRef]);
          }
        });
      }
    });
  }, 150);

  // 初始化高度
  onMounted(() => {
    toggle();
  });

  return { toggle, tableStyleObject };
}
