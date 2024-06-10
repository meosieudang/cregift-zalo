import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages/index";
import About from "../pages/about";
import Form from "../pages/form";
import User from "../pages/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../contexts/AuthContext";
import QRCode from "../pages/qr-code";
import AccountInfo from "../pages/account-info";

const MyApp = () => {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RecoilRoot>
          <App>
            <SnackbarProvider>
              <ZMPRouter>
                <AnimationRoutes>
                  <Route path="/" element={<AccountInfo></AccountInfo>}></Route>
                  <Route path="/qr-code" element={<QRCode></QRCode>}></Route>
                  <Route
                    path="/account-info"
                    element={<AccountInfo></AccountInfo>}
                  ></Route>
                  <Route path="/form" element={<Form></Form>}></Route>
                  <Route path="/user" element={<User></User>}></Route>
                </AnimationRoutes>
              </ZMPRouter>
            </SnackbarProvider>
          </App>
        </RecoilRoot>
      </AuthProvider>
    </QueryClientProvider>
  );
};
export default MyApp;
