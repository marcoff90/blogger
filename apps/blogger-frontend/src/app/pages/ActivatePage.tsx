import React, {useEffect, useState} from "react";
import ActivateUserForm from "../components/user/ActivateUserForm";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useErrorSnackbar} from "../hooks/useErrorSnackbar";
import {Box, CircularProgress} from "@mui/material";
import {AppLoaderStyled} from "../components/styled/app-loader.styled";
import {useIdentifyConfirmUserQuery} from "../api/user/queries/useIdentifyConfirmUserQuery";

const ActivatePage: React.FC = () => {
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
  const {status} = useIdentifyConfirmUserQuery(token, loading);

  if (status === 'error') {
    enqueueErrorSnackbar('Something went wrong');
    navigate('/');
  }

  return (
    <>
      {
        status === 'success' ?
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <ActivateUserForm token={token}/>
          </Box>

          :
          <AppLoaderStyled>
            <CircularProgress/>
          </AppLoaderStyled>
      }
    </>
  );
};
export default ActivatePage;
