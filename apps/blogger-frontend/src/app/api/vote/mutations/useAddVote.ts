import {useSuccessSnackbar} from "../../../hooks/useSuccessSnackbar";
import {useErrorSnackbar} from "../../../hooks/useErrorSnackbar";
import { useMutation } from "react-query";
import {ApiMessage, CreateVoteInput} from "../../../../../../../libs/api-client/src/lib/api/api";
import { ApiFactory } from "@blogger/api-client";
import {AxiosError, AxiosResponse} from "axios";
import {errorResolver} from "../../error-resolver/error-resolver";
import {apiMessageSchema} from "../../../schemas/user/api-message-schema";

interface Params {
  articleId: string,
  commentId: string;
  voteData: CreateVoteInput
}

export const useAddVote = () => {
  const {enqueueSuccessSnackbar} = useSuccessSnackbar();
  const {enqueueErrorSnackbar} = useErrorSnackbar();

  return useMutation(async (input: Params) => {
    const api = await ApiFactory.createVotesServiceApi();
    return await api.votesServiceApiArticlesArticleIdCommentsCommentIdVotesPost(input.articleId, input.commentId, input.voteData);
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
