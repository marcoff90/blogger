import { Router } from "express";
import CommentController from "../controllers/comment-controller";
import {createCommentSchema} from "../schemas/create-comment-schema";
import Validator from '@blogger/middleware-validator';
import MessageConsumer from "../middlewares/message-consumer";
import {getCommentsSchema} from "../schemas/get-comments-schema";

const CommentRouter = Router();

CommentRouter.post('/comments-service-api/articles/:articleId/comments', Validator.validate(createCommentSchema),
  MessageConsumer.consumeMessages, CommentController.create);

CommentRouter.get('/comments-service-api/articles/:articleId/comments', Validator.validate(getCommentsSchema),
  MessageConsumer.consumeMessages, CommentController.showAll);

export default CommentRouter;
