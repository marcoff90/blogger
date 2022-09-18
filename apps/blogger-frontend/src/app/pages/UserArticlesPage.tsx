import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {Box, CircularProgress, Pagination, Typography} from "@mui/material";
import {useGetArticlesByUsernameQuery} from "../api/graphql/useGetArticlesByUsernameQuery";
import Article from "../components/article/Article";
import {AppLoader} from "../components/styled/AppLoader";
import {useWarningSnackbar} from "../hooks/useWarningSnackbar";

/**
 * If username in the path doesn't exist => query will throw error => user is redirected to home page
 */

const UserArticlesPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const [endPagination, setEndPagination] = useState(pageSize);
  const navigate = useNavigate();
  const {username} = useParams();
  const {enqueueWarningSnackbar} = useWarningSnackbar();

  const {data, status, error} = useGetArticlesByUsernameQuery(username, loading);

  const handleChange = (e: React.ChangeEvent<unknown>, pageNumber: number) => {
    setEndPagination(pageNumber * pageSize);
  }

  useEffect(() => {
    if (username) {
      setLoading(!loading);
    }
  }, [username]);

  if (error) {
    enqueueWarningSnackbar(`Blog by ${username} doesn't exist`);
    navigate('/')
  }

  return (
    <>
      <Typography m={0} variant={'h3'}>{`${username} blog`}</Typography>
      {status === 'success' ?
        <>
          {data.getArticlesByUsername.slice(endPagination - pageSize, endPagination).map((article) => {
            return <Article article={article}/>
          })}
          <Box sx={{display: 'flex', justifyContent: 'center'}} py={5}>
            <Pagination count={Math.ceil(data.getArticlesByUsername.length / pageSize)}
                        onChange={handleChange}/>
          </Box>
        </>


        :
        <AppLoader>
          <CircularProgress/>
        </AppLoader>
      }
    </>
  );
};

export default UserArticlesPage;
