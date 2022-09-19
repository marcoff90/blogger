import {useSuccessSnackbar} from "../../../hooks/useSuccessSnackbar";
import {useErrorSnackbar} from "../../../hooks/useErrorSnackbar";
import { useMutation } from "react-query";
import {CreateUserInput, CreateUserResponse,} from "../../../../../../../libs/api-client/src/lib/api/api";
import { ApiFactory } from "@blogger/api-client";
import {AxiosError, AxiosResponse} from "axios";
import {registerUserSchema} from "../../../schemas/user/register-user-schema";
import {errorResolver} from "../../error-resolver/error-resolver";
import { useNavigate } from "react-router-dom";
import routes from "../../../constants/routes";

export const useRegisterUserMutation = () => {
  const {enqueueSuccessSnackbar} = useSuccessSnackbar();
  const {enqueueErrorSnackbar} = useErrorSnackbar();
  const navigate = useNavigate();

  return useMutation(async (userData: CreateUserInput) => {
    const api = await ApiFactory.createUserServiceApi();
    return await api.userServiceApiUsersPost(userData);
  }, {
    onSuccess: async (data: AxiosResponse) => {
      const response: CreateUserResponse = data.data;
      try {
        registerUserSchema.parse(response);
        enqueueSuccessSnackbar(`User ${response.username} created successfully! Email sent!`);
        navigate(routes.home);
      } catch (e: any) {
        enqueueErrorSnackbar('Something went wrong');
      }
    },
    onError: async (err: AxiosError) => {
      const response: any = err.response;
      const data = response.data;
      errorResolver(data, enqueueErrorSnackbar);
    }
  })
};

