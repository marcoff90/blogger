import {BoxProps, styled} from "@mui/material";

import {Box} from "@mui/material";

export const StyledForm = styled(Box)<BoxProps>(({theme}) => ({
    width: '25rem',
    borderRadius: '15px',
    marginTop: 8,
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 15px 35px'
  })
);
