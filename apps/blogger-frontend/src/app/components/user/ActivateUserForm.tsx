import React from "react";
import {Avatar, Box, Button, FormControl, FormGroup, Typography} from "@mui/material";
import {StyledForm} from "../styled/form.styled";
import {Controller, FieldValues, useForm} from "react-hook-form";
import {useWarningSnackbar} from "../../hooks/useWarningSnackbar";
import {useActivateUser} from "../../api/user/mutations/useActivateUser";
import {avatars} from "../../constants/avatars";

type Props = {
  token: string;
};

const ActivateUserForm: React.FC<Props> = ({token}) => {
  const {handleSubmit, setValue, control} = useForm();
  const {mutate} = useActivateUser();
  const {enqueueWarningSnackbar} = useWarningSnackbar();

  const handleAvatarSelect = (data: FieldValues) => {
    const {avatar} = data;
    if (!avatar) {
      enqueueWarningSnackbar('Choose avatar before submitting');
    } else {
      mutate({token, avatar: {avatar}});
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
