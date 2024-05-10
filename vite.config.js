import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

const versionData = require("./version.json"); // 引入版本号
const PROXY_TARGET = ""; // 后端服务地址

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // 获取当前环境下的变量

  return {
    base: env.VITE_BASE || "/",
    plugins: [
      vue(),
      visualizer({
        gzipSize: true,
        brotliSize: true,
        emitFile: false,
        filename: "test.html", // 分析图生成的文件名
        open: true, // 如果存在本地服务端口，将在打包后自动展示
      }),
    ],
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: PROXY_TARGET,
          changeOrigin: true,
          configure: (proxy, options) => {
            proxy.on("proxyRes", (proxyRes, req, res) => {
              proxyRes.headers["x-proxy-url"] = PROXY_TARGET + req.originalUrl;
            });
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].[hash].v${versionData.version}.js`,
          chunkFileNames: `assets/[name].[hash].v${versionData.version}.js`,
          assetFileNames: `assets/[name].[hash].v${versionData.version}.[ext]`,
          manualChunks: {
            echarts: ["echarts"],
          },
        },
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(versionData.version), // 版本号全局常量，可以直接使用，如：console.log(__APP_VERSION__)
    },
  };
});
