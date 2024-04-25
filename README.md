<br />
<div align="center">
  <a href="https://github.com/wangyupo/v3s">
    <img src="public/v3s.jpg" alt="Logo" width="180" height="80">
  </a>

  <h3 align="center">V3S后台管理模版</h3>

  <p align="center">
    Vue3+Pinia搭建的通用后台管理模版，助力你快速进入业务开发。
    <br />
    Less is more 😶
    <br />
    <br />
    ·
    <a href="https://github.com/wangyupo/v3s/issues">报告 Bug</a>
    ·
    <a href="https://github.com/wangyupo/v3s/issues">建议需求</a>
  </p>
</div>

## 项目介绍

基于 [Vue3.0](https://cn.vuejs.org/)、[Vite](https://cn.vitejs.dev/)、[ElementPlus](http://element-plus.org/zh-CN/)、[JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) 的后台解决方案，为项目提供开箱即用的解决方案。包括`常用组件（列表/搜索/无缝滚动）`、`函数`、`动态菜单`、`权限校验`等功能。

> 项目组件化程度较高，搭配 VSCode 定制插件 [V3S Snippets](https://github.com/wangyupo/V3S-Snippets)，可以快速、便捷的搭建企业级中后台产品。同时，项目有复制粘贴用的 [aExample](https://github.com/wangyupo/v3s/tree/main/src/views/aExample) 目录，常用业务功能即粘即用，也非常适合想入门 Vue3 的朋友作为案例代码学习（没用 TypeScript，上手难度低，新手友好）。

## v3s 特性

它有如下的特性：

- 🧸 支持任何中后台开发，开箱即用。
- 🎈 采用纯 JavaScript 编写，设计简洁美观。
- 📁 遵循直观的目录结构约定。
- 🗄️ 内置了现成的业务代码和 API 示例。
- 🐇 完全采用 setup 和 Composition API 开发。
- 💻 配合 VSCode 专属插件 [V3S Snippets](https://github.com/wangyupo/v3s-vscode-snippets)，实现团队指令级开发。

## 项目目录结构

v3s 采用非常简单直观的项目目录结构

```
├──src
    ├──api               # api目录
    │   └── api.js
    ├──assets            # 资源（图片、第三方js）目录
    │   └── no-data.png
    ├──components        # 公共组件目录
    │   └── RhTable
    ├──enums             # 枚举、示例数据目录
    │   └── index.js
    ├──layout            # 布局目录
    │   └── index.vue
    ├──router            # 路由目录
    │   └── index.js
    ├──stores            # pinia目录
    │   └── aExample.js
    ├──styles            # 样式目录
    │   ├── iconfont        # iconfont文件
    │   └── common.scss     # 全局样式文件
    ├──utils             # 函数目录
    │   ├── index.js        # 函数入口
    │   └── request.js      # axios配置
    └──views              # 业务目录
        └── aExample        # 功能示例，即粘即用
```

## 快速启用

**Node 版本：20.10.0**

```
# 拉取代码
git clone https://github.com/wangyupo/v3s.git

# 进入项目目录
cd v3s

# 安装依赖
npm install

# 运行项目
npm run dev
```

_推荐使用 nvm 管理 node 版本（[nvm 安装配置教程](https://github.com/wangyupo/FE-Guide?tab=readme-ov-file#%E7%AC%AC%E4%BA%8C%E6%AD%A5%E5%AE%89%E8%A3%85-nvm)）_

## 详细文档

这里提供了一些更加详细的文档，及解决方案：

[1、如何组织路由？路由如何对应用户权限？二级或更深级页面，如何使顶层菜单高亮？](https://github.com/wangyupo/v3s/blob/main/src/router/README.md)

[2、我想用 iconfont，应该怎么更新？在哪里更新？](https://github.com/wangyupo/v3s/blob/main/src/styles/iconfont/README.md)

[3、我如何注册一个全局组件？](https://github.com/wangyupo/v3s/blob/main/src/components/index.js)

4、如后端给我配置的服务是 `https://xxx.com/admin` ，我该如何配置开发或生产环境服务的公共基础路径（打包路径）？

你需要在 [vite.config.js](https://github.com/wangyupo/v3s/blob/main/vite.config.js) 中将 `base` 的内容替换成 admin，然后执行 `npm run build`，重新打包，静态资源基础路径就都指向 `https://xxx.com/admin` 了。关于 base 的更多解释，可以查阅 [vite 官网文档](https://cn.vitejs.dev/config/shared-options.html#base)

## License

[MIT © Richard McRichface.](https://github.com/wangyupo/v3s/blob/master/LICENSE)
