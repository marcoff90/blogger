import React, {useEffect, useState} from "react";
import { useNavigate, useParams} from 'react-router-dom';
import {Box, CircularProgress, Pagination, Typography} from "@mui/material";
import {useGetArticlesByUsernameQuery} from "../api/graphql/useGetArticlesByUsernameQuery";
import ArticlePreview from "../components/article/ArticlePreview";
import {AppLoaderStyled} from "../components/styled/app-loader.styled";
import {useWarningSnackbar} from "../hooks/useWarningSnackbar";
import routes from "../constants/routes";

/**
 * If username in the path doesn't exist => query will throw error => user is redirected to home page
 */

const UserArticlesPage: React.FC = () => {
  const pageSize = 5;
  const [loading, setLoading] = useState(true);
  const [endPagination, setEndPagination] = useState(pageSize);
  const navigate = useNavigate();
  const {username} = useParams();
  const {enqueueWarningSnackbar} = useWarningSnackbar();
  const {data, status, error} = useGetArticlesByUsernameQuery({username});

  const handleChange = (e: React.ChangeEvent<unknown>, pageNumber: number) => {
    setEndPagination(pageNumber * pageSize);
  };

  if (error) {
    enqueueWarningSnackbar(`Blog by ${username} doesn't exist`);
    navigate(routes.home)
  }

  useEffect(() => {
    if (username) {
      setLoading(!loading);
    }
  }, [username]);

  return (
    <>
      {status === 'success' ?
        <>
          <Typography m={0} variant={'h3'}>{`${username} blog`}</Typography>
          {data.getArticlesByUsername.slice(endPagination - pageSize, endPagination).map((article) => {
            return <ArticlePreview article={article}/>
          })}
          <Box sx={{display: 'flex', justifyContent: 'center'}} py={5}>
            <Pagination count={Math.ceil(data.getArticlesByUsername.length / pageSize)}
                        onChange={handleChange}/>
          </Box>
        </>
        :
        <AppLoaderStyled>
          <CircularProgress/>
        </AppLoaderStyled>
      }
    </>
  );
};

export default UserArticlesPage;
