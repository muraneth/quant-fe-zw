import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import Layout from "@/components/layout";
import ErrorBoundary from "@/components/error-boundary";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Home from "@/pages/home";
import Charts from "@/pages/charts";
import Studio from "./pages/studio";
import Compare from "./pages/compare";
import Wallet from "./pages/wallet";
import Subscribe from "./pages/subscribe";
import Payment from "./pages/payment";

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
            colorPrimary: "#2255FF",
            borderRadius: 38,
          },
          Input: {
            colorPrimary: "#2255FF",
            borderRadius: 38,
          },
        },
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 核心的路由页面直接打进主包，非核心路由页面动态加载分包 */}
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <Home />
              </ErrorBoundary>
            }
          />
          <Route
            path="/sign-in"
            element={
              <ErrorBoundary>
                <SignIn />
              </ErrorBoundary>
            }
          />
          <Route
            path="/sign-up"
            element={
              <ErrorBoundary>
                <SignUp />
              </ErrorBoundary>
            }
          />
          <Route
            path="/charts"
            element={
              <ErrorBoundary>
                <Charts />
              </ErrorBoundary>
            }
          />
          <Route
            path="/studio"
            element={
              <ErrorBoundary>
                <Studio />
              </ErrorBoundary>
            }
          />
          <Route
            path="/compare"
            element={
              <ErrorBoundary>
                <Compare />
              </ErrorBoundary>
            }
          />
          <Route
            path="/wallet"
            element={
              <ErrorBoundary>
                <Wallet />
              </ErrorBoundary>
            }
          />
          <Route
            path="/subscribe"
            element={
              <ErrorBoundary>
                <Subscribe />
              </ErrorBoundary>
            }
          />
          <Route
            path="/payment"
            element={
              <ErrorBoundary>
                <Payment />
              </ErrorBoundary>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
