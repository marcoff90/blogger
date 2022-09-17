import {NavigateFunction} from "react-router/lib/hooks";
import React from "react";
import {NavigationButton} from "../styled/header.styled";
import {Box} from "@mui/material";
import LogoutMenu from "./LogoutMenu";

type Props = {
  navigate: NavigateFunction
}

const AdminButtons: React.FC<Props> = ({navigate}) => {
  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <NavigationButton mainColor={true} isActive={false} onClick={() => navigate('/')}>
          My Articles
        </NavigationButton>
        <NavigationButton mainColor={false} isActive={false}>
          Create Article
        </NavigationButton>
        <LogoutMenu/>
      </Box>
    </>
  );
};

export default AdminButtons;
