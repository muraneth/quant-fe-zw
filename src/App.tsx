import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import Layout from "@/components/layout";
import HomePage from "@/pages/home";
import TestPage from "@/pages/test";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2255FF',
        },
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 核心的路由页面直接打进主包，非核心路由页面动态加载分包 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
