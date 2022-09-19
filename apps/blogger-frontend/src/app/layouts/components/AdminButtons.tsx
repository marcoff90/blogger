import React from "react";
import {NavigationButton} from "../styled/header.styled";
import {Box} from "@mui/material";
import LogoutMenu from "./LogoutMenu";

// TODO add navigation functions through routes

const AdminButtons: React.FC = () => {
  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <NavigationButton mainColor={true} isActive={false}>
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
