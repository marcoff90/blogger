import React from "react";
import {Box, Button, FormControl, FormGroup, Link, TextField, Typography} from "@mui/material";
import {useForm, Controller, FieldValues} from 'react-hook-form'
import {useLoginUserMutation} from "../../api/user/mutations/useLoginUser";
import {useWarningSnackbar} from "../../hooks/useWarningSnackbar";
import { StyledForm } from "../styled/form.styled";

const LoginForm: React.FC = () => {
  const {handleSubmit, control} = useForm();
  const {mutate} = useLoginUserMutation();
  const {enqueueWarningSnackbar} = useWarningSnackbar();

  const handleLogin = (data: FieldValues) => {
    const {username, password} = data;
    if (!username || !password) {
      enqueueWarningSnackbar('Both fields must be filled');
    } else {
      mutate({username, password});
    }
  };

  return (
    <>
      <FormControl variant={'filled'}>
        <StyledForm>
          <Typography component="h1" variant="h5">
            Log in
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
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                )}
                name="username"
                control={control}
              />
              <Controller
                render={({field}) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                )}
                name="password"
                control={control}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
              >
                Log In
              </Button>
            </FormGroup>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Link href={'/users/forgotten-password'} variant="body2">
                Forgot password?
              </Link>
              <Link href={"/users/register"} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </StyledForm>
      </FormControl>
    </>
  );
};

export default LoginForm;
