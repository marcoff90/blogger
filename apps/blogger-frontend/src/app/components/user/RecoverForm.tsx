import React from "react";
import {Box, Button, FormControl, FormGroup, Link, TextField, Typography} from "@mui/material";
import {useForm, Controller, FieldValues} from 'react-hook-form'
import {useWarningSnackbar} from "../../hooks/useWarningSnackbar";
import { StyledForm } from "../styled/form.styled";
import {useRecoverPasswordMutation} from "../../api/user/mutations/useRecoverPasswordMutation";

type Props = {
  token: string;
};

const RecoverForm: React.FC<Props> = ({token}) => {
  const {handleSubmit, control} = useForm();
  const {mutate} = useRecoverPasswordMutation();
  const {enqueueWarningSnackbar} = useWarningSnackbar();

  const handleRegistration = (data: FieldValues) => {
    const {email, password, passwordConfirmation} = data;
    if (!email || !password || !passwordConfirmation) {
      enqueueWarningSnackbar('All fields must be filled');
    }
    if (password !== passwordConfirmation) {
      enqueueWarningSnackbar(`Passwords doesn't match`);
    } else {
      mutate({token, userData: { email, password, passwordConfirmation}});
    }
  };

  return (
    <>
      <FormControl variant={'filled'}>
        <StyledForm>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form"
               onSubmit={handleSubmit((data) => {
                 handleRegistration(data)
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
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="email"
                  />
                )}
                name="email"
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
              <Controller
                render={({field}) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    name="passwordConfirmation"
                    label="Password Confirmation"
                    type="password"
                    id="passwordConfirmation"
                  />
                )}
                name="passwordConfirmation"
                control={control}
              />
              <Typography fontSize={8} style={{textAlign: "center"}}>Note: Password must contain 8 characters, 1 digit,
                1 special symbol, 1 capital character, 1 lowercase character</Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
              >
                Submit
              </Button>
            </FormGroup>
          </Box>
        </StyledForm>
      </FormControl>
    </>
  );
};

export default RecoverForm;
