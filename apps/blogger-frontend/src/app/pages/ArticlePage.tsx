import React, {useEffect, useState} from "react";
import {ArticleI, isArticle} from "../interfaces/articleI";
import Article from "../components/article/Article";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useWarningSnackbar} from "../hooks/useWarningSnackbar";
import {AppLoader} from "../components/styled/AppLoader";
import {CircularProgress} from "@mui/material";
import {useGetArticleByUsernameAndIdQuery} from "../api/graphql/useGetArticleByUsernameAndIdQuery";
import routes from "../constants/routes";

/**
 * If the user goes to the article through the link in the preview, we don't need to load the article from api, it's
 * sent through useNavigate hook in state. If the user would be accessing the article directly through link, we load
 * it from api
 */

const ArticlePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stateArticle, setStateArticle] = useState<ArticleI | undefined>(undefined);
  const location = useLocation();
  const navigate = useNavigate();
  const {username, articleId} = useParams();
  const {enqueueWarningSnackbar} = useWarningSnackbar();
  const {data, status, error} =
    useGetArticleByUsernameAndIdQuery(username, articleId ? parseInt(articleId) : undefined, loading);


  // The query is run when there is no state with article or there's no state
  useEffect(() => {
    if (location.state) {
      if (!isArticle(location.state)) {
        setLoading(!loading);
      } else {
        setStateArticle(location.state);
        location.state = undefined;
      }
    } else {
      setLoading(!loading);
    }
  }, []);

  if (error) {
    enqueueWarningSnackbar('Article does not exist');
    navigate(routes.home);
  }

  return (
    <>
      {
        stateArticle ? <Article article={stateArticle}/>

        : status === 'success' ?

          <Article article={data.getArticleByUsernameAndId}/>
          :
          <AppLoader>
            <CircularProgress/>
          </AppLoader>
      }

    </>
  );
};

export default ArticlePage;
