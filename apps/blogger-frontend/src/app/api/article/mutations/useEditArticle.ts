import {useSuccessSnackbar} from "../../../hooks/useSuccessSnackbar";
import {useErrorSnackbar} from "../../../hooks/useErrorSnackbar";
import { useMutation } from "react-query";
import {
  CreateUpdateArticleInput
} from "../../../../../../../libs/api-client/src/lib/api/api";
import { ApiFactory } from "@blogger/api-client";
import {AxiosError, AxiosResponse} from "axios";
import {errorResolver} from "../../error-resolver/error-resolver";
import {updateArticleResponseSchema} from "../../../schemas/articles/update-article-response-schema";
import {useNavigate} from "react-router-dom";
import routes from "../../../constants/routes";

interface Params {
  userId: string,
  token: string;
  articleId: string;
  articleData: CreateUpdateArticleInput
}

export const useEditArticle = () => {
  const {enqueueSuccessSnackbar} = useSuccessSnackbar();
  const {enqueueErrorSnackbar} = useErrorSnackbar();
  const navigate = useNavigate();

  return useMutation(async (input: Params) => {
    const api = await ApiFactory.createBloggerServiceApi();
    return await api.bloggerServiceApiBloggersUserIdArticlesArticleIdPut(input.userId, input.articleId, input.articleData, {
      headers: {
        'Authorization': `Bearer ${input.token}`
      }
    });
  }, {
    onSuccess: async (data: AxiosResponse) => {
      const response = data.data;
      try {
        updateArticleResponseSchema.parse(response);
        enqueueSuccessSnackbar(`Article successfully updated`);
        navigate(routes.adminArticles);
      } catch (e) {
        console.log(e)
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
