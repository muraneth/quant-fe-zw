import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import Layout from "@/components/layout";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Home from "@/pages/home";
import Charts from "@/pages/charts";
import Studio from "./pages/studio";
import Compare from "./pages/compare";
import Wallet from "./pages/wallet";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2255FF",
        },
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        components: {
          Button: {
            colorPrimary: '#2255FF',
            borderRadius: 38,
          },
          Input: {
            colorPrimary: '#2255FF',
            borderRadius: 38,
          },
        },
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 核心的路由页面直接打进主包，非核心路由页面动态加载分包 */}
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/wallet" element={<Wallet />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
