import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import externalGlobals from "rollup-plugin-external-globals";
import path from "path";

const production = process.env.NODE_ENV === 'production';

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  plugins: [
    react(),
    production && externalGlobals({
      react: "React",
      "react-dom": "ReactDOM",
      dayjs: 'dayjs',
      antd: "antd",
      echarts: "echarts",
    }),
    production && visualizer({
      open: true,
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  envDir: ".env",
  base: './',
  build: {
    rollupOptions: {
      // 稳定且庞大的三方库走 external
      external: [
        "react",
        "react-dom",
        'dayjs',
        "antd",
        "echarts",
      ],
      output: {
        manualChunks: {
          // 公共依赖包
          vendor: [
            "qrcode.react",
            "immer",
            "ahooks",
            "lodash",
            "@ant-design/icons",
          ],
          // mui
          material: [
            "@mui/material",
            "@mui/x-date-pickers"
          ],
          // form-render
          'form-render': [
            "form-render"
          ]
        },
      },
    },
  },
});