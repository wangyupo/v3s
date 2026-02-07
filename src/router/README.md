# 路由使用指南

## 一、路由 meta 参数详解

```js
meta: {
  // 高亮指定菜单（用于二级页面等非菜单页，指向需要高亮的父级菜单路径）
  targetMenuPath: "/example/page",

  // 业务区域透明背景（适用于首页等数据分类展示页面）
  transparentBackground: true,

  // 隐藏面包屑导航
  noBreadcrumb: true,

  // 内容区域包裹方式（默认无需配置，最小高度 100%，溢出自动撑开，适合大部分业务）
  wrapperType: "",         // 默认 —— 最小高度 100%，适合列表页
  wrapperType: "fullPage", // 固定高度 100%，适合添加/编辑页
  wrapperType: "flowPage", // 不设高度，遵循文档流，适合展示页

  // 路由别名（动态设置面包屑名称时使用）
  alias: "",
}
```

## 二、路由组织方式

### 路由怎么配？需要嵌套吗？

**不需要嵌套。** v3s 的路由配置全部铺平即可。

菜单的层级关系通过 [menu.json](https://github.com/wangyupo/v3s/blob/main/src/router/menu.json) 中的 `id` / `parentId` 对应关系来组织，v3s 会自动将其转为树状菜单。

> **注意：** `menuType: 1` 的页面（不展示在菜单中的功能页）需要在路由 `meta` 中配置 `targetMenuPath` 来指定高亮的上级菜单。参考 [routeExample.js#L49](https://github.com/wangyupo/v3s/blob/main/src/router/routeExample.js#L49)

### 后端需要传什么格式？

**扁平数组或树状数据均可。** 后端菜单在 v3s 中仅用于权限判断，实际路由由前端 [index.js](https://github.com/wangyupo/v3s/blob/main/src/router/index.js) 定义。

如需限制角色/用户的页面访问权限，后端必须返回菜单数据（作为唯一的权限依据）。

## 三、路由拆分

当页面数量较多时，可以将路由从 `index.js` 中拆分出来。

参考 [routeExample.js](https://github.com/wangyupo/v3s/blob/main/src/router/routeExample.js) 的做法，通过数组解构将路由模块化引入 [index.js](https://github.com/wangyupo/v3s/blob/main/src/router/index.js)，即可清晰地按业务拆分路由，便于维护。

## 四、自定义菜单字段名

如果后端接口的字段名与默认不同（如用 `path` 代替 `url`，用 `pId` 代替 `parentId`），只需修改 `/src/router/menuConfig.js` 中的字段映射即可。

## 五、多级路由的面包屑与菜单高亮

在路由的 `meta` 中配置 `targetMenuPath`，指定当前页面应高亮的菜单路径：

```js
meta: {
  targetMenuPath: "/example/page", // 高亮该路径对应的菜单项
}
```

v3s 会根据 `targetMenuPath` 自动计算路由层级和面包屑，并高亮对应的菜单项。

适用于所有二级及更深层级的非菜单页面。
