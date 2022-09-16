import {NextFunction, Request, Response} from "express";
import 'dotenv/config'
import CommentService from "../services/comment-service";
import ApiError from "../../../../../libs/middleware-api-error/src/lib/error/api-error";
import {GetCommentsIdsInput} from "../schemas/get-comments-ids-schema";

/**
 * used for communication with votes service in order to verify the comment id
 */

const showCommentsIds = async (req: Request<GetCommentsIdsInput['headers']>, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey === process.env['COMMENTS_APIKEY']) {
    const data: number[] = await CommentService.findCommentsIds();
    res.send(data);
  } else {
    next(ApiError.unauthorized({error: 'Access denied'}));
  }
};

export default {
  showCommentsIds
};
