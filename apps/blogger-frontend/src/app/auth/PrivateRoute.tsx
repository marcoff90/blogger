import {useNavigate, RouteProps} from "react-router-dom";
import React, {useEffect} from "react";
import useAuth from "./useAuth";
import routes from "../constants/routes";

interface PrivateRouteProps extends RouteProps {
  [key: string]: any
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth?.user === null) {
      navigate(routes.login);
    }
  });

  return (
    <>
      {children}
    </>
  );
};

export default PrivateRoute;
