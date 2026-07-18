// 菜单示例
const MenusNested = () => import("@/views/menu/nested/index.vue");
const MenusNormal = () => import("@/views/menu/normal/index.vue");
// 组件示例
const ComponentSearch = () => import("@/views/component/search/index.vue");
const ComponentDialog = () => import("@/views/component/dialog/index.vue");
const ComponentTable = () => import("@/views/component/table/index.vue");
const ComponentTableFull = () => import("@/views/component/table-full/index.vue");
const ComponentDigital = () => import("@/views/component/digital/index.vue");
const ComponentTree = () => import("@/views/component/tree/index.vue");
const ComponentSeamless = () => import("@/views/component/seamless/index.vue");
const ComponentEchart = () => import("@/views/component/echarts/index.vue");
const ComponentDigitalInput = () => import("@/views/component/digital-input/index.vue");
// 页面示例
const PageTransparent = () => import("@/views/page/transparent.vue");
const PageFullScreen = () => import("@/views/page/full-screen.vue");
const PageMultiLevel = () => import("@/views/page/multi-level/index.vue");
const PageMultiLevelChild = () => import("@/views/page/multi-level/child.vue");
const PageAlias = () => import("@/views/page/alias/index.vue");
const PageAliasOperate = () => import("@/views/page/alias/operate.vue");

const route = [
  // 菜单示例
  { path: "/menu/nested", name: "MenusNested", component: MenusNested },
  { path: "/menu/normal", name: "MenusNormal", component: MenusNormal },
  // 组件示例
  { path: "/component/search", name: "ComponentSearch", component: ComponentSearch },
  { path: "/component/dialog", name: "ComponentDialog", component: ComponentDialog },
  { path: "/component/table", name: "ComponentTable", component: ComponentTable },
  { path: "/component/table-full", name: "ComponentTableFull", component: ComponentTableFull },
  { path: "/component/digtal", name: "ComponentDigital", component: ComponentDigital },
  { path: "/component/seamless", name: "ComponentSeamless", component: ComponentSeamless },
  { path: "/component/tree", name: "ComponentTree", component: ComponentTree },
  { path: "/component/echarts", name: "ComponentEchart", component: ComponentEchart },
  { path: "/component/digital-input", name: "ComponentDigitalInput", component: ComponentDigitalInput },

  // 配置示例：业务区域全屏
  // {
  //   path: "/example/tree",
  //   name: "exampleTreeFilter",
  //   component: exampleTreeFilter,
  //   meta: { wrapperType: "fullPage" },
  // },

  // 配置示例：背景色透明、全屏展示
  {
    path: "/page/full-screen",
    name: "PageFullScreen",
    component: PageFullScreen,
    meta: { wrapperType: "fullPage", transparentBackground: true },
  },
  // 配置示例：背景色透明、取消面包屑
  {
    path: "/page/transparent",
    name: "PageTransparent",
    component: PageTransparent,
    meta: { transparentBackground: true, noBreadcrumb: true },
  },
  // 配置示例：多级路由，高亮父级菜单
  { path: "/page/multi-level", name: "PageMultiLevel", component: PageMultiLevel },
  {
    path: "/page/multi-level/child",
    name: "PageMultiLevelChild",
    component: PageMultiLevelChild,
    meta: { targetMenuPath: "/page/multi-level" },
  },
  { path: "/page/alias", name: "PageAlias", component: PageAlias },
  {
    path: "/page/alias/operate",
    name: "PageAliasOperate",
    component: PageAliasOperate,
    meta: { targetMenuPath: "/page/alias" },
  },
];

export default route;
