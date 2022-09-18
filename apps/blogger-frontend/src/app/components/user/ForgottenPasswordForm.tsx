import React from "react";
import {Box, Button, FormControl, FormGroup, Link, TextField, Typography} from "@mui/material";
import {useForm, Controller, FieldValues} from 'react-hook-form'
import {useWarningSnackbar} from "../../hooks/useWarningSnackbar";
import { StyledForm } from "../styled/form.styled";
import {useUserForgottenPassword} from "../../api/user/mutations/useUserForgottenPassword";

const ForgottenPasswordForm: React.FC = () => {
  const {handleSubmit, control} = useForm();
  const {mutate} = useUserForgottenPassword();
  const {enqueueWarningSnackbar} = useWarningSnackbar();

  const handleLogin = (data: FieldValues) => {
    const {email} = data;
    if (!email) {
      enqueueWarningSnackbar('Email must be filled');
    } else {
      mutate({email});
    }
  };

  return (
    <>
      <FormControl variant={'filled'}>
        <StyledForm>
          <Typography component="h1" variant="h5">
            Forgotten Password?
          </Typography>
          <Box component="form"
               onSubmit={handleSubmit((data) => {
                 handleLogin(data)
               })}
               noValidate sx={{mt: 1}}>
            <FormGroup sx={{width: '20rem'}}>
              <Controller
                render={({field}) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                )}
                name="email"
                control={control}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
              >
                Submit
              </Button>
            </FormGroup>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Link href={"/users/login"} variant="body2">
                Login
              </Link>
            </Box>
          </Box>
        </StyledForm>
      </FormControl>
    </>
  );
};

export default ForgottenPasswordForm;
