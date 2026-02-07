import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { readFileSync } from "fs";

// 读取版本信息（ESM 环境下不支持 require）
const { version } = JSON.parse(readFileSync("./version.json", "utf-8"));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_BASE || "/",

    plugins: [
      vue(),
      // 构建产物分析（打包后自动打开分析图）
      visualizer({
        gzipSize: true,
        brotliSize: true,
        emitFile: false,
        filename: "test.html",
        open: true,
      }),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },

    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: env.VITE_PROXY_TARGET,
          changeOrigin: true,
          // 在响应头中注入代理目标地址，方便调试
          configure: proxy => {
            proxy.on("proxyRes", (proxyRes, req) => {
              proxyRes.headers["x-proxy-url"] = env.VITE_PROXY_TARGET + req.originalUrl;
            });
          },
        },
      },
    },

    build: {
      rollupOptions: {
        output: {
          // 文件名携带版本号，便于缓存管理
          entryFileNames: `assets/[name].[hash].v${version}.js`,
          chunkFileNames: `assets/[name].[hash].v${version}.js`,
          assetFileNames: `assets/[name].[hash].v${version}.[ext]`,
          // 分包策略
          manualChunks: {
            echarts: ["echarts"],
          },
        },
      },
    },

    // 全局常量，可直接使用：console.log(__APP_VERSION__)
    define: {
      __APP_VERSION__: JSON.stringify(version),
    },
  };
});
