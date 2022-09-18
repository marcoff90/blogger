import {useMutation} from "react-query";
import {ApiFactory} from "@blogger/api-client";
import {ActivateUserAccountSchema, LoginUserResponse,} from "../../../../../../../libs/api-client/src/lib/api/api";
import {useErrorSnackbar} from "../../../hooks/useErrorSnackbar";
import {useSuccessSnackbar} from "../../../hooks/useSuccessSnackbar";
import {AxiosError, AxiosResponse} from "axios";
import {loginUserSchema} from "../../../schemas/user/login-user-schema";
import useAuth from "../../../auth/useAuth";
import {errorResolver} from "../../error-resolver/error-resolver";

interface Params {
  token: string;
  avatar: ActivateUserAccountSchema
}

export const useActivateUser = () => {
  const {enqueueSuccessSnackbar} = useSuccessSnackbar();
  const {enqueueErrorSnackbar} = useErrorSnackbar();
  const auth = useAuth();

  return useMutation(async (input: Params) => {
    const api = await ApiFactory.createUserServiceApi();
    return await api.userServiceApiUsersActivatePost(input.token, input.avatar);
  }, {
    onSuccess: async (data: AxiosResponse) => {
      const response: LoginUserResponse = data.data;
      try {
        loginUserSchema.parse(response); // validates the data
        await auth?.login(response);
        enqueueSuccessSnackbar(`Welcome to Blogger`);
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
