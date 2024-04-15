const exampleDialog = () => import("@/views/aExample/dialog/index.vue");
const exampleTable = () => import("@/views/aExample/table/index.vue");
const exampleNumCountUp = () => import("@/views/aExample/numCountUp.vue");
const examplePage = () => import("@/views/aExample/pageMultilevel/index.vue");
const examplePageChild = () => import("@/views/aExample/pageMultilevel/pageChild.vue");
const exampleNestMenu1Sub = () => import("@/views/aExample/menuNest/nestMenu1Sub.vue");
const exampleNestMenu2 = () => import("@/views/aExample/menuNest/nestMenu2.vue");
const exampleTreeFilter = () => import("@/views/aExample/treeFilter.vue");
const exampleSeamlessScroll = () => import("@/views/aExample/seamlessScroll.vue");
const transparentBackground = () => import("@/views/aExample/transparentBackground.vue");
const chartTest = () => import("@/views/aExample/chartTest.vue");

const route = [
  // 配置示例：菜单页
  {
    path: "/example/menu1/menu1-1",
    name: "exampleNestMenu1Sub",
    component: exampleNestMenu1Sub,
  },
  {
    path: "/example/menu2",
    name: "exampleNestMenu2",
    component: exampleNestMenu2,
  },

  {
    path: "/example/dialog",
    name: "exampleDialog",
    component: exampleDialog,
  },
  {
    path: "/example/table",
    name: "exampleTable",
    component: exampleTable,
  },
  {
    path: "/example/numCountUp",
    name: "exampleNumCountUp",
    component: exampleNumCountUp,
  },
  {
    path: "/example/seamlessScroll",
    name: "exampleSeamlessScroll",
    component: exampleSeamlessScroll,
  },

  // 配置示例：多级路由，高亮父级菜单
  {
    path: "/example/page",
    name: "examplePage",
    component: examplePage,
  },
  {
    path: "/example/page/child",
    name: "examplePageChild",
    component: examplePageChild,
    meta: {
      targetMenuPath: "/example/page",
    },
  },

  // 配置示例：业务区域全屏
  {
    path: "/example/tree",
    name: "exampleTreeFilter",
    component: exampleTreeFilter,
    meta: {
      wrapperType: "fullPage",
    },
  },

  // 配置示例：背景色透明、取消面包屑
  {
    path: "/example/transparentBackground",
    name: "transparentBackground",
    component: transparentBackground,
    meta: {
      transparentBackground: true,
      noBreadcrumb: true,
    },
  },
  {
    path: "/example/echarts",
    name: "chartTest",
    component: chartTest,
  },
];

export default route;
