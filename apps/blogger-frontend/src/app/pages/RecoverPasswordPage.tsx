import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useIdentifyUserQuery} from "../api/user/queries/useIdentifyUserQuery";
import {AppLoader} from "../components/styled/AppLoader";
import {Box, CircularProgress} from "@mui/material";
import RecoverForm from "../components/user/RecoverForm";
import {useErrorSnackbar} from "../hooks/useErrorSnackbar";

const RecoverPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>('');
  const {enqueueErrorSnackbar} = useErrorSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get('token');
    if (query) {
      setToken(query);
      setLoading(!loading);
    } else {
      navigate('/');
    }
  }, []);
  const {status} = useIdentifyUserQuery(token, loading);

  if (status === 'error') {
    enqueueErrorSnackbar('Something went wrong');
    navigate('/');
  }

  return (
    <>
      {
        status === 'success' ?
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <RecoverForm token={token}/>
          </Box>
          :
          <AppLoader>
            <CircularProgress/>
          </AppLoader>

      }
    </>
  );
};

export default RecoverPasswordPage;


