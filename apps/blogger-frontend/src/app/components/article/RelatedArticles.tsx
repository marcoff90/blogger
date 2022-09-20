import React from "react";
import {useGetRelatedArticlesQuery} from "../../api/graphql/useGetRelatedArticles";
import {useWarningSnackbar} from "../../hooks/useWarningSnackbar";
import {AppLoaderStyled} from "../styled/app-loader.styled";
import {Box, CircularProgress, Link, Typography} from "@mui/material";

type Props ={
  limit: number;
  username: string;
  articleId: number;
}

const RelatedArticles: React.FC<Props>= ({limit, username, articleId}) => {
  const {data, status, error} = useGetRelatedArticlesQuery({username});
  const {enqueueWarningSnackbar} = useWarningSnackbar();

  if (error) {
    enqueueWarningSnackbar('Could not load related articles');
  }

  return (
    <>
      {status === 'success' ?
        <>
            {data.getArticlesByUsername.filter(article => article.id !== articleId).length > 0 ?
              data.getArticlesByUsername.filter(article => article.id !== articleId).slice(0, limit).map((article) => {
              return(
                <Box py={3}>
                  <Link color="inherit" underline="none"
                        href={`/blogs/${username}/articles/${article.id}`}
                        variant={'h6'}>{article.title}
                  </Link>
                  <Typography fontSize={12}>{article.perex}</Typography>
                </Box>
                )}
              )
              :
              <Typography fontSize={12} pt={3}>To be written... :)</Typography>
            }
        </>
        :
        <AppLoaderStyled>
          <CircularProgress/>
        </AppLoaderStyled>
      }
    </>
  );
};

export default RelatedArticles;
