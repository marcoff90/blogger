import React, {useState} from "react";
import {Avatar, Box, Button, FormControl, FormGroup, Typography} from "@mui/material";
import {StyledForm} from "../styled/form.styled";
import {Controller, FieldValues, useForm} from "react-hook-form";
import {useUserForgottenPassword} from "../../api/user/mutations/useUserForgottenPassword";
import {useWarningSnackbar} from "../../hooks/useWarningSnackbar";
import {userActivateUser} from "../../api/user/mutations/useActivateUser";

type Props = {
  token: string;
};

const ActivateUserForm: React.FC<Props> = ({token}) => {
  const {handleSubmit, setValue, control} = useForm();
  const {mutate} = userActivateUser();
  const {enqueueWarningSnackbar} = useWarningSnackbar();

  const avatars = [
    {id: 1, avatar: '../../../assets/avatars/memoji.svg'},
    {id: 2, avatar: '../../../assets/avatars/memoji-1.svg'},
    {id: 3, avatar: '../../../assets/avatars/memoji-2.svg'},
    {id: 4, avatar: '../../../assets/avatars/memoji-3.svg'},
    {id: 5, avatar: '../../../assets/avatars/memoji-4.svg'},
    {id: 6, avatar: '../../../assets/avatars/memoji-5.svg'},
    {id: 7, avatar: '../../../assets/avatars/memoji-6.svg'},
    {id: 8, avatar: '../../../assets/avatars/memoji-7.svg'},
    {id: 9, avatar: '../../../assets/avatars/memoji-8.svg'},
    {id: 10, avatar: '../../../assets/avatars/memoji-9.svg'},
    {id: 11, avatar: '../../../assets/avatars/memoji-10.svg'}
  ];

  const handleAvatarSelect = (data: FieldValues) => {
    const {avatar} = data;
    if (!avatar) {
      enqueueWarningSnackbar('Choose avatar before submitting');
    } else {
      mutate({token, avatar});
    }
  };
  return (
    <>
      <FormControl variant={'filled'}>
        <StyledForm>
          <Typography component="h1" variant="h5">
            Choose Avatar
          </Typography>
          <Box component="form"
               onSubmit={handleSubmit((data) => {
                 handleAvatarSelect(data)
               })}
               noValidate sx={{mt: 1}}>
            <FormGroup sx={{width: '20rem'}}>
              <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                <Controller
                  render={({field}) => (
                    <>
                      {avatars.map(
                        ({id, avatar}, index) => (
                          <Avatar src={avatar}
                                  {...field}
                                  style={{cursor: 'pointer'}}
                                  sx={{width: 50, height: 50, m: 3}}
                                  onClick={() => {
                                    setValue('avatar', avatar);
                                  }}/>
                        ))}
                    </>
                  )}
                  name="avatar"
                  control={control}
                />
              </Box>
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

export default ActivateUserForm;
