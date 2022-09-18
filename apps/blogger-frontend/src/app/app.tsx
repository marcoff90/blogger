import React from "react";
import Layout from "./layouts/Layout";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage";
import ActivateRecoverPage from "./pages/ActivateRecoverPage";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path={'/'} element={<Home/>}/>

          <Route path={'/users/login'} element={<LoginPage/>}/>
          <Route path={'/users/register'} element={<RegisterPage/>}/>
          <Route path={'/users/forgotten-password'} element={<ForgottenPasswordPage/>}/>
          <Route path={'/users/recovery'} element={<ActivateRecoverPage recovery={true}/>}/>
          <Route path={'/users/activate'} element={<ActivateRecoverPage recovery={false}/>}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
