import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

console.log('999999');

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
    visualizer({
      open: true, // 直接在浏览器中打开分析报告
      filename: "stats.html", // 输出文件的名称
      gzipSize: true, // 显示gzip后的大小
      brotliSize: true, // 显示brotli压缩后的大小
    }),
  ],
  resolve: {
    // 单独拉一条，打包优化的分支出来
    // 需要配置成 external，从 window 获取。
    // 分包(公共 chunk 打几个 js 出来，也不要完全打爆成一个，会太大了 & 按路由分包，一个路由一个包 )
    // 考虑到其实我们没有cdn，所以是不是把这些公共的 chunk 单独打包出来，走强缓存就好了？ async defer 加载
    alias: {
      "@": path.resolve(__dirname, "src"),
      react: 'https://esm.sh/react@18.2.0',
      "react-dom": 'https://esm.sh/react@18.2.0',
      antd: 'https://esm.sh/react@18.2.0',
      'echarts': 'https://esm.sh/react-dom@18.2.0',
      'form-render':  'https://esm.sh/react-dom@18.2.0',
      '@ant-design/icons': 'https://esm.sh/react-dom@18.2.0',
      '@mui/material': 'https://esm.sh/react-dom@18.2.0',
      'lodash': 'https://esm.sh/react-dom@18.2.0',
      'ahooks': 'https://esm.sh/react-dom@18.2.0',
      'immer': 'https://esm.sh/react-dom@18.2.0',
      'qrcode.react': 'https://esm.sh/react-dom@18.2.0',
      '@mui/x-date-pickers': 'https://esm.sh/react-dom@18.2.0',
    },
  },
  envDir: ".env",
  build: {
    rollupOptions: {
      external: ['antd', 'echarts']
    }
  }
});
