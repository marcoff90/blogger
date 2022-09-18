import {useMutation} from "react-query";
import {ApiFactory} from "@blogger/api-client";
import {LoginUserInput, LoginUserResponse} from "../../../../../../../libs/api-client/src/lib/api/api";
import {useErrorSnackbar} from "../../../hooks/useErrorSnackbar";
import {useSuccessSnackbar} from "../../../hooks/useSuccessSnackbar";
import {AxiosError, AxiosResponse} from "axios";
import {loginUserSchema} from "../../../schemas/user/login-user-schema";
import useAuth from "../../../auth/useAuth";
import {errorResolver} from "../../error-resolver/error-resolver";

export const useLoginUserMutation = () => {
  const {enqueueSuccessSnackbar} = useSuccessSnackbar();
  const {enqueueErrorSnackbar} = useErrorSnackbar();
  const auth = useAuth();

  return useMutation(async (credentials: LoginUserInput) => {
    const api = await ApiFactory.createUserServiceApi();
    return await api.userServiceApiUsersLoginPost(credentials);
  }, {
    onSuccess: async (data: AxiosResponse) => {
      const response: LoginUserResponse = data.data;
      try {
        loginUserSchema.parse(response); // validates the data
        await auth?.login(response);
        enqueueSuccessSnackbar('Successfully logged in');
      } catch (e: any) {
        enqueueErrorSnackbar('Something went wrong');

      }
    },
    onError: async (err: AxiosError) => {
      const response: any = err.response;
      const data = response.data;
      await auth?.logout();
      errorResolver(data, enqueueErrorSnackbar);
    }
  })
};
