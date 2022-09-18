import {useSessionStorage} from "../hooks/useSessionStorage";
import {useNavigate} from "react-router-dom";
import {LoginUserResponse} from "libs/api-client/src/lib/api/api";

export interface UseAuthProviderI {
  login: (data: LoginUserResponse) => Promise<void>,
  logout: () => Promise<void>,
  user: LoginUserResponse | null;
}

const useAuthProvider = () => {
  const [user, setUser] = useSessionStorage("user", null);

  const navigate = useNavigate();

  const login = async (data: LoginUserResponse): Promise<void> => {
    setUser(data);
    navigate("/users/login");
  };

  const logout = async (): Promise<void> => {
    setUser(null);
    navigate("/", {replace: true});
  };

  return {
    user,
    login,
    logout
  }
};

export default useAuthProvider;
