import {useNavigate, RouteProps} from "react-router-dom";
import React from "react";
import useAuth from "./useAuth";
import {Route} from "@mui/icons-material";
import routes from "../constants/routes";

interface PrivateRouteProps extends RouteProps {
  [key: string]: any
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({...rest}) => {
  const navigate = useNavigate();
  const auth = useAuth();
  if (auth?.user === null) {
    navigate(routes.login);
  }
  return <Route {...rest}/>
};

export default PrivateRoute;
