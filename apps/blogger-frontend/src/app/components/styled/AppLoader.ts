import {Box, BoxProps, styled} from "@mui/material";

export const AppLoader = styled(Box)<BoxProps>(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  })
);
