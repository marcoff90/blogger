import {useSuccessSnackbar} from "../../../hooks/useSuccessSnackbar";
import {useErrorSnackbar} from "../../../hooks/useErrorSnackbar";
import { useMutation } from "react-query";
import {ApiMessage, ForgottenPasswordUserSchema,} from "../../../../../../../libs/api-client/src/lib/api/api";
import { ApiFactory } from "@blogger/api-client";
import {AxiosError, AxiosResponse} from "axios";
import {handleError} from "../../error-handler/error-handler";
import { useNavigate } from "react-router-dom";
import {apiMessageSchema} from "../../../schemas/user/api-message-schema";

export const useUserForgottenPassword = () => {
  const {enqueueSuccessSnackbar} = useSuccessSnackbar();
  const {enqueueErrorSnackbar} = useErrorSnackbar();
  const navigate = useNavigate();

  return useMutation(async (userData: ForgottenPasswordUserSchema) => {
    const api = await ApiFactory.createUserServiceApi();
    return await api.userServiceApiUsersForgottenPasswordPost(userData);
  },{
    onSuccess: async (data: AxiosResponse) => {
      const response: ApiMessage = data.data;
      try {
        apiMessageSchema.parse(response);
        enqueueSuccessSnackbar(`${response.message}`);
        navigate('/');
      } catch (e) {
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
