import {useSuccessSnackbar} from "../../../hooks/useSuccessSnackbar";
import {useErrorSnackbar} from "../../../hooks/useErrorSnackbar";
import { useMutation } from "react-query";
import {ApiMessage} from "../../../../../../../libs/api-client/src/lib/api/api";
import { ApiFactory } from "@blogger/api-client";
import {AxiosError, AxiosResponse} from "axios";
import {errorResolver} from "../../error-resolver/error-resolver";
import {apiMessageSchema} from "../../../schemas/user/api-message-schema";

interface Params {
  userId: string,
  articleId: string;
  token: string;
}

export const useDeleteArticle = () => {
  const {enqueueSuccessSnackbar} = useSuccessSnackbar();
  const {enqueueErrorSnackbar} = useErrorSnackbar();

  return useMutation(async (input: Params) => {
    const api = await ApiFactory.createBloggerServiceApi();
    return await api.bloggerServiceApiBloggersUserIdArticlesArticleIdDelete(input.userId, input.articleId, {
      headers: {
        'Authorization': `Bearer ${input.token}`
      }
    });
  }, {
    onSuccess: async (data: AxiosResponse) => {
      const response: ApiMessage = data.data;
      try {
        apiMessageSchema.parse(response);
        enqueueSuccessSnackbar(`${response.message}`);
      } catch (e) {
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
