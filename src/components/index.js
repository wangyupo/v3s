/**
 * 自动注册 components 文件夹下的所有组件
 * 支持两种模式：
 * 1. 直接的 .vue 文件（如 RhNoData.vue）
 * 2. 文件夹中的 index.vue（如 RhDatePicker/index.vue）
 */

// 导入当前目录下的所有 .vue 文件（不包括子目录）
const directComponents = import.meta.glob('./*.vue', { eager: true });

// 导入子目录中的 index.vue 文件
const folderComponents = import.meta.glob('./*/index.vue', { eager: true });

/**
 * 从文件路径提取组件名称
 * @param {string} path - 文件路径
 * @returns {string} - 组件名称
 */
const getComponentName = (path) => {
  // ./RhNoData.vue -> RhNoData
  // ./RhDatePicker/index.vue -> RhDatePicker
  const match = path.match(/\.\/([^/]+)(\.vue|\/index\.vue)$/);
  return match ? match[1] : '';
};

const plugins = {
  install(app) {
    // 注册直接的 .vue 文件
    Object.entries(directComponents).forEach(([path, module]) => {
      const componentName = getComponentName(path);
      if (componentName && module.default) {
        app.component(componentName, module.default);
      }
    });

    // 注册文件夹中的 index.vue
    Object.entries(folderComponents).forEach(([path, module]) => {
      const componentName = getComponentName(path);
      if (componentName && module.default) {
        app.component(componentName, module.default);
      }
    });
  },
};

export default plugins;
