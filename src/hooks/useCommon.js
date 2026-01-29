/**
 * 通用组合式函数
 * 提供路由跳转、路由参数传递等常用功能
 */
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { useCommonStore } from "@/stores/common.js";

export function useCommon() {
  const route = useRoute();
  const router = useRouter();
  const commonStore = useCommonStore();
  const { routeParams } = storeToRefs(commonStore);

  /**
   * 设置路由参数
   * @param {string} name 路由名称
   * @param {object} params 参数对象
   */
  const setRouteParams = (name, params) => {
    commonStore.$patch(state => {
      state.routeParams[name] = params;
    });
  };

  /**
   * 获取路由参数
   * @param {string} name 路由名称，不传则使用当前路由名称
   * @returns {object} 参数对象
   */
  const getRouteParams = (name = "") => {
    return routeParams.value[name || route.name];
  };

  /**
   * 移除路由参数
   * @param {string} name 路由名称，不传则使用当前路由名称
   */
  const removeRouteParams = (name = "") => {
    commonStore.$patch(state => {
      delete state.routeParams[name || route.name];
    });
  };

  /**
   * 跳转页面并传递参数
   * @param {string} name 路由名称
   * @param {object} params 传递的参数
   */
  const toPage = (name, params = {}) => {
    if (!name) {
      console.error("[useCommon] toPage: 缺少路由名称");
      return;
    }
    if (Object.keys(params).length) {
      setRouteParams(name, params);
    }
    router.push({ name });
  };

  return {
    route,
    router,
    commonStore,
    routeParams,
    toPage,
    setRouteParams,
    getRouteParams,
    removeRouteParams,
  };
}
