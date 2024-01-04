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

const route = [
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
  {
    path: "/example/tree",
    name: "exampleTreeFilter",
    component: exampleTreeFilter,
    meta: {
      wrapperType: "fullPage",
    },
  },
  {
    path: "/example/seamlessScroll",
    name: "exampleSeamlessScroll",
    component: exampleSeamlessScroll,
  },
  {
    path: "/example/transparentBackground",
    name: "transparentBackground",
    component: transparentBackground,
    meta: {
      transparentBackground: true,
      noBreadcrumb: true,
    },
  },
];

export default route;
