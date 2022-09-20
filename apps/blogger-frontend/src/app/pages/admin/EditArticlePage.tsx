import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useWarningSnackbar} from "../../hooks/useWarningSnackbar";
import routes from "../../constants/routes";
import AdminArticle from "../../components/admin/AdminArticle";
import {AppLoaderStyled} from "../../components/styled/app-loader.styled";
import {CircularProgress} from "@mui/material";
import {useGetArticleByUserIdAndIdAdminQuery} from "../../api/graphql/getAdminsArticleByIdAndUserId";
import useAuth from "../../auth/useAuth";

const EditArticlePage: React.FC = () => {
  const navigate = useNavigate();
  const {articleId} = useParams();
  const {enqueueWarningSnackbar} = useWarningSnackbar();
  const auth = useAuth();

  const {data, status, error} = useGetArticleByUserIdAndIdAdminQuery({
    userId: auth?.user?.id,
    articleId: articleId ? parseInt(articleId) : undefined
  });

  if (error) {
    console.log(error)
    enqueueWarningSnackbar('Article does not exist');
    navigate(routes.adminArticles);
  }

  return (
    <>
      {
        status === 'success'
          ?
          <AdminArticle pageTitle={'Edit Article'} article={data.getArticleByUserIdAndIdAdmin}/>
          :
          <AppLoaderStyled>
            <CircularProgress/>
          </AppLoaderStyled>
      }
    </>
  );
};

export default EditArticlePage;
