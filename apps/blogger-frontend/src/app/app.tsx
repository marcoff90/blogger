import React from "react";
import Layout from "./layouts/Layout";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path={'/login'} element={<LoginPage/>}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
