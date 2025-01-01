import * as React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import Layout from "@/components/layout";
import LandingPage from "./pages/landing";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Home from "@/pages/home";
import Payment from "@/pages/payment";
import Studio from "./pages/studio";
import Compare from "./pages/compare";
import Wallet from "./pages/wallet";
import Subscribe from "./pages/subscribe";
import Explorer from './pages/explorer';

const Charts = React.lazy(() => import('./pages/charts'))

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
          <Route path="/home" element={<Home />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/pricing" element={<Subscribe />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
