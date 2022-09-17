import React, {createContext} from "react";
import useAuthProvider, {UseAuthProviderI} from "./useAuthProvider";

export const AuthContext = createContext<UseAuthProviderI | null>(null);

type Props = {
  children: React.ReactNode
}

const AuthProvider: React.FC<Props> = ({children}) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
};

export default AuthProvider;
