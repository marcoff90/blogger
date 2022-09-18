import React from "react";
import {CircularProgress, Typography} from "@mui/material";
import {useGetFeaturedArticlesQuery} from "../api/graphql/useGetFeaturedArticles";
import Article from "../components/article/ArticlePreview";
import {AppLoader} from "../components/styled/AppLoader";
import {useErrorSnackbar} from "../hooks/useErrorSnackbar";

const Home: React.FC = () => {
  const {data, status, error} = useGetFeaturedArticlesQuery();
  const {enqueueErrorSnackbar} = useErrorSnackbar();

  if (error) {
    enqueueErrorSnackbar('Something went wrong. Try later');
  }

  return (
    <>
      <Typography m={0} variant={'h3'}>Featured Articles</Typography>

      {status === 'success' ?
        data.getFeaturedArticles.map(article => {
          return <Article article={article}/>
        })
        :
        <AppLoader>
          <CircularProgress/>
        </AppLoader>
      }
    </>

  );
};

export default Home
