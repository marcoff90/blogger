import {styled, TextareaAutosizeProps} from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";

export const TextAreaStyled = styled(TextareaAutosize)<TextareaAutosizeProps>(({theme}) => ({
  width: '100%',
  borderRadius: '0.5rem',
  border: '1px solid #bdbdbd',
  fontSize: '15px',
  padding: '5px'
  })
);
