import React from "react";
import LoginForm from "../components/LoginForm";
import {Box} from "@mui/material";

const LoginPage: React.FC = () => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <LoginForm/>
    </Box>
  );
};

export default LoginPage;
