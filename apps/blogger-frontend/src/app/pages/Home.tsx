import React from "react";
import {CircularProgress, Typography} from "@mui/material";
import {useGetFeaturedArticlesQuery} from "../api/graphql/useGetFeaturedArticles";
import {AppLoaderStyled} from "../components/styled/app-loader.styled";
import {useErrorSnackbar} from "../hooks/useErrorSnackbar";
import ArticlePreview from "../components/article/ArticlePreview";

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
          return <ArticlePreview article={article}/>
        })
        :
        <AppLoaderStyled>
          <CircularProgress/>
        </AppLoaderStyled>
      }
    </>
  );
};

export default Home
