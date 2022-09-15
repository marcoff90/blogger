import {Router} from "express";
import VoteController from "../controllers/vote-controller";
import Validator from '@blogger/middleware-validator';
import {createVoteSchema} from "../schemas/create-vote-schema";
import {getVotesForOneCommentSchema} from "../schemas/get-votes-for-one-comment";
import {getVotesForArticleCommentSchema} from "../schemas/get-votes-for-article-coments";
import MessageConsumer from "../middlewares/message-consumer";

const VoteRouter: Router = Router();

VoteRouter.post('/votes-service-api/articles/:articleId/comments/:commentId/votes',
  Validator.validate(createVoteSchema), MessageConsumer.consumeDeleteVotesQueue,
  VoteController.storeOrUpdate);

VoteRouter.get('/votes-service-api/articles/:articleId/comments/:commentId/votes',
  Validator.validate(getVotesForOneCommentSchema), MessageConsumer.consumeDeleteVotesQueue,
  VoteController.showCountByCommentIdArticleId);

VoteRouter.get('/votes-service-api/articles/:articleId/comments-votes',
  Validator.validate(getVotesForArticleCommentSchema), MessageConsumer.consumeDeleteVotesQueue,
  VoteController.showAllForArticle);

export default VoteRouter;
