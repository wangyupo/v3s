import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import { tree2arr, getLocalStorage, removeAllLoginInfo } from "@/utils/index";
import NProgress from "@/utils/nProgress.js";
import { menuKey } from "@/router/menuConfig.js";
import { useLayoutStore } from "@/stores/layout.js";

const login = () => import("@/views/login.vue");
const main = () => import("@/views/main.vue");
const refreshPage = () => import("@/views/refreshPage.vue");
const notFound = () => import("@/views/404.vue");
const largeScreen = () => import("@/views/largeScreen.vue");
const home = () => import("@/views/home.vue");

// 示例页面路由（拆分示例）
import routeExample from "./routeExample";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      name: "登录页",
      component: login,
    },
    {
      path: "/largeScreen",
      name: "largeScreen",
      component: largeScreen,
    },
    {
      path: "/",
      name: "主体框架",
      component: main,
      redirect: to => {
        if (!getLocalStorage("user")) return "/login";
        // 成功登录且权限完整，默认重定向到用户权限路由的第一个
        const menuList = tree2arr(JSON.parse(getLocalStorage("user")).menu);
        const defaultPage = menuList.find(i => i[menuKey.url]);
        if (!defaultPage) {
          console.error("Please check your menuKey in /src/router/menuConfig.js file.");
          removeAllLoginInfo();
          return "/login";
        }
        if (to.path === defaultPage[menuKey.url]) return;
        return defaultPage[menuKey.url];
      },
      children: [
        {
          path: "/refresh",
          name: "refreshPage",
          component: refreshPage,
          beforeEnter: (to, from) => {
            if (from.meta.targetMenuPath) {
              to.meta.targetMenuPath = from.meta.targetMenuPath;
            } else {
              to.meta.targetMenuPath = from.path;
            }
          },
        },

        {
          path: "/home",
          name: "home",
          component: home,
        },
        ...routeExample,

        {
          path: "/404",
          name: "notFound",
          component: notFound,
        },
        { path: "/:pathMatch(.*)*", redirect: "/404" },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const hasToken = getLocalStorage("user");
  if (hasToken) {
    const menuList = tree2arr(JSON.parse(getLocalStorage("user")).menu);
    if (to.path === "/login") {
      next({ path: from.path });
    } else {
      // 跳转404（注意：根据实际开发定义路由的字段，替换 /src/router/menuConfig.js 中的 key）
      if (
        menuList.findIndex(item => item[menuKey.url] === to.path) === -1 &&
        to.path !== "/404" &&
        to.path !== "/refresh"
      ) {
        next({ path: "/404" });
      } else {
        next();
      }
    }
  } else {
    if (to.path !== "/login") {
      next({ path: "/login" });
    } else {
      next();
    }
  }
});

router.afterEach(to => {
  const layoutStore = useLayoutStore();
  layoutStore.$patch(state => {
    state.isTransparent = to.meta.transparentBackground ? true : false;
    state.isNoBreadcrumb = to.meta.noBreadcrumb ? true : false;
  });
  NProgress.done();
});

export default router;
