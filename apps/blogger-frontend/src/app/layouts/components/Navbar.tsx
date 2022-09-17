import React from "react";
import {AppBar, Box, Toolbar} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import {NavigationButton} from "../styled/header.styled";
import LoginButton from "./LoginButton";
import AdminButtons from "./AdminButtons";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../auth/useAuth";
import routes from '../../constants/routes';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();

  return (
    <AppBar position={'static'} color={'secondary'}>
      <Toolbar variant={'dense'}>
        <Box sx={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between'}} px={30}
             py={1}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box pr={3}>
              <PetsIcon fontSize={'large'}/>
            </Box>
            <NavigationButton mainColor={true} isActive={location.pathname === routes.home} onClick={() => navigate('/')}>
              Home
            </NavigationButton>
            <NavigationButton mainColor={true} isActive={false}>
              Recent Articles
            </NavigationButton>
            <NavigationButton mainColor={true} isActive={false}>
              About
            </NavigationButton>
          </Box>
          <Box>
            {!auth?.user ? <LoginButton navigate={navigate} location={location}/> : <AdminButtons navigate={navigate}/>}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
