import {useSuccessSnackbar} from "../../../hooks/useSuccessSnackbar";
import {useErrorSnackbar} from "../../../hooks/useErrorSnackbar";
import { useMutation } from "react-query";
import {CreateUserInput, CreateUserResponse,} from "../../../../../../../libs/api-client/src/lib/api/api";
import { ApiFactory } from "@blogger/api-client";
import {AxiosError, AxiosResponse} from "axios";
import {registerUserSchema} from "../../../schemas/user/register-user-schema";
import {handleError} from "../../error-handler/error-handler";
import { useNavigate } from "react-router-dom";

export const useRegisterUserMutation = () => {
  const {enqueueSuccessSnackbar} = useSuccessSnackbar();
  const {enqueueErrorSnackbar} = useErrorSnackbar();
  const navigate = useNavigate();

  return useMutation(async (userData: CreateUserInput) => {
    const api = await ApiFactory.createUserServiceApi();
    return await api.userServiceApiUsersPost(userData);
  },{
    onSuccess: async (data: AxiosResponse) => {
      const response: CreateUserResponse = data.data;
      const result = registerUserSchema.safeParse(response);
      if (result) {
        enqueueSuccessSnackbar(`User ${response.username} created successfully! Email sent!`);
        navigate('/');
      } else {
        enqueueErrorSnackbar('Something went wrong');
      }
    },
    onError: async (err: AxiosError) => {
      const response: any = err.response;
      const data = response.data;
      handleError(data, enqueueErrorSnackbar);
    }
  })
}
