import {useMutation} from "react-query";
import {ApiFactory} from "@blogger/api-client";
import {LoginUserInput, LoginUserResponse} from "../../../../../../../libs/api-client/src/lib/api/api";
import {useErrorSnackbar} from "../../../hooks/useErrorSnackbar";
import {useSuccessSnackbar} from "../../../hooks/useSuccessSnackbar";
import {AxiosError, AxiosResponse} from "axios";
import {loginUserSchema} from "../../../schemas/user/login-user-schema";
import useAuth from "../../../auth/useAuth";

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
      const result = loginUserSchema.safeParse(response); // validates the data
      if (result) {
        await auth?.login(response);
        enqueueSuccessSnackbar('Successfully logged in');
      } else {
        enqueueErrorSnackbar('Something went wrong');
      }
    },
    onError: async (err: AxiosError) => {
      const response: any = err.response;
      await auth?.logout();
      enqueueErrorSnackbar(response.data.error);
    }
  })
};
