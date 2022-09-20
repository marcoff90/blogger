import {useSuccessSnackbar} from "../../../hooks/useSuccessSnackbar";
import {useErrorSnackbar} from "../../../hooks/useErrorSnackbar";
import { useMutation } from "react-query";
import {
  ApiMessage,
  CreateCommentInput, CreateCommentResponse,
} from "../../../../../../../libs/api-client/src/lib/api/api";
import { ApiFactory } from "@blogger/api-client";
import {AxiosError, AxiosResponse} from "axios";
import {errorResolver} from "../../error-resolver/error-resolver";
import {apiMessageSchema} from "../../../schemas/user/api-message-schema";
import {addCommentResponseSchema} from "../../../schemas/comment/add-comment-response-schema";

interface Params {
  articleId: string,
  commentData: CreateCommentInput
}

export const useAddComment = () => {
  const {enqueueSuccessSnackbar} = useSuccessSnackbar();
  const {enqueueErrorSnackbar} = useErrorSnackbar();

  return useMutation(async (input: Params) => {
    const api = await ApiFactory.createCommentsServiceApi();
    return await api.commentsServiceApiArticlesArticleIdCommentsPost(input.articleId, input.commentData);
  }, {
    onSuccess: async (data: AxiosResponse) => {
      console.log(data)

      if (data.status === 200) {
        const response: CreateCommentResponse = data.data;
        try {
          addCommentResponseSchema.parse(response);
          enqueueSuccessSnackbar('Comment added successfully')
        } catch (e) {
          console.log(e)
          enqueueErrorSnackbar('Something went wrong');
        }
      }

      if (data.status === 202) {
        const response: ApiMessage = data.data;
        try {
          apiMessageSchema.parse(response);
          enqueueSuccessSnackbar(`${response.message}`);
        } catch (e) {
          enqueueErrorSnackbar('Something went wrong');
        }
      }
      return data.data;
    },
    onError: async (err: AxiosError) => {
      const response: any = err.response;
      const data = response.data;
      errorResolver(data, enqueueErrorSnackbar);
    }
  })
};
