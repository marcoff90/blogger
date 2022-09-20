import React from "react";
import {NavigationButton} from "../styled/header.styled";
import {Box} from "@mui/material";
import LogoutMenu from "./LogoutMenu";
import {NavigateFunction} from "react-router/lib/hooks";
import * as H from "history";
import routes from "../../constants/routes";

type Props = {
  navigate: NavigateFunction,
  location: H.Location
}

const AdminButtons: React.FC<Props> = ({navigate, location}) => {
  const handleMyArticlesNavigation = () => {
    navigate('/admin/my-articles')
  };

  const handleNewArticleNavigation = () => {
    navigate('/admin/new-article')
  };

  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <NavigationButton mainColor={true} isActive={location.pathname === routes.adminArticles} onClick={handleMyArticlesNavigation}>
          My Articles
        </NavigationButton>
        <NavigationButton mainColor={false} isActive={location.pathname === routes.newArticle} onClick={handleNewArticleNavigation}>
          Create Article
        </NavigationButton>
        <LogoutMenu/>
      </Box>
    </>
  );
};

export default AdminButtons;
