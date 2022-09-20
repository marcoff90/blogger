import React from "react";
import {Controller, FieldValues} from "react-hook-form";
import {Box, Button, FormControl, FormGroup, TextField} from "@mui/material";
import {Control, UseFormHandleSubmit} from "react-hook-form/dist/types/form";

type Props = {
  newComment: boolean
  handleSubmit: UseFormHandleSubmit<FieldValues>,
  control: Control,
  handler: (data: FieldValues) => void
}

const Reply: React.FC<Props> = ({newComment, handleSubmit, control, handler}) => {

  return (
    <>
      <FormControl variant={'filled'} sx={{width: '100%', marginRight: '0'}}>
        <Box component="form"
             onSubmit={handleSubmit((data) => {
               handler(data)
             })}
             noValidate
             sx={{
               display: 'flex',
               flexDirection: 'column',
               width: '100%',
               alignItems: newComment ? 'flex-start' : 'flex-end'
             }}>
          <FormGroup>
            <Box sx={{display: 'flex', justifyContent: newComment ? 'flex-start' : 'flex-end'}}>
              <Controller
                render={({field}) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    variant="standard"
                    name="author"
                    label="Nickname"
                    id="author"
                    sx={{width: '15rem'}}
                  />
                )}
                name="author"
                control={control}
              />
            </Box>

            <Controller
              render={({field}) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  multiline={true}
                  variant="standard"
                  name="content"
                  label="Join discussion"
                  id="content"
                  sx={{width: '30rem'}}
                />
              )}
              name="content"
              control={control}
            />
            <Box sx={{display: 'flex', justifyContent: newComment ? 'flex-start' : 'flex-end'}}>
              <Button
                type="submit"
                fullWidth
                size={'small'}
                variant="outlined"
                sx={{mt: 3, mb: 2, width: '5rem'}}
              >
                Submit
              </Button>
            </Box>
          </FormGroup>
        </Box>
      </FormControl>
    </>
  );
};

export default Reply;
