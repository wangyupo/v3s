import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import { arr2tree, tree2arr, getLocalStorage, removeAllLoginInfo } from "@/utils/index";
import NProgress from "@/utils/nProgress.js";
import { menuKey } from "@/router/menuConfig.js";
import { useLayoutStore } from "@/stores/layout.js";
import { useUserStore } from "@/stores/user.js";
import { useCommonStore } from "@/stores/common.js";

const login = () => import("@/views/login.vue"); // 登录页
const main = () => import("@/views/main.vue"); // 业务主框架
const refreshPage = () => import("@/views/refreshPage.vue"); // tab刷新中专页面
const notFound = () => import("@/views/404.vue"); // 404页

/* 页面路由 START */
const largeScreen = () => import("@/views/largeScreen.vue");
const home = () => import("@/views/home.vue"); // 首页
import routeExample from "./routeExample"; // 示例页面路由（拆分示例）
/* 页面路由 END */

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/login", name: "登录页", component: login },
    { path: "/largeScreen", name: "largeScreen", component: largeScreen },
    {
      path: "/",
      name: "主体框架",
      component: main,
      redirect: to => {
        // 校验未登录，则返回登录页
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
        /* 页面路由 START */
        { path: "/home", name: "home", component: home },
        ...routeExample,
        /* 页面路由 END */

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
        { path: "/404", name: "notFound", component: notFound },
        { path: "/:pathMatch(.*)*", redirect: "/404" },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const layoutStore = useLayoutStore();
  const commonStore = useCommonStore();
  layoutStore.$patch(state => {
    state.isNavigating = true;
  });
  if (to.name !== "refreshPage") {
    commonStore.$patch(state => {
      delete state.routeParams[from.name];
    });
  }
  // next();
  // 如果你想跳过登录，去调试一些东西或者绘制页面（这通常是在单机情况下）。那么，注释下面
  // 的内容，然后打开上面的 next(); 注释。即可在不登录的情况下，访问任一路径。切记！不要提交
  // 注释登录逻辑后的内容，以免线上出错。
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
  /* 设置路由别名 START */
  if (to.meta.alias) {
    const userStore = useUserStore();
    const menuArr = userStore.menuArr.map(i => {
      if (i.url == to.path) i.alias = to.meta.alias;
      return i;
    });
    userStore.$patch(state => {
      state.menu = arr2tree(menuArr);
    });
  }
  /* 设置路由别名 END */
  NProgress.done();
  const layoutStore = useLayoutStore();
  layoutStore.$patch(state => {
    state.isTransparent = to.meta.transparentBackground ? true : false;
    state.isNoBreadcrumb = to.meta.noBreadcrumb ? true : false;
    state.wrapperType = to.meta.wrapperType ? to.meta.wrapperType : "";
    state.isNavigating = false;
  });
  // 业务区域滚动条自动返回顶部
  const wrapper = document.getElementsByClassName("layout-main-content");
  if (wrapper.length) wrapper[0].scrollTop = 0;
});

export default router;
