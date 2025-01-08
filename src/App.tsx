import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import MainLayout from "@/components/layout";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Subscribe from "./pages/subscribe";
import Explorer from "./pages/explorer";

const Studio = React.lazy(() => import("./pages/studio"));

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
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/pricing" element={<Subscribe />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
