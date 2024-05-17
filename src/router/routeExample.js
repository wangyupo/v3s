// 组件示例
const exampleDialog = () => import("@/views/aExample/exampleComponent/dialog/index.vue");
const exampleTable = () => import("@/views/aExample/exampleComponent/table/index.vue");
const exampleNumCountUp = () => import("@/views/aExample/exampleComponent/numCountUp.vue");
const exampleNestMenu1Sub = () => import("@/views/aExample/exampleComponent/menuNest/nestMenu1Sub.vue");
const exampleNestMenu2 = () => import("@/views/aExample/exampleComponent/menuNest/nestMenu2.vue");
const exampleTreeFilter = () => import("@/views/aExample/exampleComponent/treeFilter.vue");
const exampleSeamlessScroll = () => import("@/views/aExample/exampleComponent/seamlessScroll.vue");
const chartBar = () => import("@/views/aExample/exampleComponent/chartBar.vue");
// 页面示例
const transparentBackground = () => import("@/views/aExample/exampleComponent/transparentBackground.vue");
const exampleFullScreenShowPage = () => import("@/views/aExample/examplePage/fullScreenShowPage.vue");
const examplePage = () => import("@/views/aExample/examplePage/pageMultilevel/index.vue");
const examplePageChild = () => import("@/views/aExample/examplePage/pageMultilevel/pageChild.vue");
const examplePageAlias = () => import("@/views/aExample/examplePage/pageAlias/index.vue");
const examplePageAliasOperate = () => import("@/views/aExample/examplePage/pageAlias/operate.vue");

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
  // 配置示例：业务区域全屏
  {
    path: "/example/tree",
    name: "exampleTreeFilter",
    component: exampleTreeFilter,
    meta: {
      wrapperType: "fullPage",
    },
  },
  {
    path: "/example/echarts",
    name: "chartBar",
    component: chartBar,
  },

  // 配置示例：背景色透明、全屏展示
  {
    path: "/examplePage/fullScreenShowPage",
    name: "exampleFullScreenShowPage",
    component: exampleFullScreenShowPage,
    meta: {
      wrapperType: "fullPage",
      transparentBackground: true,
    },
  },
  // 配置示例：背景色透明、取消面包屑
  {
    path: "/examplePage/transparentBackground",
    name: "transparentBackground",
    component: transparentBackground,
    meta: {
      transparentBackground: true,
      noBreadcrumb: true,
    },
  },
  // 配置示例：多级路由，高亮父级菜单
  {
    path: "/examplePage/pageMultilevel",
    name: "examplePage",
    component: examplePage,
  },
  {
    path: "/examplePage/pageMultilevel/child",
    name: "examplePageChild",
    component: examplePageChild,
    meta: {
      targetMenuPath: "/examplePage/pageMultilevel",
    },
  },
  {
    path: "/examplePage/pageAlias",
    name: "examplePageAlias",
    component: examplePageAlias,
  },
  {
    path: "/examplePage/pageAlias/operate",
    name: "examplePageAliasOperate",
    component: examplePageAliasOperate,
    meta: {
      targetMenuPath: "/examplePage/pageAlias",
    },
  },
];

export default route;
