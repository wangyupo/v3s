import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

// Element Plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 样式
import "./styles/element-theme.scss"; // Element Plus 主题定制
import "./styles/dark.scss"; // 暗黑模式样式
import "./styles/iconfont/iconfont.css"; // Iconfont 图标（直接替换文件夹内容即可更新）
import "./styles/tailwind.css"; // Tailwind CSS
import "./styles/tailwind-reset.scss"; // Tailwind 重置（防止覆盖 Element Plus 样式）
import "./styles/common.scss"; // 全局公共样式

// 项目模块
import globalComponents from "@/components/index.js"; // 全局组件
import directives from "./directives"; // 全局指令

// 创建应用
const app = createApp(App);
const pinia = createPinia().use(piniaPluginPersistedstate);

// 注册插件
app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.use(globalComponents);

// 注册 Element Plus Icons
// 使用方式：<el-icon><Xxx /></el-icon> 或 icon="Xxx"
// 注意：:icon="Xxx" 动态绑定方式仍需在组件内单独引入
Object.entries(ElementPlusIconsVue).forEach(([name, component]) => {
  app.component(name, component);
});

// 注册全局指令
Object.entries(directives).forEach(([name, directive]) => {
  app.directive(name, directive);
});

// 挂载应用
app.mount("#app");
