import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import MainLayout from "@/components/layout";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Subscribe from "./pages/subscribe";
import Explorer from "./pages/explorer";
import { GoogleOAuthProvider } from '@react-oauth/google';

const Studio = React.lazy(() => import("./pages/studio"));
const CLIENT_ID = '586510859498-n781b8iru79em2he06oevvo65alr719r.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>

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
          {/* <Route path="/explorer" element={<Explorer />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/pricing" element={<Subscribe />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </ConfigProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
