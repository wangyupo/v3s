<div align="center">
  <a href="https://github.com/wangyupo/v3s">
    <img src="public/v3s.jpg" alt="Logo" width="180" height="80">
  </a>

  <h3 align="center">V3S 后台管理模版</h3>

  <p align="center">
    Vue3 + Pinia 搭建的通用后台管理模版，助力你快速进入业务开发
    <br />
    <strong>Less is more 😶</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Vue-3.5-42b883?style=flat-square&logo=vue.js" alt="Vue">
    <img src="https://img.shields.io/badge/Vite-7.x-646cff?style=flat-square&logo=vite" alt="Vite">
    <img src="https://img.shields.io/badge/Element%20Plus-2.x-409eff?style=flat-square" alt="Element Plus">
    <img src="https://img.shields.io/badge/Pinia-3.x-ffd859?style=flat-square" alt="Pinia">
    <img src="https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?style=flat-square&logo=tailwindcss" alt="TailwindCSS">
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  </p>

  <p align="center">
    <a href="https://github.com/wangyupo/v3s/issues">🐛 报告 Bug</a>
    ·
    <a href="https://github.com/wangyupo/v3s/issues">💡 建议需求</a>
  </p>
</div>

---

## 📖 项目介绍

基于 [Vue3](https://cn.vuejs.org/)、[Vite](https://cn.vitejs.dev/)、[Element Plus](http://element-plus.org/zh-CN/)、[JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) 的后台解决方案，为项目提供开箱即用的解决方案。

包括 `常用组件`、`工具函数`、`动态菜单`、`权限校验`、`版本管理`、`多布局切换`、`暗黑模式` 等功能。

> 💡 项目组件化程度较高，搭配 VSCode 定制插件 [V3S Snippets](https://github.com/wangyupo/V3S-Snippets)，可以快速、便捷的搭建企业级中后台产品。
>
> 📚 项目包含 [aExample](https://github.com/wangyupo/v3s/tree/main/src/views/aExample) 示例目录，常用业务功能即粘即用，也非常适合想入门 Vue3 的朋友作为案例代码学习（纯 JavaScript，上手难度低，新手友好）。

## ✨ 特性

| 特性 | 说明 |
| --- | --- |
| 🧸 **开箱即用** | 支持任何中后台开发场景，零配置快速启动 |
| 🎨 **纯 JavaScript** | 无 TypeScript，设计简洁美观，新手友好 |
| 📁 **直观目录结构** | 遵循清晰的目录结构约定，易于维护 |
| 🗄️ **内置业务示例** | 提供现成的业务代码和 API 示例 |
| 🐇 **Composition API** | 完全采用 setup 和 Composition API 开发 |
| 🌙 **暗黑模式** | 支持亮色/暗黑主题切换 |
| 📐 **多布局切换** | 支持侧边菜单、顶部菜单、混合布局等多种布局 |
| 💻 **VSCode 插件** | 配合 [V3S Snippets](https://github.com/wangyupo/v3s-vscode-snippets) 实现指令级开发 |

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
| --- | --- | --- |
| [Vue](https://cn.vuejs.org/) | ^3.5 | 渐进式 JavaScript 框架 |
| [Vite](https://cn.vitejs.dev/) | ^7.3 | 下一代前端构建工具 |
| [Element Plus](https://element-plus.org/) | ^2.13 | Vue 3 组件库 |
| [Pinia](https://pinia.vuejs.org/) | ^3.0 | Vue 状态管理库 |
| [Vue Router](https://router.vuejs.org/) | ^4.6 | Vue 官方路由 |
| [TailwindCSS](https://tailwindcss.com/) | ^3.4 | 原子化 CSS 框架 |
| [ECharts](https://echarts.apache.org/) | ^6.0 | 数据可视化图表库 |
| [Axios](https://axios-http.com/) | ^1.13 | HTTP 请求库 |
| [VueUse](https://vueuse.org/) | ^14.1 | Vue 组合式工具集 |

## 📦 内置组件

| 组件 | 说明 |
| --- | --- |
| `RhTable` | 增强型表格组件，支持分页、排序等 |
| `RhSearch` | 搜索组件，配合表格使用 |
| `RhChart` | ECharts 图表封装组件 |
| `RhDatePicker` | 日期选择器组件 |
| `RhTree` | 树形组件 |
| `RhImg` | 图片组件，支持预览 |
| `RhCountUp` | 数字动画组件 |
| `RhSeamlessScroll` | 无缝滚动组件 |
| `RhNoData` | 空数据占位组件 |
| `RhTitle` | 标题组件 |
| `RhWrapper` | 容器包装组件 |
| `RhTableColumnDIY` | 表格列自定义组件 |
| `RhLargeScreenWrapper` | 大屏适配容器 |

## 📂 目录结构

```
v3s
├── public/                  # 静态资源
├── src/
│   ├── api/                 # API 接口
│   │   ├── api.js           # axios 实例配置
│   │   └── aExample.js      # 示例接口
│   ├── assets/              # 资源文件（图片、geo数据等）
│   ├── components/          # 公共组件
│   │   ├── RhTable.vue      # 表格组件
│   │   ├── RhSearch.vue     # 搜索组件
│   │   ├── RhChart/         # 图表组件
│   │   └── ...
│   ├── directives/          # 自定义指令
│   ├── enums/               # 枚举、常量、选项配置
│   ├── hooks/               # 组合式函数
│   │   ├── useCommon.js     # 通用 hooks
│   │   ├── useLayout.js     # 布局相关 hooks
│   │   └── useUser.js       # 用户相关 hooks
│   ├── layout/              # 布局组件
│   │   ├── Index.vue        # 布局入口
│   │   ├── components/      # 布局子组件
│   │   └── types/           # 布局类型（经典/侧边/顶部/混合）
│   ├── router/              # 路由配置
│   │   ├── index.js         # 路由入口
│   │   ├── menu.json        # 菜单配置
│   │   └── menuConfig.js    # 菜单配置逻辑
│   ├── stores/              # Pinia 状态管理
│   │   ├── common.js        # 公共状态
│   │   ├── layout.js        # 布局状态
│   │   └── user.js          # 用户状态
│   ├── styles/              # 样式文件
│   │   ├── common.scss      # 全局样式
│   │   ├── dark.scss        # 暗黑模式样式
│   │   ├── iconfont/        # 图标字体
│   │   └── tailwind.css     # Tailwind 入口
│   ├── utils/               # 工具函数
│   │   ├── index.js         # 工具函数入口
│   │   ├── request.js       # axios 封装
│   │   ├── date.js          # 日期处理
│   │   ├── download.js      # 下载功能
│   │   └── ...
│   ├── views/               # 页面视图
│   │   ├── aExample/        # 功能示例（即粘即用）
│   │   ├── home.vue         # 首页
│   │   ├── login.vue        # 登录页
│   │   └── ...
│   ├── App.vue              # 根组件
│   └── main.js              # 入口文件
├── .env.development         # 开发环境变量（需自行创建）
├── .env.production          # 生产环境变量（需自行创建）
├── vite.config.mjs          # Vite 配置
├── tailwind.config.js       # Tailwind 配置
└── package.json
```

## 🚀 快速启动

### 环境要求

- **Node.js**: 20.10.0 或以上
- **包管理器**: npm / yarn / pnpm

> 💡 推荐使用 [nvm](https://github.com/wangyupo/FE-Guide?tab=readme-ov-file#%E7%AC%AC%E4%BA%8C%E6%AD%A5%E5%AE%89%E8%A3%85-nvm) 管理 Node 版本

### 安装步骤

```bash
# 1. 克隆项目
git clone https://github.com/wangyupo/v3s.git

# 2. 进入项目目录
cd v3s

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev

# 5. 打包构建
npm run build          # 生产环境
npm run build:dev      # 开发环境
```

### 环境变量配置

在项目根目录创建环境变量文件：

**.env.development** (开发环境)

```bash
# 静态资源基础路径
VITE_BASE=/

# API 代理目标地址
VITE_PROXY_TARGET=http://your-api-server.com
```

**.env.production** (生产环境)

```bash
# 静态资源基础路径（根据部署路径调整）
VITE_BASE=/admin

# API 代理目标地址
VITE_PROXY_TARGET=https://your-api-server.com
```

## 📚 详细文档

| 文档 | 说明 |
| --- | --- |
| [路由配置指南](https://github.com/wangyupo/v3s/blob/main/src/router/README.md) | 如何组织路由？路由如何对应用户权限？二级或更深级页面如何使顶层菜单高亮？ |
| [Iconfont 更新指南](https://github.com/wangyupo/v3s/blob/main/src/styles/iconfont/README.md) | 如何更新和使用 iconfont 图标？ |
| [全局组件注册](https://github.com/wangyupo/v3s/blob/main/src/components/index.js) | 如何注册全局组件？ |

### 常见问题

<details>
<summary><strong>Q: 如何配置静态资源基础路径？</strong></summary>

如后端给你配置的服务是 `https://xxx.com/admin`，你需要：

1. 修改对应环境的 `.env` 文件中的 `VITE_BASE=/admin`
2. 执行 `npm run build` 重新打包

更多信息请参考 [Vite 官方文档 - base 配置](https://cn.vitejs.dev/config/shared-options.html#base)
</details>

<details>
<summary><strong>Q: 如何使用 V3S-Snippets 快速开发？</strong></summary>

1. 打开 VSCode
2. 按 `Ctrl + Shift + X` 进入扩展
3. 搜索 **V3S Snippets** 并安装，重启 VSCode
4. 创建 `.vue` 文件，输入 `v3s-table`，选中提示后回车

详细文档参照 [V3S-Snippets](https://github.com/wangyupo/V3S-Snippets)
</details>

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 License

[MIT License](https://github.com/wangyupo/v3s/blob/master/LICENSE) © Richard McRichface
