import React from "react";
import Layout from "./layouts/Layout";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage";

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path={'/login'} element={<LoginPage/>}/>
          <Route path={'/register'} element={<RegisterPage/>}/>
          <Route path={'/forgotten-password'} element={<ForgottenPasswordPage/>}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
