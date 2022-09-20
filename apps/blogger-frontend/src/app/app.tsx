import React from "react";
import Layout from "./layouts/Layout";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage";
import ActivatePage from "./pages/ActivatePage";
import Home from "./pages/Home";
import RecoverPage from "./pages/RecoverPage";
import UserArticlesPage from "./pages/UserArticlesPage";
import ArticlePage from "./pages/ArticlePage";
import PrivateRoute from "./auth/PrivateRoute";
import MyArticlesPage from "./pages/admin/MyArticlesPage";

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/users/login'} element={<LoginPage/>}/>
          <Route path={'/users/register'} element={<RegisterPage/>}/>
          <Route path={'/users/forgotten-password'} element={<ForgottenPasswordPage/>}/>
          <Route path={'/users/recovery'} element={<RecoverPage/>}/>
          <Route path={'/users/activate'} element={<ActivatePage/>}/>
          <Route path={'/blogs/:username/articles'} element={<UserArticlesPage/>}/>
          <Route path={'/blogs/:username/articles/:articleId'} element={<ArticlePage/>}/>
          <Route path={'/admin/my-articles'} element={<PrivateRoute><MyArticlesPage/></PrivateRoute>}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
