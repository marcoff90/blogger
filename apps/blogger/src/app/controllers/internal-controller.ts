import {NextFunction, Request, Response} from "express";
import {GetArticleIdsInput} from "../schemas/get-article-ids-schema";
import ArticleService from "../services/article-service";
import ApiError from "../../../../../libs/middleware-api-error/src/lib/error/api-error";

/**
 * Used for communication with comments service, so the mentioned service can verify, if the article, which comments
 * need to be associated with, exists
 */

const showArticleIds = async (req: Request<GetArticleIdsInput['headers']>, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey === process.env['BLOGGER_APIKEY']) {
    const data: number[] = await ArticleService.findArticleIds();
    res.send(data);
  } else {
    next(ApiError.unauthorized({error: `Access denied`}));
  }
};

export default {
  showArticleIds
};
