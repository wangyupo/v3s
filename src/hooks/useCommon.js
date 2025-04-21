// common 共用方法&参数
import { useCommonStore } from "@/stores/common.js";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

export function useCommon() {
  const route = useRoute();
  const router = useRouter();
  const commonStore = useCommonStore();
  const { allChannels, routeParams } = storeToRefs(commonStore);

  const setRouteParams = (name, params) => {
    commonStore.$patch(state => {
      state.routeParams[name] = params;
    });
  };

  const getRouteParams = (name = "") => {
    return routeParams.value[name ? name : route.name];
  };

  const removeRouteParams = (name = "") => {
    commonStore.$patch(state => {
      delete state.routeParams[name ? name : route.name];
    });
  };

  const toPage = (name = "", row = {}) => {
    if (!name) {
      console.error("toPage need route's name");
      return;
    }
    if (Object.keys(row).length) setRouteParams(name, row);
    router.push({ name: name });
  };

  return {
    route,
    router,
    toPage,
    commonStore,
    allChannels,
    routeParams,
    setRouteParams,
    getRouteParams,
    removeRouteParams,
  };
}
