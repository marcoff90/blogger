import { Router } from "express";
import CommentController from "../controllers/comment-controller";
import {createCommentSchema} from "../schemas/create-comment-schema";
import Validator from '@blogger/middleware-validator';

const CommentRouter = Router();

CommentRouter.post('/comments-service-api/articles/:articleId/comments', Validator.validate(createCommentSchema),
  CommentController.create);

CommentRouter.get('/comments-service-api/articles/:articleId/comments', CommentController.showAll);

export default CommentRouter;
