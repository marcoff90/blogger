import {useSuccessSnackbar} from "../../../hooks/useSuccessSnackbar";
import {useErrorSnackbar} from "../../../hooks/useErrorSnackbar";
import { useMutation } from "react-query";
import {
  CreateArticleResponse,
  CreateUpdateArticleInput
} from "../../../../../../../libs/api-client/src/lib/api/api";
import { ApiFactory } from "@blogger/api-client";
import {AxiosError, AxiosResponse} from "axios";
import {errorResolver} from "../../error-resolver/error-resolver";
import {createArticleResponseSchema} from "../../../schemas/articles/create-article-response-schema";
import { useNavigate } from "react-router-dom";
import routes from "../../../constants/routes";

interface Params {
  userId: string,
  token: string;
  articleData: CreateUpdateArticleInput
}

export const useCreateArticle = () => {
  const {enqueueSuccessSnackbar} = useSuccessSnackbar();
  const {enqueueErrorSnackbar} = useErrorSnackbar();
  const navigate = useNavigate();

  return useMutation(async (input: Params) => {
    const api = await ApiFactory.createBloggerServiceApi();
    return await api.bloggerServiceApiBloggersUserIdArticlesPost(input.userId, input.articleData, {
      headers: {
        'Authorization': `Bearer ${input.token}`
      }
    });
  }, {
    onSuccess: async (data: AxiosResponse) => {
      const response: CreateArticleResponse = data.data;
      try {
        createArticleResponseSchema.parse(response);
        enqueueSuccessSnackbar(response.state === 'done' ? `Article successfully created` : `Article successfully saved to drafts`);
        navigate(routes.adminArticles);
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
