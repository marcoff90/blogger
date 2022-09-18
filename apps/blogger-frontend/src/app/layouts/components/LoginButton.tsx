import React from "react";
import {NavigationButton} from "../styled/header.styled";
import {Box} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {NavigateFunction} from "react-router/lib/hooks";
import routes from "../../constants/routes";
import * as H from 'history';


type Props = {
  navigate: NavigateFunction,
  location: H.Location
}

const LoginButton: React.FC<Props> = ({navigate, location}) => {
  return (
    <NavigationButton mainColor={false} isActive={location.pathname === routes.login} onClick={() => navigate('/users/login')}>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        Log in
        <ArrowForwardIcon fontSize={'small'}/>
      </Box>
    </NavigationButton>
  );
};

export default LoginButton;
