import React from "react";
import {Box} from "@mui/material";
import ForgottenPasswordForm from "../components/user/ForgottenPasswordForm";

const ForgottenPasswordPage: React.FC = () => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <ForgottenPasswordForm/>
    </Box>
  );
};

export default ForgottenPasswordPage;
