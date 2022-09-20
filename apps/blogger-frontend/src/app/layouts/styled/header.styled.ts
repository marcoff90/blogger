import {Button, ButtonBaseProps, styled} from "@mui/material";

interface ButtonProps extends ButtonBaseProps {
  isActive: boolean;
  mainColor: boolean;
}

export const NavigationButton = styled(Button, {
  shouldForwardProp: (prop) => {
    return prop !== 'isActive'
  }
})<ButtonProps>(({theme, isActive, mainColor}) => ({
  position: 'relative',
  boxSizing: 'border-box',
  borderRadius: 0,
  height: theme.spacing(12),
  color: mainColor ? theme.palette.grey[800] : theme.palette.primary.main,
  opacity: isActive ? 1 : 0.7,
  textTransform: 'none',
  fontWeight: isActive ? 600 : 400,

  '&::after': {
    content: '""',
    display: 'flex',
    height: theme.spacing(0.8),
    background: isActive ? mainColor? theme.palette.grey[900] : theme.palette.primary.main : 'transparent',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },

  })
)
