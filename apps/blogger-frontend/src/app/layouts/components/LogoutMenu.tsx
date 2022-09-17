import React, {useEffect, useRef, useState} from "react";
import {Avatar, Box, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from "@mui/material";
import { NavigationButton } from "../styled/header.styled";
import useAuth from "../../auth/useAuth";
import {useInfoSnackbar} from "../../hooks/useInfoSnackbar";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const LogoutMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(open);
  const auth = useAuth();
  const {enqueueInfoSnackbar} = useInfoSnackbar();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleClickLogout = (event: React.SyntheticEvent) => {
    handleClose(event);
    auth?.logout();
    enqueueInfoSnackbar('Successfully logged out');
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <NavigationButton
        mainColor={true} isActive={false}
        ref={anchorRef}
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <ArrowDropDownIcon fontSize={'small'}/>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
      </NavigationButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClickLogout}>
                   Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default LogoutMenu;
