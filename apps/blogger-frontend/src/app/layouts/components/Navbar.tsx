import React, {useEffect, useState} from "react";
import {AppBar, Box, Toolbar} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import {NavigationButton} from "../styled/header.styled";
import LoginButton from "./LoginButton";
import AdminButtons from "./AdminButtons";
import {matchPath, useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../auth/useAuth";
import routes from '../../constants/routes';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const [username, setUsername] = useState<string | undefined>('');

  const handleHomeNavigation = () => {
    navigate(routes.home);
  };

  const handleRecentArticlesNavigation = () => {
    navigate(`/blogs/${username}/articles`)
  }

  useEffect(() => {
    const articlesParams = matchPath({path: "/blogs/:username/articles"}, location.pathname);
    const articleParams = matchPath({path: "/blogs/:username/articles/:articleId"}, location.pathname);

    if (articleParams) {
      setUsername(articleParams.params.username);
    }
    if (articlesParams) {
      setUsername(articlesParams.params.username);
    }
  }, [location])

  return (
    <AppBar position={'static'} color={'secondary'}>
      <Toolbar variant={'dense'}>
        <Box sx={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between'}} px={30}
             py={1}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box pr={3}>
              <PetsIcon fontSize={'large'}/>
            </Box>
            <NavigationButton mainColor={true} isActive={location.pathname === routes.home}
                              onClick={handleHomeNavigation}>
              Home
            </NavigationButton>
            {
              location.pathname.includes(`/blogs/${username}/articles`) &&
              <>
                <NavigationButton mainColor={true} isActive={location.pathname === `/blogs/${username}/articles`}
                                  onClick={handleRecentArticlesNavigation}>
                  Recent Articles
                </NavigationButton>
                <NavigationButton mainColor={true} isActive={false}>
                  About
                </NavigationButton>
              </>
            }
          </Box>
          <Box>
            {!auth?.user ? <LoginButton navigate={navigate} location={location}/> : <AdminButtons/>}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
