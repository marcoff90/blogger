import React from "react";
import {Box} from "@mui/material";
import RegisterForm from "../components/user/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <RegisterForm/>
    </Box>
  );
};

export default RegisterPage;
