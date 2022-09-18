import React from "react";
import {CircularProgress, Typography} from "@mui/material";
import {useGetFeaturedArticlesQuery} from "../api/graphql/useGetFeaturedArticles";
import Article from "../components/article/Article";
import {AppLoader} from "../components/styled/AppLoader";

const Home: React.FC = () => {
  const {data, status} = useGetFeaturedArticlesQuery();

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
