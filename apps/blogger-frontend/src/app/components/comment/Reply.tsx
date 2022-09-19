import React from "react";
import {TextAreaStyled} from "../styled/text-area.styled";
import {Controller, useForm} from "react-hook-form";
import {Box, TextField} from "@mui/material";

type Props = {
  parentId?: number
  newComment: boolean
}

const Reply: React.FC<Props> = ({parentId, newComment}) => {
  const {handleSubmit, control} = useForm();
  return (
    <>
      <Box component="form"
           onSubmit={handleSubmit((data) => {})}
           noValidate
           sx={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: newComment ? 'flex-start': 'flex-end'}}>
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
          name="password"
          control={control}
        />
        <Controller
          render={({field}) => (
            <TextAreaStyled
              {...field}
              required
              aria-label="minimum height"
              minRows={1}
              placeholder="Join the discussion"
              sx={{marginLeft: newComment? '0' : '1rem'}}
            />
          )}
          name="content"
          control={control}
        />
      </Box>
    </>
  );
};

export default Reply;
