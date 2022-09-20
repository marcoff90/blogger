import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useErrorSnackbar} from "../hooks/useErrorSnackbar";
import {useIdentifyResetPasswordUserQuery} from "../api/user/queries/useIdentifyResetPasswordUserQuery";
import {Box, CircularProgress} from "@mui/material";
import RecoverForm from "../components/user/RecoverForm";
import {AppLoaderStyled} from "../components/styled/app-loader.styled";
import routes from "../constants/routes";

const ActivateRecoverPage: React.FC = () => {
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
      navigate(routes.home);
    }
  }, []);
  const {status} = useIdentifyResetPasswordUserQuery(token, loading);

  if (status === 'error') {
    enqueueErrorSnackbar('Something went wrong');
    navigate(routes.home);
  }

  return (
    <>
      {
        status === 'success' ?
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <RecoverForm token={token}/>
          </Box>

          :
          <AppLoaderStyled>
            <CircularProgress/>
          </AppLoaderStyled>

      }
    </>
  );
};
export default ActivateRecoverPage;
