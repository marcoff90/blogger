import React, {useEffect, useState} from "react";
import MyArticles from "../../components/admin/MyArticles";
import {useErrorSnackbar} from "../../hooks/useErrorSnackbar";
import {useGetAdminArticlesQuery} from "../../api/graphql/useGetAdminArticlesList";
import useAuth from "../../auth/useAuth";
import {CircularProgress} from "@mui/material";
import {AppLoaderStyled} from "../../components/styled/app-loader.styled";
import {useNavigate} from "react-router-dom";
import routes from "../../constants/routes";

const MyArticlesPage: React.FC = () => {
  const [params, setParams] = useState({});
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const {data, status, error} = useGetAdminArticlesQuery(params, loading);
  const {enqueueErrorSnackbar} = useErrorSnackbar();
  const auth = useAuth();

  if (error) {
    enqueueErrorSnackbar('Log in to access the admin page');
    navigate(routes.login);
  }

  useEffect(() => {
    if (auth?.user) {
      setParams({
        userId: auth.user.id,
        token: auth.user.token
      });
    }
    setLoading(!loading);
  }, [])

  return (
    <>
      {
        status === 'success' ?
          <MyArticles articles={data.getAdminArticles}/>
          :
          <AppLoaderStyled>
            <CircularProgress/>
          </AppLoaderStyled>
      }
    </>
  );
};

export default MyArticlesPage;
